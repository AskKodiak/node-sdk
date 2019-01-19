const assert = require('chai').assert,
      config = require('../askkodiakrc.json'),
      askKodiak = require('../../index.js');
      
askKodiak.init(config.gid, config.key, config.url);

describe('Geographies', function () {
  it('all', function (done) {
    askKodiak.getRefDataGeos().then(function (res) {
      var keys = ['CA-AB', 'CA-BC', 'CA-MB', 'CA-NB', 'CA-NL', 'CA-NS', 'CA-NT', 'CA-NU', 'CA-ON', 'CA-PE', 'CA-QC', 'CA-SK', 'CA-YT', 'US-AK', 'US-AL', 'US-AR', 'US-AS', 'US-AZ', 'US-CA', 'US-CO', 'US-CT', 'US-DC', 'US-DE', 'US-FL', 'US-GA', 'US-GU', 'US-HI', 'US-IA', 'US-ID', 'US-IL', 'US-IN', 'US-KS', 'US-KY', 'US-LA', 'US-MA', 'US-MD', 'US-ME', 'US-MI', 'US-MN', 'US-MO', 'US-MP', 'US-MS', 'US-MT', 'US-NC', 'US-ND', 'US-NE', 'US-NH', 'US-NJ', 'US-NM', 'US-NV', 'US-NY', 'US-OH', 'US-OK', 'US-OR', 'US-PA', 'US-PR', 'US-RI', 'US-SC', 'US-SD', 'US-TN', 'US-TX', 'US-UT', 'US-VA', 'US-VI', 'US-VT', 'US-WA', 'US-WI', 'US-WV', 'US-WY'];

      assert.containsAllKeys(res, keys);
      done();
    });
  });
  it('united states', function (done) {
    askKodiak.getRefDataGeos({countries: 'us'}).then(function (res) {
      var keys = ['US-AK', 'US-AL', 'US-AR', 'US-AS', 'US-AZ', 'US-CA', 'US-CO', 'US-CT', 'US-DC', 'US-DE', 'US-FL', 'US-GA', 'US-GU', 'US-HI', 'US-IA', 'US-ID', 'US-IL', 'US-IN', 'US-KS', 'US-KY', 'US-LA', 'US-MA', 'US-MD', 'US-ME', 'US-MI', 'US-MN', 'US-MO', 'US-MP', 'US-MS', 'US-MT', 'US-NC', 'US-ND', 'US-NE', 'US-NH', 'US-NJ', 'US-NM', 'US-NV', 'US-NY', 'US-OH', 'US-OK', 'US-OR', 'US-PA', 'US-PR', 'US-RI', 'US-SC', 'US-SD', 'US-TN', 'US-TX', 'US-UT', 'US-VA', 'US-VI', 'US-VT', 'US-WA', 'US-WI', 'US-WV', 'US-WY'];

      assert.containsAllKeys(res, keys);
      done();
    });
  });
  it('united states, states only', function (done) {
    askKodiak.getRefDataGeos({countries: 'us', subdivisionTypes: 'state'}).then(function (res) {
      var keys = ['US-AK', 'US-AL', 'US-AR', 'US-AZ', 'US-CA', 'US-CO', 'US-CT', 'US-DE', 'US-FL', 'US-GA', 'US-HI', 'US-IA', 'US-ID', 'US-IL', 'US-IN', 'US-KS', 'US-KY', 'US-LA', 'US-MA', 'US-MD', 'US-ME', 'US-MI', 'US-MN', 'US-MO', 'US-MS', 'US-MT', 'US-NC', 'US-ND', 'US-NE', 'US-NH', 'US-NJ', 'US-NM', 'US-NV', 'US-NY', 'US-OH', 'US-OK', 'US-OR', 'US-PA', 'US-RI', 'US-SC', 'US-SD', 'US-TN', 'US-TX', 'US-UT', 'US-VA', 'US-VT', 'US-WA', 'US-WI', 'US-WV', 'US-WY'];

      assert.containsAllKeys(res, keys);
      done();
    });
  });
  it('canada', function (done) {
    askKodiak.getRefDataGeos({countries: 'ca'}).then(function (res) {
      var keys = ['CA-AB', 'CA-BC', 'CA-MB', 'CA-NB', 'CA-NL', 'CA-NS', 'CA-NT', 'CA-NU', 'CA-ON', 'CA-PE', 'CA-QC', 'CA-SK', 'CA-YT'];

      assert.containsAllKeys(res, keys);
      done();
    });
  });
  it('canada, provinces', function (done) {
    askKodiak.getRefDataGeos({countries: 'ca', subdivisionTypes: 'province'}).then(function (res) {
      var keys = ['CA-AB', 'CA-BC', 'CA-MB', 'CA-NB', 'CA-NL', 'CA-NS', 'CA-ON', 'CA-PE', 'CA-QC', 'CA-SK'];

      assert.containsAllKeys(res, keys);
      done();
    });
  });
});
