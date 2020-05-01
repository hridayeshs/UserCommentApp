const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  profileImg: {
    type: String
  },
  imgData: Buffer,
}, {
  collection: 'images'
  }
);
module.exports = mongoose.model('images', imagesSchema)
//imagesSchema.plugin(autoIncrement.plugin, { model: 'images', field: 'id',startAt: 1,incrementBy: 1 });
