var User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.register = function (req, res, next) {

    var user = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            mobile:req.body.mobile,
            age:req.body.age,
        }
    );
    if (user.password) {
        user.password = bcrypt.hashSync(user.password, 10);
    }

    user.save()
    .then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the user."
        });
    });
};

exports.login = function (req, res, next) {
    User.findOne({email:req.body.email}, function(err, user){
        if (err) {
            next(err);
        } 
        if(!user) {
            res.json({status:"error", message: "user not found!", data:null});
        }
        else {
            console.log(user.password);
            if(bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({id: user._id}, 'mindfire', { expiresIn: '1h' });
                res.json({status:"success", message: "user found!!!", data:{user: user, token:token}});
            } else {
                res.json({status:"error", message: "Invalid email/password!!!", data:null});
            }
        }
    });
};



