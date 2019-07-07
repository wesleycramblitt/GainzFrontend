import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Col  from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import logo from './img/logo.PNG';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

class Welcome extends React.Component {
    render() {
        return (
            <Container fluid="true">
                <Row className="" >
                    <Col xs={12} lg={9} className="mx-auto pl-0 pr-0">
                        <Card>
                            <Card.Header>Getting Started</Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col xs={12} md={6} className="mx-auto">
                                        <Image src={logo} rounded fluid />
                                    </Col>
                                </Row>
                                <Row>
                                <Col className="text-center">
                                <h4 className="mb-3 mt-3">
                                    Welcome to Gainz Intelligent Workout Routine Generator!
                                </h4>
                                <p>
                                    Gainz generates completely free weekly workout routines based on your fitness goals. 
                                </p>
                                <p>
                                    Each routine is intelligently generated to balance muscle groups and pick a workout split best fitting
                                    the parameters you enter. 
                                </p>

                                    <Col className="text-center">
                                        <Button variant="primary"
                                        onClick={e => { 
                                            ReactDOM.findDOMNode(this.props.scrollTo.current).scrollIntoView({behavior:"smooth"})
                                    
                                        }}>
                                            Get Started</Button>
                                    </Col>
                                </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default Welcome;