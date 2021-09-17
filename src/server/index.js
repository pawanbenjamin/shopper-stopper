const express = require('express')
const volleyball = require('volleyball')
const client = require('./db/client')

const PORT = 3000

const app = express()

client.connect()

app.use(express.json())
app.use(volleyball)

app.get('/', (req, res, next)=>{
    res.send('Up and Running')
})

app.listen(PORT, ()=>{
    console.log(`Served up and listening on PORT ${PORT}`)
})
