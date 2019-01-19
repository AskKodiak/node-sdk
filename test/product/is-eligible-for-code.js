const assert = require('chai').assert,
      config = require('../askkodiakrc.json'),
      askKodiak = require('../../index.js'),
      pid = config.pid;

askKodiak.init(config.gid, config.key, config.url);

describe('Is Eligible For Code', function () {
  it('Returns expected object properties (group)', function (done) {
    askKodiak.isProductEligibleForNaics(pid, '44-45', {}).then(function (res) {
      var ok = true,
          expected = [
            'pid',
            'code',
            'isEligible',
            'percentOfCodesEligible'
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
  it('Returns expected object properties (hash)', function (done) {
    askKodiak.isProductEligibleForNaics(pid, 'f1d313b7662d93502f64964efcb7de86', {}).then(function (res) {
      var ok = true,
          expected = [
            'pid',
            'code',
            'isEligible',
            'percentOfCodesEligible'
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
});
