import ReactDOM from 'react-dom';
import React from 'react';
import Spinner  from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

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
        return <Alert variant="danger">Error: {this.props.error.message}</Alert>
      } 
      else if(this.props.isLoaded == undefined) {
        return <div id="workoutRoutine"></div>;
      }
      else if (!this.props.isLoaded) 
      {
        return (
          <div id="workoutRoutine" className="d-flex justify-content-center" style={{marginTop:"20vh"}}>
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
                          <Card>
                              <Card.Header>Routine Summary</Card.Header>
                              <Card.Body>
                                <Row>
                                <Col xs={12} lg={6}>
                                    <label className="font-weight-bold pr-1">Volume: </label>
                                    <span>{this.props.routineData.volume} reps per muscle</span>
                                </Col>
                                
                                <Col xs={12} lg={6}>
                                    <label className="font-weight-bold pr-1">Frequency: </label>
                                    <span>{this.props.routineData.frequency} time(s) per week</span>
                                </Col>
                                <Col xs={12} lg={6}>
                                  <label className="font-weight-bold pr-1">Rep Scheme: </label>
                                  <span>{this.props.routineData.repScheme.sets} sets of {this.props.routineData.repScheme.reps} reps</span>
                                </Col>
                                <Col xs={12} lg={6}>
                                  <label  className="font-weight-bold pr-1">Equipment: </label>
                                  {
                                    this.props.routineData.exerciseTypes.map((name, index) => (
                                      (index == this.props.routineData.exerciseTypes.length-1) ?
                                        <span>{name}</span> :
                                        <span>{name}, </span>
                                    ))
                                  }
                                </Col>
                                <Col xs={12} lg={6}>
                                  <label  className="font-weight-bold pr-1">Split: </label>
                                  
                                    <span> {this.props.routineData.splitName}</span>
                                </Col>
                                </Row>
                              </Card.Body>
                          </Card>
                            {this.props.routineData.workoutDays.map((item, index) => (
                            (item.isRest) ?
                            <Row className="mb-3 mt-1" key={"routineData"+index}>
                                <Col xs={12}  className="mx-auto">
                                    <Card >
                                        <Card.Header>Day {index+1}</Card.Header>
                                        <Card.Body>
                                            <Card.Title>Rest</Card.Title>
                                        </Card.Body>
                                    </Card> 
                                </Col>
                            </Row>
                            :
                            <Row className="mb-3 mt-1"  key={"routineData"+index}>
                                <Col xs={12}  className="mx-auto">
                                    <Card  className="bg-light">
                                        <Card.Header>Day {index+1}</Card.Header>
                                        <Card.Body>
                                        <Card.Title> {item.name}</Card.Title>
                                        {item.workouts.map(workout => (
                                                    <Card  key={workout.exercise.name}>

                                                          <Card.Body>
                                                              <Card.Title>{workout.exercise.name}</Card.Title>
                                                              <div>
                                                                    <label className="form-label">Muscles Worked:  </label>

                                                                    {workout.exercise.exerciseMuscles.map((exerciseMuscle,i) =>
                                                                      {
                                                                        if (i == workout.exercise.exerciseMuscles.length -1) {
                                                                          return (" "+exerciseMuscle.muscle.name );
                                                                        }
                                                                        else
                                                                        {
                                                                            return (" "+exerciseMuscle.muscle.name + ", ");
                                                                        }
                                                                        
                                                                    })}
                                                                </div>
                                                                <div>{workout.repScheme.sets} set(s) of {workout.repScheme.reps} reps</div>
                                                                <div>  <a  target="_blank" 
                                                              href={"https://www.google.com/search?q="+workout.exercise.name.replace(" ", "+")}
                                                              >Demonstration</a>
                                                              </div>

                                                          </Card.Body>
                                                      
                                                    </Card>

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