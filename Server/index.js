const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//const fileUpload = require('express-fileupload')


const db = require('./db')
const userRouter = require('./routes/user-routers')

const app = express()
const apiPort = 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

//app.use(bodyParser.urlencoded({ extended: true }))
//app.use(cors())
//app.use(bodyParser.json())
app.use('/public', express.static('public'));


db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', userRouter)
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))


//Upload Endpoint
//app.use(fileUpload());
// app.post('/upload', (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({
//       msg: 'No file uploaded'
//     });
//   }

//   const file = req.files.file;

//   file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     res.json({
//       fileName: file.name,
//       filePath: `/uploads/${file.name}`
//     });
//   });
// });

app.listen(5001, () => console.log('Server Started...'));
