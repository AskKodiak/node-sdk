# Ask Kodiak Node.js SDK

## Table of Contents

 * [Overview](#overview)
 * [Installation](#installation)
 * [Contributing](#contributing)
 * [Documentation](#documentation)
 * [Supported Environments](#supported-environments)
 * [Acknowledgments](#acknowledgments)
 * [License](#license)


## Overview 

The Ask Kodiak Node.js SDK is a straightforward node implementation of the [Ask Kodiak API](https://api.askkodiak.com/doc/) for Node.js environments. API Keys are required to use, you can obtain those keys from Company Settings once you've created an account.

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

The Ask Kodiak Node.js SDK supports Node.js version 6.0 and hhigher.

## Documentation 

For a full list of options supported by each interace, see [Ask Kodiak API](https://api.askkodiak.com/doc/). 

### Basic Usage

To use the module in your application require it from any JavaScript file. 

Before making requests you must call the `init` method one time with your group id and key. This sets up the module with your credential for subsequent requests. You only need to do this once. You can find your key and group id in your company settings in Ask Kodiak.

```js

const AskKodiak = require('ask-kodiak-sdk'),
      key = 'your api key', //get this from your Company Settings in Ask Kodiak,
      gid = 'your group id'; //get this from your Company Settings in Ask Kodiak,

// you must call init one time with your gid and key before making requests. 
AskKodiak.init(gid, key);

// now ready to make requests...

```

Methods are named and organized to match the primary [API endpoints](https://api.askkodiak.com/doc/#api-Products-GetProductsForNAICSCode). The library returns promises for all requests. 

For any API request that supports optional request parameters, pass an `options` object to the method with those values. For example, if making a request where it's important to filter by state and owner, you would pass the following `options` object to the method: 

```js
{
  'states': 'MN+HI',
  'owners': 'ABC123'
}
```

### Methods

#### Products

##### Products for Code

Get products eligible for a given NAICS code. https://api.askkodiak.com/doc/#api-Products-GetProductsForNAICSCode

All request parameters documented in the API doc are supported via an `options` object.

```js

//return all products for the retail sector
AskKodiak.productsForCode('44-45').then(function (products) {
  // see https://api.askkodiak.com/doc/#api-Products-GetProductsForNAICSCode for response object documentation
  console.log(products.count);
}).catch(function (error) {
  console.error(error);
});

// alternative example, all products for the retail sector for companies with 1,000,000 in annual revenue
AskKodiak.productsForCode('44-45', {'annualRevenue':1000000}).then(function (products) {
  console.log(products.count);
}).catch(function (error) {
  console.error(error);
});


```

##### Products for Company


method()







