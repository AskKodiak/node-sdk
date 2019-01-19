const assert = require('chai').assert,
      config = require('../askkodiakrc.json'),
      askKodiak = require('../../index.js');

askKodiak.init(config.gid, config.key, config.url);

describe('Suggest NAICS Codes', function () {
  it('Has expected properties', function (done) {
    askKodiak.suggestNaicsCodes('restaurant', {}).then(function (res) {
      var keys = [
        'hits',
        'nbHits',
        'page',
        'nbPages',
        'hitsPerPage',
        'processingTimeMS',
        'exhaustiveNbHits',
        'query'
      ];
      assert.hasAllKeys(res, keys);
      done();
    });
  });
  it('Is expected page (default)', function (done) {
    askKodiak.suggestNaicsCodes('res', {}).then(function (res) {
      assert.equal(res.page, 0);
      done();
    });
  });
  it('Is expected page (2)', function (done) {
    askKodiak.suggestNaicsCodes('res', {'page': 2}).then(function (res) {
      assert.equal(res.page, 2);
      done();
    });
  });
  it('Has expected hits per page (default)', function (done) {
    askKodiak.suggestNaicsCodes('res', {}).then(function (res) {
      assert.equal(res.hitsPerPage, 20);
      done();
    });
  });
  it('Has expected hits per page (5)', function (done) {
    askKodiak.suggestNaicsCodes('res', {hitsPerPage: 5}).then(function (res) {
      assert.equal(res.hitsPerPage, 5);
      done();
    });
  });
});
