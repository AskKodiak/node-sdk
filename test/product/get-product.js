const assert = require('chai').assert,
      config = require('../askkodiakrc.json'),
      askKodiak = require('../../index.js'),
      pid = config.pid;

askKodiak.init(config.gid, config.key, config.url);

describe('Get Product', function () {
  it('Returns expected object properties', function (done) {
    askKodiak.getProduct(pid, {}).then(function (res) {
      var ok = true,
          expected = [
            'name',
            'description',
            'coverageType',
            'ownerId',
            'meta',
            'ownerType'
          ],
          i;

      for (i = 0; i < expected.length; i++) {
        if (typeof res[expected[i]] === 'undefined') {
          ok = false;
        }
      }

      assert.equal(ok, true);
      done();
    });
  });
  it('Returns expected eligibility (default)', function (done) {
    askKodiak.getProduct(pid, {}).then(function (res) {
      assert.equal(typeof res.eligibility === 'undefined', true);
      done();
    });
  });
  it('Returns expected eligibility (include)', function (done) {
    askKodiak.getProduct(pid, {'includeEligibility': true}).then(function (res) {
      assert.equal(typeof res.eligibility === 'undefined', false);
      done();
    });
  });
});
