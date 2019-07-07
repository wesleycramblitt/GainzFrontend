import React from 'react';
import ReactDOM from 'react-dom';
import WorkoutSettings from './WorkoutSettings.js';
import WorkoutRoutine from './WorkoutRoutine.js';
import api from "./api/api.js";
import {MdArrowUpward} from 'react-icons/md';
import Button from 'react-bootstrap/Button';

class WorkoutGenerator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          routineData:[], 
          routineLoaded:undefined, 
          error:undefined, 
          submitted: false,
          showBackButton: false
        }

        this.loadRoutine = this.loadRoutine.bind(this);
        this.startSpinner = this.startSpinner.bind(this);
        this.changeSettings = this.changeSettings.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.scrollToSettings = this.scrollToSettings.bind(this);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
    }
  
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  
    handleScroll() {

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

    loadRoutine(workoutSettings) {
        this.setState({submitted:true, routineLoaded:false});

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

    render() {
        var backToSettings;

        if (this.state.showBackButton == true)  {
          backToSettings= (
                            <div style={{position:"fixed",right:"1em",top:"1em"}}>
                                <Button className="circle" onClick={this.scrollToSettings}>
                                  <MdArrowUpward></MdArrowUpward>
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
            </div>
        );
    }
}

export default WorkoutGenerator;