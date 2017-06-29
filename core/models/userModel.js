//--------------------------------------------------------------------
// <copyright file="userModel.js" company="CEPAN">
//     Copyright (c) CEPAN. All rights reserved.
// </copyright>
// <author>Sol Landa - Leonardo Diaz Longhi - Agustin Cassani</author>
//--------------------------------------------------------------------
/**
 * User model
 */
/**
 * Load module dependencies
 */
var mongoose = require('mongoose');

/**
 * Creación de un Schema
 */
var userSch = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});





// Define user mongoose model
/**
 * El Modelo es el objeto constructor de instancias concretas
 * se obtiene a partir del Schema
 * @param String: nombre del Modelo
 * @param Schema: Schema a partir del cual crear el modelo
 * @param String: nombre a asignar a las colecciones de modelos (en plural)
 */
var User = mongoose.model('Usuario', userSch, 'usuarios');



/////////   CAPA DE SERVICIOS /////////////
/////////     API DEL USUARIO ///////////
/**
 * Retrieve all usuarios
 * @param cb
 * @param errcb
 */
exports.findAll = function (errcb, cb) {
    User.find(function(err, users) {
        if (err) {
            errcb(err);
        }else{
            cb(users);
        }
    });
};

/**
 * Sign in selected user
 * @param user
 * @param cb
 * @param errcb
 */
exports.login = function (user, errcb, cb) {
    User.findOne({email: user.email}, function(err, user) {
        if (err) {
            errcb(err);

        }else if(!user) {
            errcb({message: 'email o password incorrecto'});

        }else{
            cb(user);
        }
    });
};

/**
 * Sign up a new user
 * @param user
 * @param cb
 * @param errcb
 */
exports.signup = function (user, errcb, cb) {
    User.create(user, function(err, user) {
        if (err) {
            errcb(err);

        }else{
            cb(user);
        }
    });
};

/**
 * Sign up a new user
 * @param user
 * @param cb
 * @param errcb
 */
exports.populate = function (errcb, cb) {
    var user = {
        email:'pcasasco@gmail.com',
        password: '234566'
    }
    User.create(user, function(err, user) {
        if (err) {
            errcb(err);

        }else{
            cb(user);
        }
    });
};


//////




/**
userSch.pre('save', function (next) {
    var user = this;
    // Check if password has been changed
    if (!user.isModified('password')) {
        return next();
    }
    // Generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        // Hash the password with the created salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            // Save new encrypted password
            user.password = hash;
            next();
        });
    });
});
// Remove the password from the retrieved user
userSch.methods.toJSON = function () {
    var user = this.toObject();
    delete user.password;

    return user;
};
// Compare user passwords
userSch.methods.comparePasswords = function (password, cb) {
    bcrypt.compare(password, this.password, cb);
};

 */



