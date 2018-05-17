'use strict';
var tokenVerify  = require('./lib/jwt');
var logger = require('./lib/logger');
var parser = require('./lib/parser');
var config = require('./lib/config');
var mailer = require('./lib/mailer');

module.exports = {
  token: tokenVerify,
  logger: logger,
  parser: parser,
  config: config,
  mailer: mailer,
};