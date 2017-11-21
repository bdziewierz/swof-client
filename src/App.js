import React, { Component } from 'react';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';
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

    dateChanged(date) {
        this.calendarToggled();
        fetch(`https://95anp0ckjc.execute-api.eu-west-1.amazonaws.com/dev/baus/` + date.format("YYYY-MM-DD"))
            .then( result => result.json() )
            .then( bauData => this.setState({
                date: date,
                engineers: bauData.engineers,
                baus: bauData.baus
            }))
    }

    calendarToggled() {
        this.setState({
            datePickerOpen: !this.state.datePickerOpen
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Support Wheel of Fate</h1>
                    <div className="current-date">BAU for <SingleDatePicker
                        readOnly={true}
                        isOutsideRange={() => {return false}}
                        displayFormat="dddd, MMM Do, YYYY"
                        date={this.state.date}
                        onDateChange={this.dateChanged}
                        focused={this.state.focused}
                        onFocusChange={({ focused }) => this.setState({ focused })}
                    /></div>
                </header>
                <div className="wheels-wrapper">
                    <div className="wheel-one wheel-wrapper">
                        <WheelOfFate engineers={this.state.engineers} bau={this.state.baus[0]} x={200} y={200} radius={150} />
                    </div>
                    <div className="wheel-two wheel-wrapper">
                        <WheelOfFate engineers={this.state.engineers} bau={this.state.baus[1]} x={200} y={200} radius={150} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
