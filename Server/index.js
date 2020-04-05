const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const db = require('./db')
const userRouter = require('./routes/user-routers')

const app = express()
const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use('/public', express.static('public'));


db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', userRouter)
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
