let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  uuidv4 = require('uuid/v4'),
  fs = require('fs');

const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + ext)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

// Image model
let Image = require('../models/images');

uploadImage = ( (req, res, next) => {
  upload.single('profileImg')(req, res, function (error) {
    if (error) {
      console.log(`upload.single error: ${error}`);
      console.log(req.file.filename);
      return res.sendStatus(500);
    }
    const url = req.protocol + '://' + req.get('host')

    const image = new Image({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      profileImg: url + '/public/' + req.file.filename,
      imgData: fs.readFileSync(DIR + req.file.filename)
    });
    image.save().then(result => {
      res.status(200).json({
        success: true,
        data: {
          _id: result._id,
          profileImg: result.profileImg,
          imgData: result.imgData,
        }
      })
    }).catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    })
    // code
  })
});
//New
getImages = async (req, res) => {
  await Image.find({}, (err, images) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err
      })
    }
    if (!images.length) {
      return res
        .status(404)
        .json({
          success: false,
          error: 'Images not found',
          data:'',
        })
    }
    return res.status(200).json({
      success: true,
      data: images
    })
  }).catch(err => console.log(err))
}


//previous
getImages1 = async (req, res) => {
  await Images.find({}, (err, images) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err
      })
    }
    if (!images.length) {
      return res
        .status(404)
        .json({
          success: false,
          error: `Images not found`
        })
    }
    return res.status(200).json({
      success: true,
      data: images
    })
  }).catch(err => console.log(err))
}
module.exports = {
  uploadImage,
  getImages,
}






