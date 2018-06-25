import React, {Component} from 'react';

import {CardInput} from './CardInput';

// would probably handle CardInput with map next time instead so that 
// I wouldnt have so much duplicate code
export class CardForm extends Component {
    componentWillMount() {
        this.setState({
            submitted: false
        });
    }

    render() {
        if (this.state.submitted) {
            return (
                <div>Submitted Successfully!</div>
            )
        } else {
            return (
                <div>
                    <div>Welcome to Payment</div>
                    <div className="container">
                        <CardInput
                            type="name"
                            value={(data, id) => this.getValue(data, id)}
                        />
                        <CardInput
                            type="cardNumber"
                            value={(data, id) => this.getValue(data, id)}
                        />
                        <CardInput
                            type="expiration"
                            value={(data, id) => this.getValue(data, id)}
                        />
                        <CardInput
                            type="csv"
                            value={(data, id) => this.getValue(data, id)}
                        />
                        <CardInput
                            type="address"
                            value={(data, id) => this.getValue(data, id)}
                        />
                        <CardInput
                            type="city"
                            value={(data, id) => this.getValue(data, id)}
                        />
                        <CardInput
                            type="state"
                            value={(data, id) => this.getValue(data, id)}
                        />
                        <CardInput
                            type="zip"
                            value={(data, id) => this.getValue(data, id)}
                        />
                        <button
                            id="submit"
                            onClick={() => this.submitData()}
                        >Submit</button>
                    </div>
                    <div>{this.state.error || ''}</div>
                </div>
            )
        }
    }

    submitData() {
        return fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state),
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            if (res.info.indexOf('Success') > -1) {
                this.setState({
                    submitted: res.info
                })
            } else {
                this.setState( {
                    submitted: false,
                    error: res.info,
                })
            }
        })
    }

    getValue(data, id) {
        this.setState({
            [id]: data 
        });
    }
}