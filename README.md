# Ask Kodiak Node.js SDK

## Table of Contents

 * [Overview](#overview)
 * [Installation](#installation)
 * [Contributing](#contributing)
 * [Upgrading](#upgrading)
 * [Documentation](#documentation)
   * [Products](#products)
   * [Product](#product)
   * [Company](#company)
   * [NAICS](#naics)
   * [Admin](#admin)
   * [Analytics](#analytics)
   * [Reference Data](#reference-data)
   * [Suggest](#suggest)
 * [License](#license)

## Overview 

The Ask Kodiak Node.js SDK is a straightforward node implementation of the [Ask Kodiak API](https://api.askkodiak.com/doc/v2) for Node.js environments. API Keys are required to use, you can obtain those keys from Company Settings once you've created an account.

## Installation

The Ask Kodiak Node.js SDK is available on npm as `ask-kodiak-sdk`.

```bash
$ npm install --save ask-kodiak-sdk
```

## Contributing

Please refer to the [CONTRIBUTING page](./CONTRIBUTING.md) for more information
about how you can contribute to this project. We welcome bug reports, feature
requests, code review feedback, and also pull requests.

## Supported Environments

The Ask Kodiak Node.js SDK supports Node.js version 6.0 and higher.

## Upgrading

Version 2 brings with it breaking changes. Make sure to review the [Ask Kodiak API Upgrade Guide](https://api.askkodiak.com/doc/v2/#api-Upgrade_Guides) before upgrading.

Changes to this library:

  * added **Product** method [`getConditionalRules`](#get-conditional-rules).
  * removed **Company** method `getCompanyProfile`.
  * added **Company** method [`getCompany`](#get-company) (replaces the above).
  * added **Analytics** method [`getReferrals`](#get-referrals).
  * added **Analytics** method [`getReferral`](#get-referral).
  * removed **Reference Data** method `getRefDataStates`.
  * added **Reference Data** method [`getRefDataGeos`](#geographies) (replaces the above).

## Documentation 

**For a full list of options supported by each interface, see the [Ask Kodiak API](https://api.askkodiak.com/doc/v2) documentation. **

### Basic Usage

To use the module in your application require it from any JavaScript file. 

Before making requests you must call the `init()` method one time with your group id and key. This sets up the module with your credential for subsequent requests. You only need to do this once. You can find your key and group id in your company settings in Ask Kodiak.

```js

const AskKodiak = require('ask-kodiak-sdk'),
      key = 'your api key', //get this from your Company Settings in Ask Kodiak,
      gid = 'your group id'; //get this from your Company Settings in Ask Kodiak,

// you must call init one time with your gid and key before making requests. 
AskKodiak.init(gid, key);

// now ready to make requests...

```

Methods are named and organized to match the primary [API endpoints](https://api.askkodiak.com/doc/v2/#api-Products-GetProductsForNAICSCode). The library returns promises for all requests. These promises resolve to the data as documented in the API doc.

For any API request that supports optional request parameters, pass an `options` object to the method with those values. For example, if making a request where it's important to filter by geography and owner, you would pass the following `options` object to the method: 

```js
{
  'geos': 'US-MN+US-HI',
  'owners': 'ABC123'
}
```

### Methods

#### Products

##### Products for Code

Get products eligible for a given NAICS code. https://api.askkodiak.com/doc/v2/#api-Products-GetProductsForNAICSCode

```js

//return all products for the retail sector
AskKodiak.productsForCode('44-45').then(function (products) {
  // see https://api.askkodiak.com/doc/v2/#api-Products-GetProductsForNAICSCode for response object documentation
  console.log(products.count);
}).catch(function (error) {
  console.error(error);
});

// alternative example, all products for the retail sector for companies with 1,000,000 in annual revenue
// any valid optional request parameter for this interface can be passed in the options object.
AskKodiak.productsForCode('44-45', {'annualRevenue':1000000}).then(function (products) {
  console.log(products.count);
}).catch(function (error) {
  console.error(error);
});

```

##### Products for Company

Get products for a given Company. https://api.askkodiak.com/doc/v2/#api-Products-GetProductsForCompany

```js

//return all products owned by the company with id -Nj840c1sd9nnByho
AskKodiak.productsForCompany('-Nj840c1sd9nnByho').then(function (response) {
  console.log('all', response.products.length);
}).catch(function (error) {
  console.error(error);
});

//return all BOP products owned by the company with id -Nj840c1sd9nnByho
AskKodiak.productsForCompany('-Nj840c1sd9nnByho', {'productCodes': 'BOP'}).then(function (response) {
  console.log('bop', response.products.length);
}).catch(function (error) {
  console.error(error);
});

```

#### Product

##### Get Product

Return a product with the specified id. https://api.askkodiak.com/doc/v2/#api-Product-GetProduct

```js

//return all product with the given id
AskKodiak.getProduct('-Kv9s36or1XZKVHvlYwx').then(function (product) {
  console.log(product.name);
}).catch(function (error) {
  console.error(error);
});

```

##### Check Eligibility for NAICS Code

Check the eligibility of a product for any valid 2-6 digit NAICS code or computed NAICS Hash. https://api.askkodiak.com/doc/v2/#api-Product-ProductIsEligibleForNAICSCode

```js
AskKodiak.isProductEligibleForNaics('-Kv9s36or1XZKVHvlYwx', '44-45').then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});
```

##### Get Eligibility by NAICS Group Type

Get the eligibility of a product at a given NAICS group level (`sector`, `subsector`, etc).https://api.askkodiak.com/doc/v2/#api-Product-ProductEligibilityByNAICSGroupType


```js
AskKodiak.getEligibilityByNaicsGroupType('-Kv9s36or1XZKVHvlYwx', 'sector').then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});
```

##### Render Conditional Content

Render conditional content for the product associated with the specified conditions. https://api.askkodiak.com/doc/v2/#api-Product-RenderConditionalContent

```js

AskKodiak.renderConditionalContent('-Kv9s36or1XZKVHvlYwx', { naicsGroups: '44-45', geos: 'US-MA' }).then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});
```

#### Get Conditional Rules

Get unprocessed conditional rules for the requested product. **Please note, this interface exists primarily for debugging**. The rules expressed in the response are automatically applied to other product interfaces based on the parameters of the specific request. This interface simply provides a getter for all the rules that have been specified for a product.
https://api.askkodiak.com/doc/v2/#api-Product-GetConditionalRulesForProduct

```js

AskKodiak.getConditionalRules('-Kv9s36or1XZKVHvlYwx', {}).then(function (response) {
  // handle response
}).catch(function (error) {
  // handle error
});

```

#### Company

##### Get Companies

Get the basic information about companies with storefronts on Ask Kodiak, including their name, website, and other descriptive information as available. https://api.askkodiak.com/doc/v2/#api-Company-GetCompanies

```js

//get all companies on Ask Kodiak
AskKodiak.getCompanies().then(function (companies) {
  console.log(companies);
}).catch(function (error) {
  console.error(error);
});

```

##### Get Company

Get the basic information about a company on Ask Kodiak. https://api.askkodiak.com/doc/v2/#api-Company-GetCompany

```js
// get the profile of the company by it's id
AskKodiak.getCompany('-L635HNnakPWk0QNHat-').then(function (company) {
  console.log(company.name);
}).catch(function (error) {
  console.error(error);
});

```

#### NAICS

##### Get Code

Decode a NAICS MD5 hash into the 6 digit naics code and sub-description it represents. https://api.askkodiak.com/doc/v2/#api-NAICS-GetNaicsCode

```js
AskKodiak.getNaicsCode('0000dc045c872f122d694ef600c394df').then(function (code) {
  console.log(code);
  /*

  { code: '621511',
  description: 'Pathology laboratories, medical',
  hash: '0000dc045c872f122d694ef600c394df' }

  */
}).catch(function (error) {
  console.error(error);
});
```

##### Get Codes

Get all computed NAICS hashes. Heads up, this is a big hunk of data. We recommend that you cache a copy on your end for best performance.
https://api.askkodiak.com/doc/v2/#api-NAICS-GetNaicsCodes

```js
AskKodiak.getNaicsCodes().then(function (code) {
  console.log(code); //big wad-o-data
}).catch(function (error) {
  console.error(error);
});
```

##### Get Description

Get a description for a NAICS group. https://api.askkodiak.com/doc/v2/#api-NAICS-GetNaicsDescription

```js
AskKodiak.getNaicsDescription('811310').then(function (response) {
  console.log(response.description); 
}).catch(function (error) {
  console.error(error);
});
```

##### Get Group

Get any given NAICS group using its numerical group number. https://api.askkodiak.com/doc/v2/#api-NAICS-GetNaicsGroup

```js
AskKodiak.getNaicsGroup('8113').then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});
```

##### Get Path

Given a code, return it's NAICS parentage. https://api.askkodiak.com/doc/v2/#api-NAICS-GetNaicsGroupPath

```js
//As Array...
AskKodiak.getNaicsPath('488190').then(function (response) {
  console.log(response); //{ path: [ '48-49', '488', '4881', '48819', '488190' ] }
}).catch(function (error) {
  console.error(error);
});

// As Object...
AskKodiak.getNaicsPath('488190', {'asObject': true}).then(function (response) {
  console.log(response);
  /*

    { sector: '48-49',
      subsector: '488',
      industryGroup: '4881',
      internationalIndustry: '48819',
      nationalIndustry: '488190' }

  */
}).catch(function (error) {
  console.error(error);
});
```

##### Get Sectors

Get detailed information about all NAICS sectors. https://api.askkodiak.com/doc/v2/#api-NAICS-GetNaicsSectors

```js
AskKodiak.getNaicsSectors().then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});
```

##### Get Summary for Group Type

Get a comprehensive list of all valid naics groups of the requested type.  https://api.askkodiak.com/doc/v2/#api-NAICS-GetNAICSSummaryForGroupType

```js
AskKodiak.getNaicsSummaryForGroupType('sector').then(function (response) {
  console.log(response);
  /*
  {
    '11': 'Agriculture, Forestry, Fishing and Hunting',
    '21': 'Mining, Quarrying, and Oil and Gas Extraction',
    '22': 'Utilities',
    '23': 'Construction',
    '42': 'Wholesale Trade',
    '51': 'Information',
    '52': 'Finance and Insurance',
    '53': 'Real Estate and Rental and Leasing',
    '54': 'Professional, Scientific, and Technical Services',
    '55': 'Management of Companies and Enterprises',
    '56': 'Administrative and Support and Waste Management and Remediation Services',
    '61': 'Educational Services',
    '62': 'Health Care and Social Assistance',
    '71': 'Arts, Entertainment, and Recreation',
    '72': 'Accommodation and Food Services',
    '81': 'Other Services (except Public Administration)',
    '92': 'Public Administration',
    '31-33': 'Manufacturing',
    '44-45': 'Retail Trade',
    '48-49': 'Transportation and Warehousing'
  }

  */
}).catch(function (error) {
  console.error(error);
});
```

##### Get Summary

Get a comprehensive list of all valid naics groups indexed by type (e.g. sector, subsector, industry-group, international-industry, or national-industry). https://api.askkodiak.com/doc/v2/#api-NAICS-GetNAICSSummary

```js
AskKodiak.getNaicsSummary().then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});
```

#### Admin

##### Products

Get products owned by your your group regardless of their permission. https://api.askkodiak.com/doc/v2/#api-Admin-AdminGetProducts.

```js
// all products
AskKodiak.adminGetProducts().then(function (response) {
  console.log(response.products.length);
}).catch(function (error) {
  console.error(error);
});

// all products with eligibility in VA
AskKodiak.adminGetProducts({geos: 'US-VA'}).then(function (response) {
  console.log(response.products.length);
}).catch(function (error) {
  console.error(error);
});
```

#### Analytics

##### Track Event

Track an event (for example a search or a user action). https://api.askkodiak.com/doc/v2/#api-Analytics-TrackEvent

```js
// track an event with the name 'inbound-referral' and pass it the specified data
AskKodiak.trackEvent('inbound-referral', {'referrer': 'https://www.google.com'}).then(function (response) {
  console.log(response); //{ created: true }
}).catch(function (error) {
  console.error(error);
});

```

#### Get Referrals

Retrieve all of your groups referrals from Ask Kodiak. https://api.askkodiak.com/doc/v2/#api-Analytics-GetReferrals

```js
AskKodiak.getReferrals().then(function (companies) {
  //handle response
}).catch(function (error) {
  //handle error
});
```

#### Get Referral

Retrieve the details of a referral using it's id. https://api.askkodiak.com/doc/v2/#api-Analytics-GetReferral

```js
AskKodiak.getReferral('-L876NNhjuPWk0QNTay-d').then(function (company) {
  // handle response
}).catch(function (error) {
  // handle error
});
```

#### Reference Data

##### Business Entity Types

Get a list of business entity types for use decoding the coded values associated with a product. https://api.askkodiak.com/doc/v2/#api-Reference_Data-BusinessEntityTypes

```js
AskKodiak.getRefDataEntityTypes().then(function (response) {
  console.log(response);
  /*
  {
    AS: 'Association',
    CA: 'Condo Association',
    CC: 'City Commission',
    CCORP: 'C Corporation',
    ...
  */
}).catch(function (error) {
  console.error(error);
});
```

##### Product Codes

Get a list of product codes for use decoding the coded values associated with a product.  https://api.askkodiak.com/doc/v2/#api-Reference_Data-ProductCodes

```js
AskKodiak.getRefDataProductCodes().then(function (response) {
  console.log(response);
  /*
  {
    ACCT: 'Accountants Professional',
    ACHE: 'Accident and Health',
    AGENTS: 'Insurance Agents',
    AGLIA: 'Agriculture Liability',
    ...
  }
  */
}).catch(function (error) {
  console.error(error);
});

```

##### Geographies

Get geographies supported by Ask Kodiak as objects indexed by an ISO 3166-2 code. For more information on the ISO 3166 standard, see https://www.iso.org/iso-3166-country-codes.html. https://api.askkodiak.com/doc/v2/#api-Reference_Data-Geographies

```js
AskKodiak.getRefDataGeos().then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.error(error);
});
```

#### Suggest

If your application has a scenario where the user needs to type in a NAICS code, these interfaces are great for making suggestions in a type-ahead control.

##### Naics Codes

Get suggested hashes associated with a search term. https://api.askkodiak.com/doc/v2/#api-Suggest-NAICSCodes

```js
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
```

##### Naics Groups

Get suggested 2-6 digit NAICS groups for a search term.
https://api.askkodiak.com/doc/v2/#api-Suggest-NAICSGroups

```js
// returns 20 hits...
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
```

## License

Licensed under the MIT license
