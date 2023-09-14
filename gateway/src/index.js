const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path')
const http = require('node:http')


const app = express();

const httpAgent = new http.Agent({keepAlive: true});


app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/newsletter', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'newsletter.html'));
});

app.post('/users', bodyParser.urlencoded({ extended: true }), async (req, res) => {
    const {name, email} = req.body;

    try {
        const response = await fetch('http://newsletter_backend:8080/users', {
            method: 'post',
            agent: httpAgent,
            body: JSON.stringify({name, email}),
            headers: {'Content-Type': 'application/json'}
        });

        const data = await response.json()

        res.send(data);
    } catch (error) {
        console.log(error);
    }
});

app.post('/newsletter', bodyParser.urlencoded({ extended: true }),  async (req, res) => {
    const {passwd, message} = await req.body;

    if (passwd != process.env.PASSWD) {
        res.sendStatus(401);
    }

    try {
        const response = await fetch('http://newsletter_backend:8080/newsletter', {
            method: 'post',
            agent: httpAgent,
            body: JSON.stringify({message}),
            headers: {'Content-Type': 'application/json'}
        });

        const data = await response.json();

        res.send(data);
    } catch (error) {
        console.log(error);
    }
});


app.listen(8000);
