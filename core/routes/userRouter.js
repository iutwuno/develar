//--------------------------------------------------------------------
// <copyright file="userRouter.js" company="CEPAN">
//     Copyright (c) CEPAN. All rights reserved.
// </copyright>
// <author>Sol Landa - Leonardo Diaz Longhi - Agustin Cassani</author>
//--------------------------------------------------------------------
/**
 * User router
 */
/**
 * Load module dependencies
 */
var express = require('express');
var router = express.Router();

var service = require('../models/userModel.js');
//var jwt = require('jsonwebtoken');
//var settings = require('../config/settings.js');

/**
 * Retrieve all usuarios
 */
router.get('/', function (req, res) {
    service.findAll(function(err) {
        res.status(400).json(err);

    }, function(entities) {
        res.status(200).json(entities);

    });
});

/**
 * Retrieve selected user
 */
router.post('/login', function (req, res) {
    service.login(req.body, function(err) {
        res.status(400).json(err);

    }, function(entity) {
        res.status(200).json(entity);

    });
});


/**
 * Sign up a new user
 */
router.post('/signup', function (req, res) {
    service.signup(req.body, function(err) {
        res.status(400).json(err);

    }, function(entity) {
        res.status(201).json(entity);

    });
});

/**
 * Testing: alta trucha de un user
 */
router.get('/populate', function (req, res) {
    service.populate(function(err) {
        res.status(400).json(err);

    }, function(entity) {
        res.status(201).json(entity);

    });
});

module.exports = router;