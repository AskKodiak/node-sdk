const assert = require('chai').assert,
      { get } = require('../index');

describe('Get', function () {
  describe('Products', function () {
    describe('For User', function () {
      const basePath = 'products/user';

      describe('No Parameters', async () => {
        var res;

        before(async () => {
          res = await get(basePath);

        });

        it('has products', () => {
          assert.isNotEmpty(res.products);
        });
      });

      describe('Paginated, Single Geo Filter', async () => {
        var res;

        before(async () => {
          res = await get(basePath, {geos: 'US-VA', productsPerPage: 3});
        });

        it('has products', () => {
          assert.isNotEmpty(res.products);
        });

        it('applied geo filter ', () => {
          const filters = res.filters || {},
                geos = filters.geos;

          assert.include(geos, 'US-VA');
        });

        it('paginated', () => {
          assert.equal(res.productsPerPage, 3);
        });
      });

      describe('Paginated, Multiple Geo Filters', async () => {
        var res;

        before(async () => {
          res = await get(basePath, {geos: ['US-VA', 'US-MD'], productsPerPage: 3});
        });

        it('has products', () => {
          assert.isNotEmpty(res.products);
        });

        it('applied geo filter ', () => {
          const filters = res.filters || {},
                geos = filters.geos;

          assert.include(geos, 'US-VA');
          assert.include(geos, 'US-MD');
        });

        it('paginated', () => {
          assert.equal(res.productsPerPage, 3);
        });
      });

      describe('Paginated, Multiple Geo Filters, Annual Revenue Filter', async () => {
        var res;

        before(async () => {
          res = await get(basePath, {geos: ['US-VA', 'US-MD'], productsPerPage: 3, annualRevenue: 1000000});
        });

        it('has products', () => {
          assert.isNotEmpty(res.products);
        });

        it('applied geo filter ', () => {
          const filters = res.filters || {},
                geos = filters.geos;

          assert.include(geos, 'US-VA');
          assert.include(geos, 'US-MD');
        });

        it('paginated', () => {
          assert.equal(res.productsPerPage, 3);
        });

        it('applied annual revenue filter', () => {
          assert.equal(res.filters.annualRevenue, 1000000);
        });
      });

    });

  });
  describe('Ref Data', function () {
    describe('Business Entity Types', function () {
      const basePath = '/ref-data/business-entity-types';

      describe('No Parameters', async () => {
        var res;

        before(async () => {
          res = await get(basePath);

        });

        it('has at least association', () => {
          assert.hasAnyKeys(res, 'AS');
        });
      });

    });
    describe('Geos', function () {
      const basePath = '/ref-data/geos';

      describe('No Parameters', async () => {
        var res;

        before(async () => {
          res = await get(basePath);

        });

        it('gave response', () => {
          assert.exists(res);
        });
      });

      describe('US Only', async () => {
        var res;

        before(async () => {
          res = await get(basePath, {countries: 'US'});
        });

        it('are us ISO3166-2 codes', () => {
          var codes = Object.keys(res);

          codes.forEach(code => {
            assert.include(code, 'US-');
          });
        });
      });

    });

  });
});
