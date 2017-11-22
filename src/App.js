import React, { Component } from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import WheelOfFate from './WheelOfFate'

import 'react-dates/lib/css/_datepicker.css';
import './App.css';

/**
 * Main App entry point
 */
class App extends Component {
    constructor() {
        super();
        this.dateChanged = this.dateChanged.bind(this);
        this.nextDate = this.nextDate.bind(this);
        this.previousDate = this.previousDate.bind(this);
        this.state = {
            datePicker: true,
            date: moment(),
            engineers: [],
            baus: [null, null]
        };
    }

    componentWillMount() {
        this.dateChanged(moment());
    }

    /**
     *  Handles change of the date
     */
    dateChanged(date) {
        fetch(`https://95anp0ckjc.execute-api.eu-west-1.amazonaws.com/dev/baus/` + date.format("YYYY-MM-DD"))
            .then( result => result.json() )
            .then( bauData => this.setState({
                date: date,
                engineers: bauData.engineers,
                baus: bauData.baus
            }))
    }

    /**
     * Sets current date to next
     */
    nextDate() {
        const nextDate = this.state.date.add(1, 'd');
        this.setState({
            date: nextDate
        });
        this.dateChanged(nextDate);
    }

    /**
     * Sets current date to previous
     */
    previousDate() {
        const previousDate = this.state.date.subtract(1, 'd');
        this.setState({
            date: previousDate
        });
        this.dateChanged(previousDate);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Support Wheel of Fate</h1>
                    <div className="current-date">
                        <button onClick={this.previousDate}>&laquo;</button>
                        <SingleDatePicker
                        readOnly={true}
                        isOutsideRange={() => {return false}}
                        displayFormat="ddd, MMM Do, YYYY"
                        date={this.state.date}
                        onDateChange={this.dateChanged}
                        focused={this.state.focused}
                        showDefaultInputIcon={true}
                        hideKeyboardShortcutsPanel={true}
                        onFocusChange={({ focused }) => this.setState({ focused })}
                        numberOfMonths={1}/>
                        <button onClick={this.nextDate}>&raquo;</button>
                    </div>
                </header>
                <div className="wheels-wrapper">
                    <div className="wheel-one wheel-wrapper">
                        <WheelOfFate engineers={this.state.engineers} bau={this.state.baus[0]} radius={150} label="Morning BAU"/>
                    </div>
                    <div className="wheel-two wheel-wrapper">
                        <WheelOfFate engineers={this.state.engineers} bau={this.state.baus[1]} radius={150} label="Afternoon BAU"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
