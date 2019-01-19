const assert = require('chai').assert,
      config = require('../askkodiakrc.json'),
      askKodiak = require('../../index.js');

askKodiak.init(config.gid, config.key, config.url);

describe('Get Codes', function () {
  it('all', function (done) {
    askKodiak.getNaicsCodes().then(function (res) {
      var numCodes = Object.keys(res).length;

      assert.strictEqual(numCodes, 20060);
      done();
    });
  });
});
