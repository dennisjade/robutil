'use strict';

var expect = require('chai').expect;
var util = require('../index');


describe('#jwt-util', function() {
  it('should return false', function() {
    var headers = {
      authorization: 'Bearer 123'
    };
    var result = util.token.verify(headers);
    expect(result).to.be.false;
  });

  it('should return true', function() {
    var headers = {
      authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOiJyc2giLCJlbnYiOiJzdGFnaW5nIiwidXVpZCI6IjRmODgyYzdlLWE2NGMtNGQzYS1iNjQxLTM2NmE3ZGM4ODFlZSJ9.NBS2CQGdoF0iCQapDGWc5R2Vtk0bWLHMllDunbZU0DM'
    };
    var result = util.token.verify(headers);
    expect(result).to.be.true;
  });
});