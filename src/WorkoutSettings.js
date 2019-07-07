import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col  from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import InputRange from './InputRange';

import fatLoss from './img/fatLoss.jpg';
import gainMuscle from './img/gainMuscle.jpg';
import strengthTraining from './img/strengthTraining.jpg';
import gvt from './img/gvt.png';




class WorkoutSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            volume: 90,
            repRange: 2,
            frequency: 3,
            variation: 1,
            exerciseTypes: [2,3,4,5,6],
            validated: false,
            error: null
        };

    }

    handleSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        this.setState({validated:true, error:null});
        if (form.checkValidity() === true) {
            var data = this.buildWorkoutSettings();
            if (data !== undefined) {
                this.props.loadRoutine(data)
            }
        }
        
    }

    componentDidUpdate() {
        if (this.state.scrollUp) {
            ReactDOM.findDOMNode(this).scrollIntoView({behavior: "smooth"});
            this.setState({scrollUp:false});
        }
    }

    scroll() {
        this.setState({scrollUp:true});
    }

    selectPreset(id) {
        var presetDict = {
            "gainMuscle":
            {
                volume: 90,
                frequency: 3,
                repRange: 2,
                variation: 1
            },
            "loseFat":
            {
                volume: 120,
                frequency:3,
                repRange:3,
                variation:1
            },
            "gvt":
            {
                volume: 100,
                frequency: 1,
                repRange: 2,
                variation: 1
            },
            "strengthTraining":
            {
                volume: 60,
                frequency: 3,
                repRange: 1,
                variation: 1
            }
        }
    
        this.setState(presetDict[id]);

        document.getElementById("workoutSettingsForm").scrollIntoView({behavior: "smooth"});
    }

    buildWorkoutSettings() {
        var data = {};
        data.Frequency = this.state.frequency;
        data.Volume = this.state.volume;
        data.RepScheme = {};

        var volumePerDay = this.state.volume/this.state.frequency;
        var volumePerWorkout = volumePerDay/this.state.variation;

        var repRangeMap = {
            1 : [3,6],
            2 : [6,12],
            3 : [13,20]
        }
        var repsMinMax = repRangeMap[this.state.repRange];
        var remainderDict = {};
        //Pick rep number that allows the lowest remainder when dividing volumePerWorkout
        for (var i = repsMinMax[1]; i >= repsMinMax[0]; i--) {
            var sets = Math.floor(volumePerWorkout/i);
            var remainder = volumePerDay % i;
            if (sets === 0)
                continue;
            if (remainderDict[remainder] === undefined) {
                remainderDict[remainder] = [i, sets];
            }
        }
        //Get smallest remainder. 
        if (Object.keys(remainderDict).length === 0) {
            this.setState({error:
                "Not enough volume to build workout routine with current settings. Increase volume, decrease frequency,"
                +" decrease rep range, or decrease variation"});
            return;
        }

        var first = Object.keys(remainderDict)[0];
        var reps = remainderDict[first][0];
        var sets = remainderDict[first][1];

        data.RepScheme.Reps = reps;
        data.RepScheme.Sets = sets;


        data.ExerciseTypes = this.state.exerciseTypes;

        return data;
    }



    render() {
        var labelDict = {
            60: "Ideal for beginners with less than 1 year of experience.",
            90: "Ideal for experienced lifters with less than 3 years of experience.",
            120: "Ideal for advanced lifters with more than 3 years of experience",
        }

        var error = (
            <Col className="mt-3 mb-3">
               <Alert variant="danger">{this.state.error}</Alert>
            </Col>
        )
        var presets = (
            <Row>
                <Col xs={12}>
                    <p className="form-label">
                        Presets                             
                        <OverlayTrigger trigger="click" placement="top" 
                            overlay={
                                <Popover  title="Presets">
                                    Presets are predefined workout settings. After setting one, 
                                    you can generate a workout or continue to edit the settings.
                                </Popover>
                            }>
                            <Button variant="info" style={{marginLeft:"0.5em",width:"1em", height:"1.4em", padding:"0"}}>?</Button>
                        </OverlayTrigger>
                    </p>
                </Col>

                <Col xs={6} md={3} lg={2}>
                    <div className="m-1">
                        <Image id="strengthTraining" rounded fluid className="presetImage"
                        src={strengthTraining} onClick={e => {this.selectPreset(e.target.id)}} />
                    </div>
                </Col>
                <Col xs={6} md={3} lg={2}>
                    <div className="m-1">
                        <Image id="loseFat" rounded fluid  className="presetImage"
                        src={fatLoss} onClick={e => {this.selectPreset(e.target.id)}} />
                    </div>
                </Col>
                <Col xs={6} md={3} lg={2}>
                    <div className="m-1">
                        <Image id="gainMuscle" rounded fluid  className="presetImage"
                        src={gainMuscle} onClick={e => {this.selectPreset(e.target.id)}} />
                    </div>
                </Col>
                <Col xs={6} md={3} lg={2}>
                    <div className="m-1">
                        <Image id="gvt" rounded fluid  className="presetImage"
                        src={gvt} onClick={e => {this.selectPreset(e.target.id)}} />
                        <span className="text-secondary">GVT is German Volume Training.</span>
                    </div>
                </Col>

            </Row>
        );
        var form =   (<Form 
                        id="workoutSettingsForm"
                        noValidate
                        validated={this.state.validated}
                        onSubmit={e => this.handleSubmit(e)}>
                        <Form.Group controlId="volume">
                            <Form.Label>Volume </Form.Label>

                            <OverlayTrigger trigger="click" placement="top" 
                                overlay={
                                    <Popover  title="Volume">
                                        Volume is the total number of repetitions performed each week.
                                    </Popover>
                                }>
                                <Button variant="info" style={{marginLeft:"0.5em",width:"1em", height:"1.4em", padding:"0"}}>?</Button>
                            </OverlayTrigger>

                                    <InputRange 
                                    name="volume" 
                                    value={this.state.volume} 
                                    min="60" 
                                    max="120" 
                                    step="1" 
                                    labelDict={labelDict}
                                    labelStep ={30}
                                    valueSuffix=" reps per muscle" 
                                    onChange={value => this.setState({volume: value})} />
                            
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Frequency (per muscle)</Form.Label>
                            <OverlayTrigger trigger="click" placement="top" 
                                overlay={
                                    <Popover  title="Frequency">
                                        Frequency is the number of times per week a muscle is worked. Lower frequencies
                                        are better for targeting multiple angles of a muscle while higher frequencies are
                                        better for functional training and increasing intensity.
                                    </Popover>
                                }>
                                <Button variant="info" style={{marginLeft:"0.5em",width:"1em", height:"1.4em", padding:"0"}}>?</Button>
                            </OverlayTrigger>

                                <Form.Control as="select" 
                                    value={this.state.frequency}
                                    onChange={e => this.setState({frequency: e.target.value})}>
                                        <option value="1">One time per week</option>
                                        <option value="2">Two time per week</option>
                                        <option value="3">Three times per week</option>
                                        <option value="4">Four times per week</option>
                                        <option value="5">Five times per week</option>
                                        <option value="6">Six times per week</option>
                                        <option value="7">Seven times per week</option>
                                </Form.Control>
                                                        
                        </Form.Group>
                
                        <Form.Group>
                            <Form.Label>Rep range</Form.Label>
                            <OverlayTrigger trigger="click" placement="top" 
                                overlay={
                                    <Popover  title="Rep Range">
                                        Repetition ranges determine the muscle fiber types that are targeted in a workout. 
                                        Lower repetitions target type 2 fibers while higher repetitions target type 1. The 
                                        sweet spot range for muscle growth is 7-12 reps at 60%-80% of your one rep max.
                                    </Popover>
                                }>
                                <Button variant="info" style={{marginLeft:"0.5em",width:"1em", height:"1.4em", padding:"0"}}>?</Button>
                            </OverlayTrigger>

                                <Form.Control as="select" 
                                    value={this.state.repRange}
                                    onChange={e => this.setState({repRange: e.target.value})}>
                                        <option value="1">Strength (3-6) reps</option>
                                        <option value="2">Hypertrophy (7-12) reps</option>
                                        <option value="3">Endurance (13-20) reps</option>
                                </Form.Control>
  
                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Workouts per muscle</Form.Label>
                            <OverlayTrigger trigger="click" placement="top" 
                                overlay={
                                    <Popover  title="Variation">
                                        Variation determines the number of workouts each muscle will have per workout.
                                        Lower variation allows for one workout to fully fatique the muscle while higher
                                        variation allows the muscle to be hit from multiple angles.
                                    </Popover>
                                }>
                                <Button variant="info" style={{marginLeft:"0.5em",width:"1em", height:"1.4em", padding:"0"}}>?</Button>
                            </OverlayTrigger>

                                <Form.Control as="select" 
                                value={this.state.variation}
                                onChange={e => this.setState({variation: e.target.value})}>
                                    <option value="1">One Workout</option>
                                    <option value="2">Two Workouts</option>
                                    <option value="3">Three Workouts</option>
                                    <option value="4">Four Workouts</option>
                                </Form.Control>


                          </Form.Group>
                          { (this.state.error) ? error : null}

                        <Col className="text-center">
                            <Button className="btn btn-success" type="submit" >Generate</Button>
                        </Col>
                          
                    </Form>);

        var generateAnother = (
            <Col className="text-center">
                 <Button className="btn btn-primary " 
                 onClick={() => {
                     this.props.changeSettings();this.scroll()}} 
                 >Generate Another</Button>
           
            </Col>
            );
        

        return (
            <Container id="workoutSettings" fluid = "true" >
                <Row className="mt-1">
                    <Col xs={12} lg={9} className="mx-auto pl-0 pr-0">
                    <Card >
                        <Card.Header>Generator Settings</Card.Header>
                        <Card.Body>
                        { (!this.props.submitted) ? presets : null}
                        <hr/>
                        { (!this.props.submitted) ? form : null}
                        { (!this.props.submitted) ? null : generateAnother}
                        
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
        );
        
    }
}


export default WorkoutSettings; 