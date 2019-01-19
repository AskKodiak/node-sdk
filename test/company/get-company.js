const assert = require('chai').assert,
      config = require('../askkodiakrc.json'),
      askKodiak = require('../../index.js'),
      gid = config.gid;

askKodiak.init(config.gid, config.key, config.url);

describe('Get Company', function () {
  it('Has expected properties', function (done) {
    askKodiak.getCompany(gid, {}).then(function (res) {
      var keys = [
        'id',
        'description',
        'location',
        'logo',
        'name',
        'website',
        'isCarrier'
      ];
      assert.containsAllKeys(res, keys);
      done();
    });
  });
});
