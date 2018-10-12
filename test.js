/* eslint-disable no-console */

/* All interfaces implemented below. Plug in keys and uncomment a few at a time to test. */

const AskKodiak = require('./index.js'),
      gid = '',
      key = '';

// init the SDK
AskKodiak.init(gid, key);

/*
AskKodiak.productsForCode('44-45').then(function (response) {
  console.log('all:', response.count);
}).catch(function (error) {
  console.error(error);
});

AskKodiak.productsForCode('44-45', {'annualRevenue':1000000}).then(function (response) {
  console.log('big:', response.count);
}).catch(function (error) {
  console.error(error);
});

AskKodiak.productsForCompany(gid).then(function (response) {
  console.log('all', response.products.length);
}).catch(function (error) {
  console.error(error);
});

AskKodiak.productsForCompany(gid, {'productCodes': 'BOP'}).then(function (response) {
  console.log('bop', response.products.length);
}).catch(function (error) {
  console.error(error);
});

AskKodiak.getProduct('-Kv9s36or1XZKVHvlYwx').then(function (product) {
  console.log(product.name);
}).catch(function (error) {
  console.error(error);
});

AskKodiak.getCompanies().then(function (companies) {
  console.log(companies);
}).catch(function (error) {
  console.error(error);
});

AskKodiak.getCompanyProfile('-L635HNnakPWk0QNHat-').then(function (company) {
  console.log(company.name)
}).catch(function (error) {
  console.error(error);
});

AskKodiak.getNaicsCode('0000dc045c872f122d694ef600c394df').then(function (code) {
  console.log(code);

}).catch(function (error) {
  console.error(error);
});

AskKodiak.getNaicsCodes().then(function (code) {
  console.log(code); //big wad-o-data
}).catch(function (error) {
  console.error(error);
});

AskKodiak.getNaicsDescription('811310').then(function (response) {
  console.log(response); //long form description from the class
}).catch(function (error) {
  console.error(error);
});

AskKodiak.getNaicsGroup('8113').then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

AskKodiak.getNaicsPath('488190').then(function (response) {
  console.log(response); //{ path: [ '48-49', '488', '4881', '48819', '488190' ] }
}).catch(function (error) {
  console.error(error);
});

// As Object...
AskKodiak.getNaicsPath('488190', {'asObject': true}).then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

AskKodiak.getNaicsSectors().then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

AskKodiak.getNaicsSummaryForGroupType('sector').then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

AskKodiak.getNaicsSummary().then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

// all products
AskKodiak.adminGetProducts().then(function (response) {
  console.log(response.products.length);
}).catch(function (error) {
  console.error(error);
});

// all products with eligibility in VA
AskKodiak.adminGetProducts({states: 'VA'}).then(function (response) {
  console.log(response.products.length);
}).catch(function (error) {
  console.error(error);
});

AskKodiak.trackEvent('inbound-referral', {'referer': 'https://www.google.com'}).then(function (response) {
  console.log(response); //{ created: true }
}).catch(function (error) {
  console.error(error);
});

AskKodiak.isProductEligibleForNaics('-Kv9s36or1XZKVHvlYwx', '44-45').then(function (response) {
  console.log(response); //{ isEligible: true, percentOfCodesEligible: 1 }
}).catch(function (error) {
  console.error(error);
});

AskKodiak.renderConditionalContent('-Kv9s36or1XZKVHvlYwx', { naicsGroups: '44-45', states: 'MA' }).then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

AskKodiak.getRefDataEntityTypes().then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

AskKodiak.getRefDataProductCodes().then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

AskKodiak.getRefDataStates().then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});

// returns 20 hits...
AskKodiak.suggestNaicsCodes('ro').then(function (response) {
  console.log(response.hits.length);
}).catch(function (error) {
  console.error(error);
});

// returns 100 hits...
AskKodiak.suggestNaicsCodes('ro', { hitsPerPage: '100' }).then(function (response) {
  console.log(response.hits.length);
}).catch(function (error) {
  console.error(error);
});

AskKodiak.suggestNaicsGroups('ro').then(function (response) {
  console.log(response.hits.length);
}).catch(function (error) {
  console.error(error);
});

// page three of results 5 pages at a time..
AskKodiak.suggestNaicsGroups('ro', { hitsPerPage: 5, page: 3 }).then(function (response) {
  console.log(response.hits.length);
}).catch(function (error) {
  console.error(error);
});

*/
