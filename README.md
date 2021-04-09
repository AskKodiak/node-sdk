# Ask Kodiak Node.js SDK

## Table of Contents

* [Overview](#overview)
* [Installation](#installation)
* [Contributing](#contributing)
* [Usage](#usage)
* [Upgrading](#upgrading)
* [License](#license)

## Overview

The Ask Kodiak Node.js SDK is a lightweight node implementation of the [Ask Kodiak API](https://api.askkodiak.com/doc/v2) for node.js environments. API Keys are required to use, you can obtain those keys from Company Settings once you've created an Ask Kodiak account.

The Ask Kodiak Node.js SDK supports node.js version 12.0 and higher.

## Installation

The Ask Kodiak Node.js SDK is available on npm as `ask-kodiak-sdk`.

```bash
npm install --save ask-kodiak-sdk
```

## Contributing

Please refer to the [CONTRIBUTING page](./CONTRIBUTING.md) for more information
about how you can contribute to this project. We welcome bug reports, feature
requests, code review feedback, and also pull requests.

## Usage

Import into your project as a module and go to town.

Before making requests you must call the `init()` method one time with your group id and key. This sets up the module with your credential for subsequent requests and verifies connectivity. You only need to do this once. You can find your key and group id in your company settings in Ask Kodiak.

```js

const askkodiak = require('ask-kodiak-sdk'),
      key = 'your api key', //get this from your Company Settings in Ask Kodiak,
      gid = 'your group id', //get this from your Company Settings in Ask Kodiak,
      ready = await askkodiak.init(gid, key); // you must call init one time with your gid and key before making requests.
      // now ready to make requests...

```

For any API request that supports optional request parameters, pass a `paramsObj` object to the method with those values. For example, if making a request where it's important to filter by geography and owner, you would pass the following `paramsObj` object to the method:

```js
{
  geos: ['US-MN','US-HI'],
  owners: 'ABC123'
}
```

To make GET requests:

```js

// get ref data for Canadian territories or provinces only.
// url, request parameters object
var canadianPlaces = await askkodiak.get('ref-data/geos', {countries: 'CA', subdivisionTypes: ['territory', 'province']});

```

To make POST requests:

```js

// url, post body, request parameters object
var companies = await askkodiak.post('products/by-company',
  {
    virtualCompanies: [
      {
        name: 'Virtual Carrier Mutual',
        logo: 'https://logo.askkodiak.com/mono-dark/ask-kodiak-small.png',
        productTag: 'virtual'
      }
    ]
  },
  {
    naicsGroups: '722514'
  }

```

For a full list of options supported by each interface, see the [Ask Kodiak API](https://api.askkodiak.com/doc/v2) documentation.

## Upgrading

Version 3 brings with it breaking changes. Endpoint specific interfaces have been removed in favor of universal `get` and `post` methods. Please update your implementation accordingly.

```js
//BEFORE
var response = await askkodiak.productsForCode('44-45');
// AFTER
var response = await askkodiak.get('products/class-code/naics/44-45');
```

## License

Licensed under the MIT license
