const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();

app.use(express.static('public'))

app.use(express.static('public/newsletter.html'))

// fazer router do /newsletter para public/newsletter.html


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


app.listen(8000, () => console.log('express running'));
