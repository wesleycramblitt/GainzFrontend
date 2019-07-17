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
        <div style={{height:"50vh"}}></div>
        <footer className="container-fluid footer">
          <div className="row h-100">
            <div className="col-12 text-center my-auto">
              <small>Copyright @2019 Gainz</small>
            </div>
            </div>
        </footer>
      </div>
    );
  }
}

export default App;
