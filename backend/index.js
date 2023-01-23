require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { Client } = require('pg')
const bcrypt = require('bcrypt')

app.use(express.static('build'))
app.use(express.json());
app.use(cors())

app.post('/api/login', (request, response) => {

    const {username, password} = request.body;

    const client = new Client({
        host: process.env.HOST,
        port: process.env.DBPORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    })

    let command = (`select * from "${username}"`)

    
    /**
     * Connects to database and tires if username is found. If true, then responses with password. If false,
     * then responses with null
     */
    client.connect();
    client.query(command, async (err, result) => {
    if(!err) {
        hashPassword = (result.rows[0].password);
        if(await bcrypt.compare(password, hashPassword)) {
            response.send(true)
        }else{
            response.send(false)
        }
    }else{
        response.send(false)
    }
    client.end();
    })
    
})

app.post('/api/signup', async (request, response) => {

    const {username, password} = request.body;
    const hashedPassword = await bcrypt.hash(password, 10); 

    console.log(username)
    console.log(password)
    console.log(hashedPassword)

    const client = new Client({
        host: process.env.HOST,
        port: process.env.DBPORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    })

    const createCommand = (`CREATE TABLE "${username}" (id serial PRIMARY KEY, service VARCHAR (50),username VARCHAR ( 50 ) NOT NULL, password VARCHAR ( 60 ) NOT NULL);`)
    const insertCommand = (`INSERT INTO "${username}" (id, service, username, password) VALUES (DEFAULT, 'DB', '${username}', '${hashedPassword}');`)

    /**
     * Connects to database and tires if username is reserved. If not, then adds new user to database
     */
    client.connect();
    client.query(createCommand, (err) => {
    if(err) {
        console.log("Username is reserved")
        response.end('42P07')
    }
    client.query(insertCommand, (err, result) => {
        if(!err) {
            console.log("User added")
            response.end()
        }else{
            response.end() 
        }
        client.end();
    })
    })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})