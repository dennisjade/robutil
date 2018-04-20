'use strict';

var expect = require('chai').expect;
var util = require('../index');


describe('#logger-util', function() {
  it('should return true as valid call to info method', function() {
    expect(util.logger.log.info).to.not.be.undefined;
  });

  it('should return true as valid call to warn', function() {
    expect(util.logger.log.warn).to.not.be.undefined;
  });

  it('should return true as valid call to error', function() {
    expect(util.logger.log.error).to.not.be.undefined;
  });
});