const assert = require('chai').assert,
      config = require('../askkodiakrc.json'),
      askKodiak = require('../../index.js'),
      pid = config.pid;

askKodiak.init(config.gid, config.key, config.url);

describe('Render Conditional Content', function () {
  var triggers = {
    geos: [],
    naicsGroups: [],
    naicsCodes: []
  };

  before(function (done) {
    askKodiak.getConditionalRules(pid).then(function (res) {
      var rids = Object.keys(res),
          rule,
          i;

      for (i = 0; i < rids.length; i++) {
        rule = res[rids[i]];
        if (rule.when) {
          if (rule.when['naics-codes']) {
            triggers.naicsCodes = triggers.naicsCodes.concat(rule.when['naics-codes']);
          }
          if (rule.when['naics-groups']) {
            triggers.naicsGroups = triggers.naicsGroups.concat(rule.when['naics-groups']);
          }
          if (rule.when.geos) {
            triggers.geos = triggers.geos.concat(rule.when.geos);
          }
        }
      }
      done();
    });
  });
  it('Has NAICS code triggers', function () {
    //'The selected product does not have naics code triggers. Consider adding them or choosing a different product for testing.'
    assert.isAtLeast(triggers.naicsCodes.length, 1);
  });
  it('Has NAICS group triggers', function () {
    //'The selected product does not have naics group triggers. Consider adding them or choosing a different product for testing.'
    assert.isAtLeast(triggers.naicsGroups.length, 1);
  });
  it('Has geo triggers', function () {
    //'The selected product does not have geos triggers. Consider adding them or choosing a different product for testing.'
    assert.isAtLeast(triggers.geos.length, 1);
  });
  it('Render NAICS codes conditions', function (done) {
    var naicsCodes = '',
        i;

    for (i = 0; i < triggers.naicsCodes.length; i++) {
      naicsCodes += '+' + triggers.naicsCodes[i];
    }

    askKodiak.renderConditionalContent(pid, {naicsCodes: naicsCodes}).then(function (res) {
      var content = res['naics-codes'];

      assert.hasAllKeys(content, triggers.naicsCodes);
      done();
    });
  });
  it('Render NAICS groups conditions', function (done) {
    var naicsGroups = '',
        i;

    for (i = 0; i < triggers.naicsGroups.length; i++) {
      naicsGroups += '+' + triggers.naicsGroups[i];
    }

    askKodiak.renderConditionalContent(pid, {naicsGroups: naicsGroups}).then(function (res) {
      var content = res['naics-groups'];

      assert.hasAllKeys(content, triggers.naicsGroups);
      done();
    });
  });
  it('Render geos conditions', function (done) {
    var geos = '',
        i;

    for (i = 0; i < triggers.geos.length; i++) {
      geos += '+' + triggers.geos[i];
    }

    askKodiak.renderConditionalContent(pid, {geos: geos}).then(function (res) {
      var content = res.geos;

      assert.hasAllKeys(content, triggers.geos);
      done();
    });
  });
});

