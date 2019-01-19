const assert = require('chai').assert,
      config = require('../askkodiakrc.json'),
      askKodiak = require('../../index.js');

askKodiak.init(config.gid, config.key, config.url);

describe('Track', function () {
  it('event', function (done) {
    askKodiak.trackEvent('test event', {foo: true, bar: false}).then(function (res) {
      assert.equal(res.created, true);
      done();
    });
  });
});
