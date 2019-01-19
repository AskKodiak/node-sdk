const assert = require('chai').assert,
      config = require('../askkodiakrc.json'),
      askKodiak = require('../../index.js');

askKodiak.init(config.gid, config.key, config.url);

describe('Business Entity Types', function () {
  it('all', function (done) {
    askKodiak.getRefDataEntityTypes().then(function (res) {
      var keys = ['AS', 'CA', 'CC', 'CCORP', 'CD', 'CE', 'CH', 'CL', 'CO', 'CP', 'CW', 'CY', 'ES', 'FARM', 'GE', 'GP', 'IN', 'IT', 'JV', 'LC', 'LL', 'LP', 'LU', 'MU', 'NP', 'OT', 'PR', 'PT', 'SB', 'SC', 'SCORP', 'SOLEPRP', 'SS', 'TN', 'TR', 'UA'];

      assert.containsAllKeys(res, keys);
      done();
    });
  });
});
