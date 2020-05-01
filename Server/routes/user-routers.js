const express = require('express')
const UserCtrl = require('../controllers/user-ctrl')
const ImageCtrl = require('../controllers/imagectrl')
const router = express.Router()
const mongoose = require('mongoose')
const path = require("path");
const multer = require("multer");


router.post('/user', UserCtrl.createUsers)
router.post('/login', UserCtrl.login)
router.post('/validateUsername', UserCtrl.validateUsername)
router.put('/user/:id', UserCtrl.updateUser)
router.delete('/user/:id', UserCtrl.deleteUser)
router.get('/user/:id', UserCtrl.getUserById)
router.get('/users', UserCtrl.getUsers)
router.post('/uploadImage', ImageCtrl.uploadImage)
router.get('/getImages', ImageCtrl.getImages)
module.exports = router
