const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5050;

app.use('/', express.static(__dirname + '/src'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (res) => {
    res.sendFile('index.html');
});

app.post('/submit', (req, res) => {
    new Promise((resolve, reject) => {
        validate(req.body, resolve, reject);
    })
    .then((info) => {
        console.log('info: ', info);
        // res.end(info);
        res.send(JSON.stringify({info}));
        // app.get('/complete');
    });
});

app.listen(PORT, () => {
    console.log('app listening on port: ', PORT);
});

function validate(info, resolve, reject) {
    let valid = true;
    let send = 'Issue with: ';
    if (!checkName(info.name)) {
        send += ' Name';
        valid = false;
    };
    
    if (!checkCard(info.cardNumber, info.expiration, info.csv)){
        send += ' Card'; 
        valid = false;
    };
    
    if (!checkAddress(info.address)) {
        send += ' Address';
        valid = false;
    };

    if (!checkCity(info.city)) {
        send += ' City';
        valid = false;
    };

    if (!checkState(info.state)) {
        send += ' State';
        valid = false;
    };

    if (!checkZip(info.zip)) {
        send += ' Zip';
        valid = false;  
    };

    if (valid) {
        send = 'Successful Payment';
    } else {
        send += '____There was an error processing payment. Please try again.';
    }

    resolve(send);
}

// first and last name at least
function checkName(name) {
    let valid = false;
    let formatted = name.split(' ');
    if (formatted.length > 1) {
        valid = true;
    }

    return valid;
}

function checkCard(number, expir, csv) {
    if (!number || !expir || !csv) {
        return false;
    }

    expir = expir.split('/');
    let month = expir[0];
    let year = expir[1];
    // check in tandem with front end validation;
    if (number.length !== 16) {
        return false;
    }

    if (month <= 0 || month >= 13) {
        return false;
    }

    if (month.length !== 2 || year.length !== 2) {
        return false;
    }

    if (csv.length !== 3) {
        return false;
    }

    return true;
}

function determineNumStatus(num) {
    let number = parseInt(num, 10);
    let answer = false;
    if (typeof number === 'number' && isNaN(number)) {
        answer = true;
    }

    return answer;
}

function checkAddress(address) {
    if (!address) {
        return false;
    }

    let valid = true;
    address = address.split(' ');
    // could do way better here
    let num = address[0];
    let st = address[1];
    if (!num || !st) {
        return false;
    }

    if(determineNumStatus(num)) {
        return false;
    };

    if (typeof st !== 'string' || !isNaN(parseInt(st, 10))) {
        return false;
    }

    return valid;
}

function checkCity(city) {
    if (!city) {
        return false;
    }

    let valid = false;
    if (typeof city === 'string') {
        valid = true;
    }

    return valid;
}

function checkState(state) {
    if (!state) {
        return false;
    }

    let valid = false;
    if (typeof state === 'string' && state.length === 2) {
        valid = true;
    }

    return valid;
}

function checkZip(zip) {
    if (!zip) {
        return false;
    }

    let valid = false;
    if (zip.length === 5) {
        valid = true;
    }

    if (determineNumStatus(zip)) {
        valid = false;
    };

    return valid;
}