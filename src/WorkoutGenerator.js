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
import Sponsored from './Sponsored.js';

class WorkoutGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          routineData:[], 
          routineLoaded:undefined, 
          error:undefined, 
          submitted: false,
          showBackButton: false,
          showDownloadButton: false
        }

        this.emailForm = React.createRef();
        this.email = React.createRef();

        this.loadRoutine = this.loadRoutine.bind(this);
        this.startSpinner = this.startSpinner.bind(this);
        this.changeSettings = this.changeSettings.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.scrollToSettings = this.scrollToSettings.bind(this);
        this.downloadRoutine = this.downloadRoutine.bind(this);
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

    submitEmailModal(event) {

      var form = event.currentTarget;
      event.preventDefault();
      event.stopPropagation();

      if (form.checkValidity() === false) {
        return;
      }
      
      var email = this.email.current.value;
      this.email.current.value = ""; //clear ref

      this.setState({showEmailModal:false});
      api.subscribeEmail(email)
      .then(res => res.json())
      .then(
        (result) => {
            this.downloadRoutine();
        });


    }

    downloadRoutine() {
        PDFCreator.downloadRoutinePDF(this.state.routineData);
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
                {/* <Button className="circle" onClick={() => {this.setState({showEmailModal:true})}}> */}
                <Button className="circle" onClick={this.downloadRoutine}>
                  <MdGetApp></MdGetApp>
                </Button>
            </div>
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
                <Sponsored/>
                <Modal show={this.state.showEmailModal} onHide={() => {this.setState({showEmailModal:false})}}>
                  <Modal.Header closeButton>
                    <Modal.Title>Download Workout Routine</Modal.Title>
                  </Modal.Header>
                  <Form 
                          ref={this.emailForm} 
                          onSubmit= {e => {this.submitEmailModal(e)}}
                          noValidate
                          validated="true"
                          >
                  <Modal.Body>
                    <p>Please enter your email address to download your free workout routine.</p>
                    <p>Emails will not be shared. They are only used to subscribe you to our newsletter.</p>
                    <p>You can unsubscribe at any time.</p>
                    <Form.Group>
                      <Form.Label>Email: </Form.Label>
                      <Form.Control ref={this.email} type="text" placeholder="Email..." required></Form.Control>
                    </Form.Group>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => {this.setState({showEmailModal:false})}}>Cancel</Button>
                    <Button variant="primary" type="submit">Submit</Button>
                  </Modal.Footer>
                  </Form>
                </Modal>
            </div>
        );
    }
}

export default WorkoutGenerator;