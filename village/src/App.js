import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import Smurf from "./components/Smurf";
import { Route, NavLink } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3333/smurfs')
      .then(response => {
        this.setState({
          smurfs: response.data
        });
      })
      .catch(err => {
        console.log('Error:', err)
      });
  }

  updateSmurfs = (smurfs) => {
    this.setState({ smurfs })
  }
  
  render() {
    const { smurfs } = this.state;

    return (
      <div className="App">
        <nav>
          <div className="nav-links">
            <NavLink to="/smurfs">Smurfs</NavLink>
            <NavLink to="/smurf-form">SmurfForm</NavLink>
          </div>
        </nav>
      
        <Route path="/smurfs" exact render={(props) => <Smurfs {...props} smurfs={smurfs} />} />
        <Route path="/smurfs/:id" render={(props) => <Smurf {...props} smurfs={smurfs} />} />
        <Route path="/smurf-form" exact render={(props) => <SmurfForm {...props} updateSmurfs={this.updateSmurfs} />} />
      </div>

    );
  }
}

export default App;
