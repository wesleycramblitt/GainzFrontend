import React from 'react'
import Container from 'react-bootstrap/Container';
import Col  from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import logo from './img/logo.PNG';
import Image from 'react-bootstrap/Image';
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
                                    <Col xs={12} md={4} lg={3}>
                                        <Image src={logo} rounded fluid />
                                    </Col>
                                </Row>
                                <Row>
                                <Col>
                                <h4 className="mb-3 mt-3">
                                    Welcome to Gainz Intelligent Workout Routine Generator!
                                </h4>
                                <p>
                                    Gainz generates weekly workout routine based on your individualized goals. 
                                </p>
                                <p>
                                    Each routine is intelligently generated to balance muscle groups and pick a workout split best fitting
                                    the parameters you enter. 
                                </p>
                                <p>
                                    Get started below.
                                </p>
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