import React from 'react';
import './css/App.css';
import Navigation from './Navigation.js';
import Welcome from './Welcome.js';
import WorkoutGenerator from './WorkoutGenerator.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.workoutGenerator = React.createRef();
  }

  render() { 

    return (
      <div className="App">
        <Navigation/>
        <Welcome scrollTo={this.workoutGenerator} />
        <WorkoutGenerator ref={this.workoutGenerator}/>

      </div>
    );
  }
}

export default App;
