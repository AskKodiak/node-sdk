const rp = require('request-promise'),
      notReadyMessage = 'Ask Kodiak not initialized. Make sure to call init() with your group id and key before making a request.';

var ready = false,
    gid,
    key,
    baseURL,
    options;

function init(intWithGid, initWithKey, initWithBaseURL) {
  gid = intWithGid;
  key = initWithKey;
  baseURL = initWithBaseURL || 'https://api.askkodiak.com/dev/v1/'; //use the default url unless otherwise requested
  options = {
    headers: {'Authorization': 'Basic ' + Buffer.from(gid + ':' + key).toString('base64')},
    json: true // Automatically parses the JSON string in the response
  };
  ready = true;
}

//returns request params as a string, or any empty string if none
function paramsToString(paramsObj) {
  var params,
      requestParams = '';

  paramsObj = paramsObj || {};
  params = Object.keys(paramsObj);

  if (params.length > 0) {
    requestParams += '?';
  }

  params.forEach(function (paramName) {
    requestParams += encodeURI(paramName);
    requestParams += encodeURI(paramsObj[paramName]);
    requestParams += '&';
  });

  if (requestParams.length > 0) {
    requestParams = requestParams.substring(0, requestParams.length - 1);//chop of the trailing ampersand
  }

  return requestParams;

}

function post(relativeUrl, data) {
  return new Promise(function (resolve, reject) {

    if (ready === false) {
      return reject(new Error(notReadyMessage));
    }

    options.uri = baseURL + relativeUrl;
    options.method = 'POST';
    options.body = data;

    rp(options).then(function (response) {
      return resolve(response);
    }).catch(function (err) {
      // API call failed...
      return reject(err);
    });
  });
}

function get(relativeUrl, opts) {
  opts = opts || {};

  return new Promise(function (resolve, reject) {

    var params = paramsToString(opts); //turn the options object into a string of request parameters

    if (ready === false) {
      return reject(new Error(notReadyMessage));
    }

    options.uri = baseURL + relativeUrl + params;

    rp(options).then(function (response) {
      return resolve(response);
    }).catch(function (err) {
      // API call failed...
      return reject(err);
    });
  });
}

module.exports = {
  // must be called before making a request
  init: function (gid, key, baseURL) {
    return init(gid, key, baseURL);
  },
  // PRODUCTS
  productsForCode: function (code, opts) {
    return get('/products/class-code/naics/' + code, opts);
  },
  productsForCompany: function (gid, opts) {
    return get('/products/company/' + gid, opts);
  },
  // PRODUCT
  getProduct: function (pid, opts) {
    return get('/product/' + pid, opts);
  },
  // COMPANY
  getCompanies: function (opts) {
    return get('/companies/', opts);
  },
  getCompanyProfile: function (gid, opts) {
    return get('/company/' + gid, opts);
  },
  // NAICS
  getNaicsCode: function (hash, opts) {
    return get('/naics/code/' + hash, opts);
  },
  getNaicsCodes: function (opts) {
    return get('/naics/codes/', opts);
  },
  getNaicsDescription: function (groupNum, opts) {
    return get('/naics/description/' + groupNum, opts);
  },
  getNaicsGroup: function (groupNum, opts) {
    return get('/naics/group/' + groupNum, opts);
  },
  getNaicsPath: function (groupNum, opts) {
    return get('/naics/utils/get-path/' + groupNum, opts);
  },
  getNaicsSectors: function (opts) {
    return get('/naics/sectors/', opts);
  },
  getNaicsSummaryForGroupType: function (type, opts) {
    return get('/naics/summary/' + type, opts);
  },
  getNaicsSummary: function (opts) {
    return get('/naics/summary/', opts);
  },
  // ADMIN
  adminGetProducts: function (opts) {
    return get('/admin/products/', opts);
  },
  // ANALYTICS
  trackEvent: function (data) {
    return post(data);
  },
  // MERCH
  tShirtCannon: function (data) {
    return post(data);
  },
  // PRODUCT UTILS
  isProductEligibleForNaics: function (pid, code, opts) {
    return get('/product-utils/' + pid  + '/is-eligible-for/' + code, opts);
  },
  renderConditionalContent: function (pid, opts) {
    return get('/product-utils/conditional-content/' + pid, opts);
  },
  // REF DATA
  getRefDataEntityTypes: function (opts) {
    return get('/ref-data/business-entity-types/', opts);
  },
  getRefDataProductCodes: function (opts) {
    return get('/ref-data/product-codes/', opts);
  },
  getRefDataStates: function (opts) {
    return get('/ref-data/states/', opts);
  },
  // SUGGEST
  suggestNaicsCodes: function (term) {
    return get('/suggest/naics-codes/' + term);
  },
  suggestNaicsGroups: function (term) {
    return get('/suggest/naics-groups/' + term);
  }
};
