const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path')

const app = express();


app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/newsletter', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'newsletter.html'));
});

app.post('/users', bodyParser.urlencoded({ extended: true }), async (req, res) => {
    const {name, email} = req.body;

    const response = await fetch('http://newsletter_backend:8080/users', {
        method: 'post',
        body: JSON.stringify({name, email}),
        headers: {'Content-Type': 'application/json'}
    });

    const data = await response.json()

    res.send(data);
});

app.post('/newsletter', bodyParser.urlencoded({ extended: true }),  async (req, res) => {
    const {passwd, message} = await req.body;

    if (passwd != process.env.PASSWD) {
        res.sendStatus(401);
    }

    const response = await fetch('http://newsletter_backend:8080/newsletter', {
        method: 'post',
        body: JSON.stringify({message}),
        headers: {'Content-Type': 'application/json'}
    });

    const data = await response.json();

    res.send(data);
});


app.listen(8000);
