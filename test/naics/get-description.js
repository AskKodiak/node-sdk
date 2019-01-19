const assert = require('chai').assert,
      config = require('../askkodiakrc.json'),
      askKodiak = require('../../index.js');

askKodiak.init(config.gid, config.key, config.url);

describe('Get Description', function () {
  it('sector 11', function (done) {
    askKodiak.getNaicsDescription('11', {}).then(function (res) {
      var desc = res.description,
          expect = 'The Agriculture, Forestry, Fishing and Hunting sector comprises establishments primarily engaged in growing crops, raising animals, harvesting timber, and harvesting fish and other animals from a farm, ranch, or their natural habitats.\n\nThe establishments in this sector are often described as farms, ranches, dairies, greenhouses, nurseries, orchards, or hatcheries.  A farm may consist of a single tract of land or a number of separate tracts which may be held under different tenures.  For example, one tract may be owned by the farm operator and another rented.  It may be operated by the operator alone or with the assistance of members of the household or hired employees, or it may be operated by a partnership, corporation, or other type of organization. When a landowner has one or more tenants, renters, croppers, or managers, the land operated by each is considered a farm.\n\nThe sector distinguishes two basic activities: agricultural production and agricultural support activities. Agricultural production includes establishments performing the complete farm or ranch operation, such as farm owner-operators and tenant farm operators.  Agricultural support activities include establishments that perform one or more activities associated with farm operation, such as soil preparation, planting, harvesting, and management, on a contract or fee basis.\n\nExcluded from the Agriculture, Forestry, Fishing and Hunting sector are establishments primarily engaged in agricultural research and establishments primarily engaged in administering programs for regulating and conserving land, mineral, wildlife, and forest use.  These establishments are classified in Industry 54171, Research and Development in the Physical, Engineering, and Life Sciences; and Industry 92412, Administration of Conservation Programs, respectively.';

      assert.deepEqual(desc, expect);
      done();
    });
  });
  it('national industry 721310', function (done) {
    askKodiak.getNaicsDescription('721310', {}).then(function (res) {
      var desc = res.description,
          expect = 'This industry comprises establishments primarily engaged in operating rooming and boarding houses and similar facilities, such as fraternity houses, sorority houses, off campus dormitories, residential clubs, and workers\' camps.  These establishments provide temporary or longer-term accommodations, which, for the period of occupancy, may serve as a principal residence.  These establishments also may provide complementary services, such as housekeeping, meals, and laundry services.\n\nIllustrative Examples:\nDormitories (off campus)\nWorkers\' camps\nSorority houses\nRooming houses\nFraternity houses';

      assert.deepEqual(desc, expect);
      done();
    });
  });
});
