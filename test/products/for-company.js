const assert = require('chai').assert,
      config = require('../askkodiakrc.json'),
      askKodiak = require('../../index.js'),
      gid = config.gid;

askKodiak.init(config.gid, config.key, config.url);

describe('Products For Company', function () {
  it('Returns expected object properties', function (done) {
    askKodiak.productsForCompany(gid, {}).then(function (res) {
      var ok = true,
          expected = [
            'gid',
            'name',
            'products',
            'count',
            'productsPerPage',
            'page',
            'pages',
            'summaryOnly',
            'includeEligibility',
            'filters'],
          i;

      for (i = 0; i < expected.length; i++) {
        if (typeof res[expected[i]] === 'undefined') {
          ok = false;
        }
      }

      assert.equal(ok, true);
      done();
    });
  });
  it('Returns products', function (done) {
    askKodiak.productsForCompany(gid, {}).then(function (res) {
      assert.equal(res.products.length > 0, true);
      done();
    });
  });
  it('Returns expected eligibility (default)', function (done) {
    askKodiak.productsForCompany(gid, {}).then(function (res) {
      assert.equal(res.includeEligibility, false);
      done();
    });
  });
  it('Returns expected eligibility (include)', function (done) {
    askKodiak.productsForCompany(gid, {'includeEligibility': true}).then(function (res) {
      assert.equal(res.includeEligibility, true);
      done();
    });
  });
  it('Returns summary only results', function (done) {
    askKodiak.productsForCompany(gid, {'summaryOnly': true}).then(function (res) {
      var ok = true,
          actualProps,
          expectedProps = ['id', 'name', 'ownerId'],
          products = res.products,
          i,
          ix;

      for (i = 0; i < products.length; i++) {
        actualProps = Object.keys(products[i]);
        for (ix = 0; ix < actualProps.length; ix++) {
          if (expectedProps.indexOf(actualProps[ix]) === -1) {
            ok = false;
          }
        }
      }

      assert.equal(ok, true);
      done();
    });
  });
  it('Returns expected filters (unfiltered)', function (done) {
    askKodiak.productsForCompany(gid, {}).then(function (res) {
      // no filters should be applied, thusly no keys on that object
      assert.equal(Object.keys(res.filters).length, 0);
      done();
    });
  });
  it('Returns expected filters (naics group)', function (done) {
    askKodiak.productsForCompany(gid, {'naicsGroups': '44-45'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.naicsGroups.length, 1);
      done();
    });
  });
  it('Returns expected filters (naics groups)', function (done) {
    askKodiak.productsForCompany(gid, {'naicsGroups': '44-45+722515'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.naicsGroups.length === 2, true);
      done();
    });
  });
  it('Returns expected filters (naics code)', function (done) {
    askKodiak.productsForCompany(gid, {'naicsCodes': '9d709a5f8cefe02c3ba71bdd3a4c3e28'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.naicsCodes.indexOf('9d709a5f8cefe02c3ba71bdd3a4c3e28'), 0);
      done();
    });
  });
  it('Returns expected filters (naics codes)', function (done) {
    askKodiak.productsForCompany(gid, {'naicsCodes': '9d709a5f8cefe02c3ba71bdd3a4c3e28+4797cab0bb586ec0a98da773878ef97d'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.naicsCodes.length === 2, true);
      done();
    });
  });
  it('Returns expected filters (owner)', function (done) {
    askKodiak.productsForCompany(gid, {'owners': 'ABC123'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.owners.length, 1);
      done();
    });
  });
  it('Returns expected filters (owners)', function (done) {
    askKodiak.productsForCompany(gid, {'owners': 'ABC123+DEF456'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.owners.length > 1, true);
      done();
    });
  });
  it('Returns expected filters (geo)', function (done) {
    askKodiak.productsForCompany(gid, {'geos': 'CA-ON'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.geos.length, 1);
      done();
    });
  });
  it('Returns expected filters (geos)', function (done) {
    askKodiak.productsForCompany(gid, {'geos': 'US-MA+CA-BC'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.geos.length, 2);
      done();
    });
  });
  it('Returns expected filters (geos with invalid val)', function (done) {
    askKodiak.productsForCompany(gid, {'geos': 'US-MA+CA-BC+TACO'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.geos.length, 2);
      done();
    });
  });
  it('Returns expected filters (coverage)', function (done) {
    askKodiak.productsForCompany(gid, {'productCodes': 'BOP'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.coverages.length, 1);
      done();
    });
  });
  it('Returns expected filters (coverages)', function (done) {
    askKodiak.productsForCompany(gid, {'productCodes': 'BOP+WORK'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.coverages.length, 2);
      done();
    });
  });
  it('Returns expected filters (entity type)', function (done) {
    askKodiak.productsForCompany(gid, {'entityTypes': 'AS'}).then(function (res) {
      var filters = res.filters;
      assert.equal((filters.entityTypes.length === 1 && filters.entityTypes.indexOf('AS') !== -1), true);
      done();
    });
  });
  it('Returns expected filters (entity types)', function (done) {
    askKodiak.productsForCompany(gid, {'entityTypes': 'AS+CCORP'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.entityTypes.length, 2);
      done();
    });
  });
  it('Returns expected filters (tag)', function (done) {
    askKodiak.productsForCompany(gid, {'tags': 'external-website'}).then(function (res) {
      var filters = res.filters;
      assert.equal((filters.tags.length === 1 && filters.tags.indexOf('external-website') !== -1), true);
      done();
    });
  });
  it('Returns expected filters (tags)', function (done) {
    askKodiak.productsForCompany(gid, {'tags': 'external-website+internal-portal'}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.tags.length, 2);
      done();
    });
  });
  it('Returns expected filters (annualPayroll)', function (done) {
    askKodiak.productsForCompany(gid, {'annualPayroll': 1000000}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.annualPayroll === 1000000, true);
      done();
    });
  });
  it('Returns expected filters (annualRevenue)', function (done) {
    askKodiak.productsForCompany(gid, {'annualRevenue': 5000000}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.annualRevenue === 5000000, true);
      done();
    });
  });
  it('Returns expected filters (fullTimeEmployees)', function (done) {
    askKodiak.productsForCompany(gid, {'fullTimeEmployees': 25}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.fullTimeEmployees === 25, true);
      done();
    });
  });
  it('Returns expected filters (partTimeEmployees)', function (done) {
    askKodiak.productsForCompany(gid, {'partTimeEmployees': 10}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.partTimeEmployees === 10, true);
      done();
    });
  });
  it('Returns expected filters (yearsInBusiness)', function (done) {
    askKodiak.productsForCompany(gid, {'yearsInBusiness': 5}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.yearsInBusiness === 5, true);
      done();
    });
  });
  it('Returns expected filters (yearsInIndustry)', function (done) {
    askKodiak.productsForCompany(gid, {'yearsInIndustry': 1}).then(function (res) {
      var filters = res.filters;
      assert.equal(filters.yearsInIndustry === 1, true);
      done();
    });
  });
  it('Returns expected products per page (default)', function (done) {
    askKodiak.productsForCompany(gid, {}).then(function (res) {
      assert.equal((res.productsPerPage === res.count), true);
      done();
    });
  });
  it('Returns expected products per page (2)', function (done) {
    askKodiak.productsForCompany(gid, {'productsPerPage': 2}).then(function (res) {
      assert.equal((res.productsPerPage === 2), true);
      done();
    });
  });
  it('Returns expected page (default)', function (done) {
    askKodiak.productsForCompany(gid, {}).then(function (res) {
      assert.equal((res.page === 0), true);
      done();
    });
  });
  it('Returns expected page (p2)', function (done) {
    askKodiak.productsForCompany(gid, {'productsPerPage': 1, 'page': 2}).then(function (res) {
      assert.equal((res.page === 2), true);
      done();
    });
  });
});
