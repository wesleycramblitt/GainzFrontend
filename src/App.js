import React from 'react';
import './css/App.css';
import Navigation from './Navigation.js';
import Welcome from './Welcome.js';
import WorkoutGenerator from './WorkoutGenerator.js';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() { 

    return (
      <div className="App">
        <Navigation/>
        <Welcome />
        <WorkoutGenerator />

      </div>
    );
  }
}

export default App;
