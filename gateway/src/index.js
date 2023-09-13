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

    const response = await fetch('http://localhost:8080/users', {
        method: 'post',
        body: JSON.stringify({name, email}),
        headers: {'Content-Type': 'application/json'}
    });

    const data = await response.json()

    res.send(data);
});

app.post('/newsletter', async (req, res) => {

});


app.listen(8000, () => console.log('express running'));
