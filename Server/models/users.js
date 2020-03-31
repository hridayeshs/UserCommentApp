const mongoose = require('mongoose')
const Schema = mongoose.Schema
autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://127.0.0.1:27017/userCommentDB");

autoIncrement.initialize(connection);

const Users = new Schema(
    {
		Id:{ type: Schema.Types.ObjectId},
        first_name: {
            type: String,
            match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
            required: [true, "can't be blank"],

        },
        last_name: {
            type: String,
            match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
            required: [true, "can't be blank"]
        },
        user_name: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
            index: true,
        },
        password: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true },
)
Users.plugin(autoIncrement.plugin, { model: 'login', field: 'id',startAt: 1,incrementBy: 1 });
module.exports = mongoose.model('login', Users)
