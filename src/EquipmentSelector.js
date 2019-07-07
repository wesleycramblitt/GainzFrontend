import React from 'react';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import barbell from './img/barbell.jpeg';
import bodyweight from './img/bodyweight.jpg';
import bodyweightequipment from './img/bodyweightequipment.jpg';
import cables from './img/cables.jpg';
import dumbbells from './img/dumbbells.jpg';

import './css/equipmentSelector.css';

class EquipmentSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {exerciseTypes: this.props.exerciseTypes}
    }    

    updateExerciseTypes(value) {
        console.log(this.state.exerciseTypes);
        var index = this.state.exerciseTypes.indexOf(value);
        
        if (index == -1) {
            var exerciseTypes = this.state.exerciseTypes;
            exerciseTypes.push(value);
            this.props.updateParentState(exerciseTypes);
            this.setState({exerciseTypes:exerciseTypes});
        }
        else
        {
            var exerciseTypes = this.state.exerciseTypes;
            exerciseTypes.splice(index,1);
            this.props.updateParentState(exerciseTypes);
            this.setState({exerciseTypes:exerciseTypes});
        }

    }

    getImageClassName(value) {
        console.log("getImage");
        var className = "equipmentImg";
        if (value.length == undefined) {
            if (this.state.exerciseTypes.includes(value)) {
                className += " imgSelected";
            }
            return className;
        }
        
        
        for (var i in value) {
            if (this.state.exerciseTypes.includes(value[i])) {
                className += " imgSelected";
                return className;
            }
        }
        return className;
    }
    render () {
        return (
            <Row>
          
                <Col xs={6} md={4} lg={2}>
                    <Image src={barbell} fluid rounded className={this.getImageClassName(2)}
                        onClick={e => {this.updateExerciseTypes(2);}} />
                </Col>
                <Col xs={6} md={4} lg={2}>
                    <Image src={dumbbells} fluid rounded className={this.getImageClassName(3)}
                        onClick={e => {this.updateExerciseTypes(3);}} />
                </Col>
                <Col xs={6} md={4} lg={2}>
                    <Image src={cables} fluid rounded className={this.getImageClassName([5,6])}
                        onClick={e => {
                            this.updateExerciseTypes(5); 
                            this.updateExerciseTypes(6); //Cables and machines were 5 and 6. Now put together
                        }} />
                </Col>
                <Col xs={6} md={4} lg={2}>
                    <Image src={bodyweight} fluid rounded className={this.getImageClassName(0)}
                        onClick={e => {
                                this.updateExerciseTypes(0);

                                }} />
                </Col>
                <Col xs={6} md={4} lg={2}>
                    <Image src={bodyweightequipment} fluid rounded className={this.getImageClassName(1)}
                        onClick={e => {
                                this.updateExerciseTypes(1);
                                }} />
                </Col>
            </Row>
        );
    }
}

export default EquipmentSelector;