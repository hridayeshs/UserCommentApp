const Users = require('../models/users')
const bcrypt = require('bcryptjs');

createUsers = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Users',
        })
    }

    const user = new Users(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(reg => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.status(400).send("Failed to store to database");
        });
}

updateUser = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Users.findOne({ id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Users not found!',
            })
        }
        user.Name = body.Name
        user.Password = body.Password
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user.id,
                    message: 'user updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'user not updated!',
                })
            })
    })
}

deleteUser = async (req, res) => {
    await Users.findOneAndDelete({ id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `user not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUserById = async (req, res) => {
    await Users.findOne({ id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUsers = async (req, res) => {
    await Users.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `Users not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}
// validate user login
login = async (req, res) => {
    await Users.findOne({
        user_name: req.body.user_name
    }, (err, user) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        console.log("User from login", user)
        if (!user) res.sendStatus(204);
        else {
            bcrypt.compare(req.body.password, user.password)
                .then(passwordMatch => passwordMatch ? res.sendStatus(200) : res.sendStatus(204))
        }
    }).catch(err => console.log(err))
}

validateUsername = async (req, res) => {
    await Users.findOne({
        user_name: req.body.user_name
    }, (err, user) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        if (!user) res.sendStatus(200);
        else {
            res.sendStatus(204)
        }
    }).catch(err => console.log(err))
}


module.exports = {
    createUsers,
    updateUser,
    deleteUser,
    getUsers,
    getUserById,
    login,
    validateUsername,
}
