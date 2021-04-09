const assert = require('chai').assert,
      { post } = require('../index');

describe('Post', function () {
  describe('Products', function () {
    describe('By Company', function () {
      const basePath = 'products/by-company';

      describe('No Parameters', async () => {
        var res,
            body = {};

        before(async () => {
          res = await post(basePath, body);

        });

        it('has companies', () => {
          assert.isNotEmpty(res.companies);
        });
      });

      describe('Paginated, Product Groupings, Single Geo Filter', async () => {
        var res,
            body = {
              productGroupings: [{
                name: 'Commercial Lines',
                governingCode: 'BOP',
                productCodes: [
                  'AUTOB', 'BANDM', 'BOP', 'CRIME', 'CRIM', 'CYBER', 'EQPFL', 'CFRM', 'SFRNC', 'CGL', 'GL', 'INMRC', 'INMAR', 'COMR', 'OPCAR', 'CPKGE', 'SCAP', 'PL', 'PROPC', 'SURE', 'UMBRC', 'WORK'
                ]
              }]
            };

        before(async () => {
          res = await post(basePath, body, {geos: 'US-VA', companiesPerPage: 3});
        });

        it('has companies', () => {
          assert.isNotEmpty(res.companies);
        });

        it('applied geo filter ', () => {
          const filters = res.filters || {},
                geos = filters.geos;

          assert.include(geos, 'US-VA');
        });

        it('paginated', () => {
          assert.equal(res.companiesPerPage, 3);
        });

        it('applied product groupings in post body', () => {
          assert.equal(res.productGroupingsSource, 'request');
        });
      });

      describe('Paginated, Product Groupings, Multiple Geo Filters', async () => {
        var res,
            body = {
              productGroupings: [{
                name: 'Commercial Lines',
                governingCode: 'BOP',
                productCodes: [
                  'AUTOB', 'BANDM', 'BOP', 'CRIME', 'CRIM', 'CYBER', 'EQPFL', 'CFRM', 'SFRNC', 'CGL', 'GL', 'INMRC', 'INMAR', 'COMR', 'OPCAR', 'CPKGE', 'SCAP', 'PL', 'PROPC', 'SURE', 'UMBRC', 'WORK'
                ]
              }]
            };

        before(async () => {
          res = await post(basePath, body, {geos: ['US-VA', 'US-MD'], companiesPerPage: 3});
        });

        it('has companies', () => {
          assert.isNotEmpty(res.companies);
        });

        it('applied geo filter ', () => {
          const filters = res.filters || {},
                geos = filters.geos;

          assert.include(geos, 'US-VA');
          assert.include(geos, 'US-MD');
        });

        it('paginated', () => {
          assert.equal(res.companiesPerPage, 3);
        });

        it('applied product groupings in post body', () => {
          assert.equal(res.productGroupingsSource, 'request');
        });
      });

      describe('Paginated, Product Groupings, Multiple Geo Filters, Annual Revenue Filter', async () => {
        var res,
            body = {
              productGroupings: [{
                name: 'Commercial Lines',
                governingCode: 'BOP',
                productCodes: [
                  'AUTOB', 'BANDM', 'BOP', 'CRIME', 'CRIM', 'CYBER', 'EQPFL', 'CFRM', 'SFRNC', 'CGL', 'GL', 'INMRC', 'INMAR', 'COMR', 'OPCAR', 'CPKGE', 'SCAP', 'PL', 'PROPC', 'SURE', 'UMBRC', 'WORK'
                ]
              }]
            };

        before(async () => {
          res = await post(basePath, body, {geos: ['US-VA', 'US-MD'], companiesPerPage: 3, annualRevenue: 1000000});
        });

        it('has companies', () => {
          assert.isNotEmpty(res.companies);
        });

        it('applied geo filter ', () => {
          const filters = res.filters || {},
                geos = filters.geos;

          assert.include(geos, 'US-VA');
          assert.include(geos, 'US-MD');
        });

        it('paginated', () => {
          assert.equal(res.companiesPerPage, 3);
        });

        it('applied annual revenue filter', () => {
          assert.equal(res.filters.annualRevenue, 1000000);
        });

        it('applied product groupings in post body', () => {
          assert.equal(res.productGroupingsSource, 'request');
        });
      });

    });

  });
});
