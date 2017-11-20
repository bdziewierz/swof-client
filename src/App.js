import React, { Component } from 'react';
import moment from 'moment';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            engineers: [],
            baus: []
        };
    }

    componentDidMount(){
        // Call an API endpoint and get BAU for today's date.
        let now = moment();
        fetch(`https://95anp0ckjc.execute-api.eu-west-1.amazonaws.com/dev/bau/` + now.format('YYYY-MM-DD'))
            .then( result => result.json() )
            .then( bauData => this.setState(bauData) )
    }

    render() {
        const engineers = this.state.engineers.map((engineer) =>
            <li>{engineer}</li>
        );

        const baus = this.state.baus.map((bauEngineer) =>
            <li>{bauEngineer}</li>
        );

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Support Wheel of Fate</h1>
                </header>
                <p className="App-intro">
                    <ul>{engineers}</ul>
                    <ul>{baus}</ul>
                </p>
            </div>
        );
    }
}

export default App;
