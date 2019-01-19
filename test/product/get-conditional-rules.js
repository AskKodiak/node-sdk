const assert = require('chai').assert,
      config = require('../askkodiakrc.json'),
      askKodiak = require('../../index.js'),
      pid = config.pid;

askKodiak.init(config.gid, config.key, config.url);

describe('Get Conditional Rules', function () {
  it('Returns Rules', function (done) {
    askKodiak.getConditionalRules(pid, {}).then(function (res) {
      assert.equal(Object.keys(res).length > 0, true);
      done();
    });
  });
  it('Rules are well formed', function (done) {
    askKodiak.getConditionalRules(pid, {}).then(function (res) {
      var rids = Object.keys(res),
          rule,
          i,
          ok = true;

      for (i = 0; i < rids.length; i++) {
        rule = res[rids[i]];
        if (!rule.when) {
          ok = false;
        }
        if (!(rule.include || rule.exclude)) {
          ok = false;
        }
      }
      assert.equal(ok, true);
      done();
    });
  });
});
