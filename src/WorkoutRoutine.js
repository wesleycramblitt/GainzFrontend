import ReactDOM from 'react-dom';
import React from 'react';
import Spinner  from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';

const spinner = {
    width: '10em',
    height: '10em',
    margin: 'auto'    
  };

class WorkoutRoutine extends React.Component {
    constructor(props) {
      super(props);
      this.state = {scrolledIntoView:false};
    }

    componentDidUpdate() {
      //After is loaded scroll into view
      if (this.props.isLoaded == true && this.state.scrollIntoView == false) {
          ReactDOM.findDOMNode(this).scrollIntoView({behavior: "smooth"});
          this.setState({scrollIntoView:true});
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.isLoaded == undefined || nextProps.isLoaded == false) {
        this.setState({scrollIntoView:false});
      }
    }

    render() {
      
      if (this.props.error) 
      {
        return <Col xs={12} lg={9} className="mx-auto pl-0 pr-0">
                  <Alert variant="danger">Error: {this.props.error.message}</Alert>
                </Col>

      } 
      else if(this.props.routineData.failed)
      {
        return <Col xs={12} lg={9} className="mx-auto pl-0 pr-0">
                  <Alert variant="warning">Error: {this.props.routineData.failureMessage}</Alert>
              </Col>
      }
      else if(this.props.isLoaded == undefined) {
        return <div ></div>;
      }
      else if (!this.props.isLoaded) 
      {
        return (
          <div  className="fixedCenter">
                <Spinner animation="grow" variant="success" style={spinner}></Spinner>
          </div>
        )
      }
      else {
        return (
          <Container id="workoutRoutine" fluid="true">
                <Row className="mb-3 mt-1">
                  <Col xs={12} lg={9} className="mx-auto pl-0 pr-0">
                  <Card >
                      <Card.Header>Workout Routine</Card.Header>
                      <Card.Body>

                          <Row>
                          <Col xs={12}>
                              <label className="font-weight-bold pr-1">Name: </label>
                              <span>{this.props.routineData.name}</span>
                              <OverlayTrigger trigger="click" placement="top" 
                                  overlay={
                                      <Popover  title="Name">
                                          Names are randomly generated.
                                      </Popover>
                                  }>
                                  <Button variant="info" style={{marginLeft:"0.5em",width:"1em", height:"1.4em", padding:"0"}}>?</Button>
                              </OverlayTrigger>
                          </Col>
                          <Col xs={12} lg={6}>
                              <label className="font-weight-bold pr-1">Volume: </label>
                              <span>{this.props.routineData.volume} rep(s) per muscle</span>
                          </Col>
                          
                          <Col xs={12} lg={6}>
                              <label className="font-weight-bold pr-1">Frequency: </label>
                              <span>{this.props.routineData.frequency} time(s) per week</span>
                          </Col>
                          <Col xs={12} lg={6}>
                            <label className="font-weight-bold pr-1">Rep Scheme: </label>
                            <span>{this.props.routineData.repScheme.sets} set(s) of {this.props.routineData.repScheme.reps} rep(s)</span>
                          </Col>
                          <Col xs={12} lg={6}>
                            <label  className="font-weight-bold pr-1">Equipment: </label>
                            {
                              this.props.routineData.exerciseTypes.map((name, index) => (
                                (index == this.props.routineData.exerciseTypes.length-1) ?
                                  <span key={"types"+index}>{name}</span> :
                                  <span key={"types"+index}>{name}, </span>
                              ))
                            }
                          </Col>
                          <Col xs={12} lg={6}>
                            <label  className="font-weight-bold pr-1">Split: </label>
                            
                              <span> {this.props.routineData.splitName}</span>
                          </Col>
                          </Row>

                            {this.props.routineData.workoutDays.map((item, index) => (
                            (item.isRest) ?
                            <Row className="mb-3 mt-1" key={"routineData"+index}>
                                <Col xs={12}  className="mx-auto">
                                    <Card >
                                        <Card.Header>Day {index+1} - Rest</Card.Header>
                                    </Card> 
                                </Col>
                            </Row>
                            :
                            <Row className="mb-3 mt-1"  key={"routineData"+index}>
                                <Col xs={12}  className="mx-auto">
                                    <Card  className="bg-light">
                                        <Card.Header>Day {index+1} - {item.name}</Card.Header>
                                        <Card.Body>
                                        {item.workouts.map(workout => (
                                           <div  key={workout.exercise.name}>
                                                <a  target="_blank" href={"https://www.google.com/search?q="+workout.exercise.name.replace(" ", "+")}> 
                                                {workout.exercise.name}
                                                </a>
                                                {/* {workout.repScheme.sets} set(s) of {workout.repScheme.reps} reps*/}
                                            </div>
                                            ))}
                                            
                                        </Card.Body>
                                    
                                    </Card>
                                </Col>
                            </Row>
                            ))}
                        </Card.Body>
                      </Card> 
                    </Col>
                </Row>
    
          </Container>
        )}

      }
    }
  

  export default WorkoutRoutine;