const assert = require('chai').assert,
      config = require('../askkodiakrc.json'),
      askKodiak = require('../../index.js');

askKodiak.init(config.gid, config.key, config.url);

describe('Get Group', function () {
  it('Sporting Goods Industry Group', function (done) {
    askKodiak.getNaicsGroup('4511', {}).then(function (res) {
      var expect = {
        'code': '4511',
        'codes': [
          '4c2ad310d1d655cc6265500a93613ed9',
          '70d1aea9e69400149d95da04d9d66347',
          'f57026d3895e1798098d6f10fa8d881f',
          'a7881cb8a973ad5243290a6538e57d6f',
          '0671194714069c88e1b98c7f1ac072c7',
          '7ab15ccfbf5c51d70ec3e809c996be34',
          '5dff2ecc8c11e69dadc43aa1faa8901b',
          '7d539ee99800657e5890aa81b6d832d8',
          '62ffe71a9211877aeec72fd1f6ffeb29',
          'a3c813a253232fc92c00521fe5cb7b3b',
          '63081ea9545a57702ef822874ca06021',
          'cb4cf89c99a8a50eacaedf843b8e9afa',
          'bfae33b87289643050e71864563eb101',
          '67125ad3f6b323833a2f17c99fa04436',
          '0f6c28cb12e13f2ad8716b3e02bd2a8d',
          'e5553f2d9ab4d2b509aa13f81c846b42',
          '446fe0982b9ee19aa31750ca4267bea5',
          '53d442b563857e54eeea2cdb64eeffb1',
          '9497b9739b496a0c8cf21e6946b9d3a7',
          '8d59d569c18808babb4065a4d70d1902',
          '15a2271aa4a8a2109aabc2361184efe8',
          '8ae50ab022c08221b5fb6597a90bdadc',
          '1d73c57d045fe704dbc4f8ae4157760b',
          '1873ca16a0dc396548647f4b9efb3843',
          '6ca5077180c0aac9ba4ace1019d5bb0a',
          'b4ec57cb85eece5918304837f203d7ff',
          'fa221469f99b898078e2e33274415323',
          'e6be0061bd59597d13c35bf3f084a764',
          '60641af86ee45879d7ab1b76c55f39ca',
          '15d7dece791e74a081abbb76d997daef',
          'cf80503d0f3a683c30bb4b26841e4f0b',
          '2d24db7faf562ce36607c6a0aef1d19f',
          '6ca6a8acd3a36c5975eafd38bfde7f2c'
        ],
        'decendants': [
          '45111',
          '45112',
          '45113',
          '45114'
        ],
        'parent': '451',
        'seq': '1199',
        'title': 'Sporting Goods, Hobby, and Musical Instrument Stores',
        'type': 'industry-group'
      };

      assert.deepEqual(res, expect);
      done();
    });
  });
});
