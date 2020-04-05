//import app from './src/component/app'

const express = require('express')
const UserCtrl = require('../controllers/user-ctrl')
const router = express.Router()

//const upload = multer({dest: 'uploads/'});
const mongoose = require('mongoose')




router.post('/user', UserCtrl.createUsers)
router.post('/login', UserCtrl.login)
router.post('/validateUsername', UserCtrl.validateUsername)
router.put('/user/:id', UserCtrl.updateUser)
router.delete('/user/:id', UserCtrl.deleteUser)
router.get('/user/:id', UserCtrl.getUserById)
router.get('/users', UserCtrl.getUsers)
//router.post('/uploadImage', UserCtrl.uploadImage)
module.exports = router

