/*
 *  core dbconnect.js
 *  package: /core/config
 *  Use:
 *     Exporta una instancia de la conexion a la base de datos
 */

/**
 * Database connection
 */
/**
 * Load module dependencies
 */
var mongoose = require('mongoose');
var debug = require('debug')('develar:server');

var db;
// Connect to MongoDB database

module.exports = function(settings){
  mongoose.connect(settings.dbase);
  db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.on('open', function(){
    debug('MongoDB: connected OK');
  });

  return mongoose;
};
