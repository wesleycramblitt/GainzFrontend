import React from 'react';
import ReactDOM from 'react-dom';
import WorkoutSettings from './WorkoutSettings.js';
import WorkoutRoutine from './WorkoutRoutine.js';
import api from "./api/api.js";
import {MdArrowUpward} from 'react-icons/md';
import {MdGetApp} from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import PDFCreator from './PDFCreator';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';

class WorkoutGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          routineData:[], 
          routineLoaded:undefined, 
          error:undefined, 
          submitted: false,
          showBackButton: false,
          showDownloadButton: false,
          showProgressModal: false,
          pdfProgress: 0
        }

        this.emailForm = React.createRef();
        this.email = React.createRef();

        this.loadRoutine = this.loadRoutine.bind(this);
        this.startSpinner = this.startSpinner.bind(this);
        this.changeSettings = this.changeSettings.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.scrollToSettings = this.scrollToSettings.bind(this);
        this.setStateAsync = this.setStateAsync.bind(this);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);

    }
  
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }

  
    handleScroll() {
      //Back to settings ////////////////////////////////
      if (document.getElementById("workoutSettings") != undefined) {
        if (this.state.showBackButton == false
          && 
            window.scrollY > document.getElementById("workoutSettings").offsetTop) {
          this.setState({showBackButton:true})
        }
        else if (this.state.showBackButton == true &&
          window.scrollY < document.getElementById("workoutSettings").offsetTop) {

          this.setState({
          showBackButton:false
        });
        }
      }
      /////////////////////////////////////////////////
      if (document.getElementById("workoutRoutine") != undefined) {
        if (this.state.showDownloadButton == false &&
            window.scrollY > document.getElementById("workoutRoutine").offsetTop) {
              this.setState({
                showDownloadButton:true
              });
        }
        else if (this.state.showDownloadButton == true &&
            window.scrollY < document.getElementById("workoutRoutine").offsetTop)
        {
          this.setState({showDownloadButton:false});
        }
        
      }
    }

    loadRoutine(workoutSettings) {
        this.setState({submitted:true, routineLoaded:false, error:undefined});

        api.getWorkoutRoutine(workoutSettings)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                routineLoaded: true,
                routineData: result
              });
            },
            (error) => {
              this.setState({
                routineLoaded: true,
                error
              });
            }
          );
      
    }

    startSpinner() {
        this.setState({routineLoaded:false})
    }

    changeSettings() {
        this.setState({routineLoaded:undefined, error:undefined, routineData:[], submitted: false})
    }

    scrollToSettings() {
      ReactDOM.findDOMNode(this).scrollIntoView({behavior: "smooth", block:"start"});

    }

    //For instant renders
    setStateAsync(state) {
      return new Promise((resolve) => {
        var generator = this;
        setTimeout(function() {generator.setState(state, resolve)})
      });
  }

    async submitEmailModal(event) {

      var form = event.currentTarget;

      event.preventDefault();
      event.stopPropagation();

      if (form.checkValidity() === false) {
        return;
      }
      
      var email = this.email.current.value;

      await this.setStateAsync(
        {
          showEmailModal:false,
          pdfProgress:5,
          showProgressModal:true
        });

      var pdfDataURI = await PDFCreator.getRoutinePDF(this.state.routineData, this.setStateAsync);
      


      await api.sendPDFToEmailAndSubscribe(email, pdfDataURI)

      this.setState({pdfProgress:100});
          
    }

    render() {
        var backToSettings;

        if (this.state.showBackButton == true)  {
          backToSettings= (
                            <div style={{position:"fixed",right:"0.5em",top:"0.5em"}}>
                                <Button className="circle" onClick={this.scrollToSettings}>
                                  <MdArrowUpward></MdArrowUpward>
                                </Button>
                            </div>
                          ) 
        }

        var downloadRoutine;
        if (this.state.showDownloadButton == true) {
          downloadRoutine = (
            <div style={{position:"fixed",right:"3.8em",top:"0.5em"}}>
                <Button variant="warning" className="circle"  onClick={() => {this.setState({showEmailModal:true})}}>
                  <MdGetApp></MdGetApp>
                </Button>
            </div>
          ) 
        }

        var pdfProgressMessage;
        if (this.state.pdfProgress < 100) {
            pdfProgressMessage = (
              <p className="text-center">Creating Workout Routine PDF</p>
            )
        }
        else
        {
          pdfProgressMessage = (
            <p  className="text-center">Finished! Check your email.</p>
          )
        }

        return (
            <div>
                <WorkoutSettings submitted={this.state.submitted} 
                loadRoutine={this.loadRoutine} startSpinner={this.startSpinner} changeSettings={this.changeSettings}/>

                <WorkoutRoutine  isLoaded={this.state.routineLoaded} 
                error ={this.state.error} routineData={this.state.routineData}  />
                {backToSettings}
                {downloadRoutine}



                {/* Email Modal ****************************************************** */}
                <Modal show={this.state.showEmailModal} onHide={() => {this.setState({showEmailModal:false})}}>
                  <Modal.Header closeButton>
                    <Modal.Title>Send Workout Routine</Modal.Title>
                  </Modal.Header>
                  <Form 
                          ref={this.emailForm} 
                          onSubmit= {e => {this.submitEmailModal(e)}}
                          noValidate
                          validated="true"
                          >
                  <Modal.Body>
                    <p>Please enter your email address to receive your free workout routine.</p>
                    <p>Your email will not be shared with anyone else.</p>
                    <Form.Group>
                      <Form.Label>Email: </Form.Label>
                      <Form.Control ref={this.email} type="email" placeholder="Email..." required></Form.Control>
                    </Form.Group>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => {this.setState({showEmailModal:false})}}>Cancel</Button>
                    <Button variant="primary" type="submit">Submit</Button>
                  </Modal.Footer>
                  </Form>
                </Modal>

                {/* Routine PDFCreation Process Modal *************************************** */}
                <Modal backdrop='static' show={this.state.showProgressModal} onHide={() => {this.setState({showProgressModal:false})}}>
                  <Modal.Header closeButton>
                    <Modal.Title>Progress</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                        {pdfProgressMessage}
                        <ProgressBar striped animated variant="success" now={this.state.pdfProgress} />
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => {this.setState({showProgressModal:false})}}>Close</Button>
                  </Modal.Footer>

                </Modal>

            </div>
        );
    }
}

export default WorkoutGenerator;