var User = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = function (req, res) {
    // Create a User
    const user = new User({
        name: req.body.name ,
        email: req.body.email,
        mobile:req.body.mobile,
        age:req.body.age,
        password:bcrypt.hashSync(req.body.password, 10),

    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the user."
        });
    });
};

//get single user by _id
exports.getUser= function (req, res) {
    User.findById(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving user with id " + req.params.id
        });
    });
};

//update user
exports.updateUser = function (req, res) {
    // Find and update user with the request body
    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        age: req.body.age,
        mobile: req.body.mobile,
        email: req.body.email,
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.id
        });
    });
};

//get all users
exports.getAllUsers = function (req, res) {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving users."
        });
    });
};

// deleting a user
exports.deleteUser = function (req, res) {
    User.findByIdAndRemove(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.id
        });
    });
};