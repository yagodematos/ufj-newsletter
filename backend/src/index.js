const fastify = require('fastify');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'newsletter_db',
    user: 'admin',
    password: 'senha',
    database: 'newsletter'
});

const app = fastify();

app.get('/', (request, reply) => {
    reply.send("Hello world");
});

app.get('/users', (request, reply) => {
    connection.query(
        'SELECT * FROM `users`',
        (err, results) => {
            if (err) {
                console.log('Connection error: ' + err);
                process.exit()
            }

            if (results.length <= 0) {
                reply.status(200).send([]);
            }

            reply.status(200).send(results);
        }
    )
});

app.post('/users', (request, reply) => {
    const {name, email} = request.body;

    connection.query(
        'INSERT INTO users(name, email) VALUES (?, ?);',
        [name, email],
        (err, result) => {
            if (err) {
                reply.send({ error: err });
            }

            reply.send(result)
        });
});

app.post('/newsletter', (request, reply) => {
    const {message} = request.body;

    connection.query(
        'SELECT name, email FROM `users`',
        (err, result) => {
            if (err) {
                console.log('Newsletter error: ' + err);
                process.exit()
            }

            reply.send({
                "users": result,
                message
            })
        }
    )
});


app.listen({port: 8080, host: "0.0.0.0" })
