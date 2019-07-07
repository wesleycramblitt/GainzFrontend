import React from 'react'
import './css/range.css';

class InputRange extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.valueSuffix === undefined ) {
            this.props.valueSuffix = "";
        }

        this.state = 
        {
            value: this.props.value,
            label: ""
        }


    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.value !== this.state.value) {
          this.setState({ value: nextProps.value });
        }
      }

    componentDidMount() {
        this.updateLabel(this.props.value);
    }

    updateLabel(value) {
        if (this.props.labelStep !== undefined) {
            var key = Math.floor(value/this.props.labelStep)*this.props.labelStep;
            this.setState({label: this.props.labelDict === undefined ? "" : this.props.labelDict[key]});
        }
    }

    change (e) {
        var value = e.target.value;

        this.updateLabel(value);

        this.setState({value:value});

        if (this.props.onChange !== undefined) {
            this.props.onChange(value);
        }
    }

    render () {
        return (<div>
            <input type="range" 
                    min={this.props.min} 
                    max={this.props.max} 
                    step={this.props.step} 
                    value={this.state.value}
                    name= {this.props.name}
                    onChange={e => this.change(e)}>
            </input>
            <div className="mb-1">
                <label className="text-secondary">{this.state.value} {this.props.valueSuffix} </label>
            </div>
            <div className="mb-1">
                <p className="text-secondary">{this.state.label}</p>
            </div>
        </div>);
    }
}


export default InputRange;