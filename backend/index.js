require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { Client } = require('pg')

app.use(express.static('build'))
app.use(cors())

app.get('/api/login/:username', (request, response) => {

    console.log(request.username)

    const client = new Client({
        host: process.env.HOST,
        port: process.env.DBPORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    })

    const username = request.params.username

    let command = (`select * from "${username}"`)

    
    /**
     * Connects to database and tires if username is found. If true, then responses with password. If false,
     * then responses with null
     */
    client.connect();
    client.query(command, (err, result) => {
    if(!err) {
        response.send(result.rows[0]);
    }else{
    response.send(null)
    }
    client.end();
    })
    
})

app.get('/api/signup', (request, response) => {

    const username = request.query.username;
    const password = request.query.password;

    const client = new Client({
        host: process.env.HOST,
        port: process.env.DBPORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    })

    const createCommand = (`CREATE TABLE "${username}" (id serial PRIMARY KEY, service VARCHAR (50),username VARCHAR ( 50 ) NOT NULL, password VARCHAR ( 50 ) NOT NULL);`)
    const insertCommand = (`INSERT INTO "${username}" (id, service, username, password) VALUES (DEFAULT, 'DB', '${username}', '${password}');`)

    /**
     * Connects to database and tires if username is reserved. If not, then adds new user to database
     */
    client.connect();
    client.query(createCommand, (err) => {
    if(err) {
        console.log("Username is reserved")
        response.send(err)
        return
    }
    client.query(insertCommand, (err, result) => {
        if(!err) {
            console.log("User added")
            response.send(result)
        }else{
            response.send(err) 
        }
        client.end();
    })
    })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})