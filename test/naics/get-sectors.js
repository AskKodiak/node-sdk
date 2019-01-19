const assert = require('chai').assert,
      config = require('../askkodiakrc.json'),
      askKodiak = require('../../index.js');

askKodiak.init(config.gid, config.key, config.url);

describe('Get Sectors', function () {
  it('all', function (done) {
    askKodiak.getNaicsSectors().then(function (res) {
      var numSectors = Object.keys(res).length;

      assert.equal(numSectors, 20);
      done();
    });
  });
});
