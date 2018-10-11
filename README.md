# Ask Kodiak Node SDK

## Table of Contents

 * [Overview](#overview)
 * [Installation](#installation)
 * [Contributing](#contributing)
 * [Documentation](#documentation)
 * [Supported Environments](#supported-environments)
 * [Acknowledgments](#acknowledgments)
 * [License](#license)


## Overview 

The Ask Kodiak Node SDK is a straightforward node implementation of the [Ask Kodiak API](https://api.askkodiak.com/doc/) for Node.js environments. API Keys are required to use, you can obtain those keys from Company Settings once you've created an account.

## Installation

The Ask Kodiak Node SDK is available on npm as `ask-kodiak-sdk`.

```bash
$ npm install --save ask-kodiak-sdk
```

## Contributing

Please refer to the [CONTRIBUTING page](./CONTRIBUTING.md) for more information
about how you can contribute to this project. We welcome bug reports, feature
requests, code review feedback, and also pull requests.

## Supported Environments

The Ask Kodiak Node SDK supports Node.js version 6.0 and hhigher.

## Documentation 

For a full list of options supported by each interace, see [Ask Kodiak API](https://api.askkodiak.com/doc/). 

### Basic Usage

```js

const AskKodiak = require('ask-kodiak-sdk'),
      key = 'your api key', //get this from your Company Settings in Ask Kodiak,
      gid = 'your group id'; //get this from your Company Settings in Ask Kodiak,

// you must call init one time with your gid and key before making requests. 
AskKodiak.init(gid, key, 'https://api-qa.askkodiak.com/dev/v1');

```

### Methods

#### 

method()







