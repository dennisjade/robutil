'use strict';
var tokenVerify  = require('./lib/jwt');
var fileSystem = require('./lib/filesystem');
var loggerSystem = require('./lib/logger');

module.exports = {
  token: tokenVerify,
  file: fileSystem,
  log: loggerSystem
};