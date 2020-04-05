const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  profileImg: {
    type: String
  }
}, {
  collection: 'images'
})
//imagesSchema.plugin(autoIncrement.plugin, { model: 'images', field: 'id',startAt: 1,incrementBy: 1 });
module.exports = mongoose.model('Image', imagesSchema)
