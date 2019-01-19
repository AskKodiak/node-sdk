const assert = require('chai').assert,
      config = require('../askkodiakrc.json'),
      askKodiak = require('../../index.js');

askKodiak.init(config.gid, config.key, config.url);

describe('Get Path', function () {
  it('as array', function (done) {
    askKodiak.getNaicsPath('451110', {}).then(function (res) {
      var expect = {
        'path': [
          '44-45',
          '451',
          '4511',
          '45111',
          '451110'
        ]
      };

      assert.deepEqual(res, expect);
      done();
    });
  });
  it('as object', function (done) {
    askKodiak.getNaicsPath('451110', {asObject: true}).then(function (res) {
      var expect = {
        'sector': '44-45',
        'subsector': '451',
        'industryGroup': '4511',
        'internationalIndustry': '45111',
        'nationalIndustry': '451110'
      };

      assert.deepEqual(res, expect);
      done();
    });
  });
});
