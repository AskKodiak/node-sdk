const assert = require('chai').assert,
      config = require('../askkodiakrc.json'),
      askKodiak = require('../../index.js');

askKodiak.init(config.gid, config.key, config.url);

describe('Referrals', function () {
  var referralId,
      referralVal;

  it('all', function (done) {
    askKodiak.getReferrals().then(function (res) {
      var rids = Object.keys(res),
          numReferrals = rids.length;

      referralId = rids[0];
      referralVal = res[referralId];

      assert.isAtLeast(numReferrals, 1);
      done();
    });
  });
  it('by id', function (done) {
    askKodiak.getReferral(referralId, {}).then(function (res) {

      assert.deepEqual(res, referralVal);
      done();
    });
  });
});
