import React, {Component} from 'react';

export class CardInput extends Component {
    render() {
        return (
            <input 
                className="block"
                onChange={() => this.logValueChange(this.props.type)}
                placeholder={this.props.type}
                id={this.props.type}
                value={this.state[this.props.type].val || ''}
            ></input>
        )
    }

    logValueChange(id) {
        let div = document.getElementById(id);
        let val = div.value;
        if (div.value.length > this.state[id].chars) {
            return;
        }

        if (div.value !== '') {
            var lastNum = div.value.split('')[div.value.length - 1];
            var num = parseInt(lastNum, 10);
            if (this.state[id].strictlyNumeric && typeof num === 'number' && isNaN(num)) {
                return;
            }
        }

        if (id === 'expiration') {
            if (div.value.length === 2) {
                val += '/';
            }
        }

        this.setState({
            [id]: {...this.state[id], val}
        });

        this.value(val, id);
    }
    componentWillMount() {
        this.determineType(this.props.type);
    }

    determineType(type) {
        let qualities = CardInput.typeMap[type];
        this.setState({
            [type]: qualities
        });
    }
    value(val, id) {
        this.props.value(val, id);
    }
}

// most validation done on backend, but need to vet here first as well
// as a good practice
CardInput.typeMap = {
    csv: {
        chars: 3,
        strictlyNumeric: true,
    },
    address: {
       chars: 50,
       strictlyNumeric: false 
    },
    city: {
        chars: 50,
        strictlyNumeric: false
    }, 
    state: {
        chars: 2,
        strictlyNumeric: false
    },
    zip: {
        // if not US-standard or if they use the whole postal code?
        // something to hash out later
        chars: 5,
        strictlyNumeric: true
    },
    cardNumber: {
        chars: 16,
        strictlyNumeric: true,
    }, 
    expiration: {
        chars: 5,
        strictlyNumeric: true,
    },
    name: {
        chars: 50,
        strictlyNumeric: false,
    }
}