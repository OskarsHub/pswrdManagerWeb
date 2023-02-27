require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
const cors = require('cors')
const { Client } = require('pg')
const bcrypt = require('bcrypt')
const encrypt = require('./controllers/encryption')
const decrypt = require('./controllers/encryption')

app.use(express.json());
app.use(cors({
    origin: 'https://pswrd-manager-web.vercel.app/'
}));

/**
 * Login
 */
app.post('/api/login', (request, response) => {

    const {username, password} = request.body;

    const client = new Client({
        host: process.env.HOST,
        port: process.env.DBPORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        ssl: {'sslmode': 'require'}
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

            const userForToken = {
                username: username,
            }

            /**
             * Creates authToken to user that experies in 5 minutes
             */
            const Token = jwt.sign(
                userForToken,
                process.env.ACCESS_TOKEN_PRIVATE_KEY,
                { expiresIn: '5min' }
                )

            response.send({Token})
        }else{
            response.send(false)
        }
    }else{
        response.send(false)
    }
    client.end();
    })
    
})

/**
 * Signin up
 */
app.post('/api/signup', async (request, response) => {

    const {username, password} = request.body;
    const hashedPassword = await bcrypt.hash(password, 10); 

    const client = new Client({
        host: process.env.HOST,
        port: process.env.DBPORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        ssl: {'sslmode': 'require'}
    })

    const createCommand = (`CREATE TABLE "${username}" (id serial PRIMARY KEY, service VARCHAR (50),username VARCHAR ( 50 ) NOT NULL, password VARCHAR ( 64 ) NOT NULL, iv VARCHAR (32));`)
    const insertCommand = (`INSERT INTO "${username}" (id, service, username, password) VALUES (DEFAULT, 'DB', '${username}', '${hashedPassword}');`)

    /**
     * Connects to database and tires if username is reserved. If not, then adds new user to database
     */
    client.connect();
    console.log(client)
    client.query(createCommand, (err) => {
    if(err) {
        console.log("Username is reserved")
        response.end('42P07')
    }
    client.query(insertCommand, (err, result) => {
        if(!err) {
            console.log("User added")
            response.send()
        }else{
            response.send() 
        }
    })
    client.end();
    })
})

/**
 * Get users passwords
 */
app.get('/api/user', (request, response) => {

    const {masterUser} = request.query
    console.log(masterUser)

    const client = new Client({
        host: process.env.HOST,
        port: process.env.DBPORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        ssl: {'sslmode': 'require'}
    })

    const command = (`SELECT * FROM "${masterUser}" WHERE id > 1;`)

    client.connect();
    client.query(command, (err, result) => {
    if(err) {
        console.log(err)
        console.log("Error")
        response.send('cannot get')
    }else{
        let databasePasswords = result.rows
        let userPasswords = new Array(result.rowCount);

        /**
         * Goes trough data from database and decrypts passwords
         */
        for (let i = 0; i < userPasswords.length; i++) {
            const ePassword = result.rows[i].password
            const iv = result.rows[i].iv

            password = decrypt.decrypt(ePassword, iv)

            userPasswords[i] = {
                id: i, 
                service: databasePasswords[i].service,
                username: databasePasswords[i].username,
                password: password
            }
        }
        response.send(userPasswords)

    }
    client.end();
    })
})

/**
 * Saving new password to database
 */
app.post('/api/user', (request, response) => {
    const authToken = request.headers.authorization;

    /**
     * Tries if users authToken is still valid
     */
    try{
    const auth = jwt.verify(authToken, process.env.ACCESS_TOKEN_PRIVATE_KEY)
    }catch{
        //If authToken has experied, then send logout request
        response.send('logout')
        return
    }

    const {masterUser, service, username, password} = request.body;

    //encrypt password for database
    ePassword = encrypt.encrypt(password)

    const client = new Client({
        host: process.env.HOST,
        port: process.env.DBPORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE, 
        ssl: {'sslmode': 'require'}
    })

    const command = (`INSERT INTO "${masterUser}" (id, service, username, password, iv) VALUES (DEFAULT, '${service}', '${username}', '${ePassword.encryptedData}', '${ePassword.iv}');`)

    console.log(command)

    client.connect();
    client.query(command, (err) => {
    if(err) {
        console.log(err)
        console.log("Error")
        response.send('cannot add')
    }else{
        console.log("correct")
        response.send("added")
    }
    client.end();
    })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})