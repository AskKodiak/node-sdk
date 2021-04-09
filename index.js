const rp = require('request-promise'),
      notReadyMessage = 'Ask Kodiak not initialized. Make sure to call init() with your group id and key before making a request.',
      defaultUrl = 'https://api.askkodiak.com/v2';

var ready = false, // initialization status
    gid, // group id associated with api
    key, // key associated with ask kodiak api
    baseURL, // base url of ask kodiak api.
    headers, // auth headers
    paramsToString = (obj = {}) => {
      var string = '',  // eventually something like '?geos=US-MA+US-VT&naicsCodes=11+22'
          params = [],
          keys = Object.keys(obj);

      // keys are the names of the request parameter(s)
      keys.forEach(key => {
        var value = obj[key],
            values = [],
            param = key + '='; // the start of the string for this parameter

        // is there a value for this key?
        if (typeof value !== undefined) {
          // there is a value.
          // iis it an array?
          if (Array.isArray(value)) {
            // already an array, no need to convert it.
            values = value;
          } else {
            values = [value]; //values is now an array of one item, the single value passed
          }
        }

        // separate individual values with a '+' sign. that's how the Ask Kodiak API looks for params that are lists
        values.forEach(value => {
          param += encodeURIComponent(value) + '+';
        });

        // if there were any values, push this param to the list of all the params
        if (values.length > 0) {
          param = param.slice(0, -1); // remove trailing + sign
          params.push(param); // add to the list of parameters
        }
      });

      // add any request parameters created when looping through the obj to the string
      if (params.length > 0) {
        string = `${string}?`; // base url
        params.forEach(param => {
          string += `${param}&`; // add param
        });
        string = string.slice(0, -1); // remove final trailing ampersand
      }

      return string;
    }, //returns request params as a string, or any empty string if none
    getUrlStr = (relativeUrl = '', paramsObj) => {

      // make sure the relative url starts with a slash and add one if not
      if (!relativeUrl.startsWith('/')) {
        relativeUrl = `/${relativeUrl}`;
      }

      return encodeURI(baseURL + relativeUrl + paramsToString(paramsObj));
    },
    post = async (relativeUrl = '', data = {}, paramsObj = {}) => {
      // eslint-disable-next-line no-unused-vars
      const isReady = (() => {
              if (!ready) {
                throw new Error(notReadyMessage);
              }
              return ready;
            })(),
            request = {
              uri: getUrlStr(relativeUrl, paramsObj),
              method: 'POST', // request method
              headers: headers, // basic auth headers
              body: data, // post body
              json: true   // Automatically parses the JSON string in the response
            },
            res =  await rp(request);

      return res;

    },
    get = async (relativeUrl = '', paramsObj = {}) => {
      // eslint-disable-next-line no-unused-vars
      const isReady = (() => {
              if (!ready) {
                throw new Error(notReadyMessage);
              }
              return ready;
            })(),
            request = {
              uri: getUrlStr(relativeUrl, paramsObj),
              method: 'GET', // request method
              headers: headers, // basic auth headers
              json: true   // Automatically parses the JSON string in the response
            },
            res =  await rp(request);

      return res;

    },
    init = async (withGid, withKey, withUrl = defaultUrl) => {
      gid = withGid; // set the gid associated with future requests
      key = withKey; // set the key associated with future requests
      baseURL = withUrl; //use the default url for future requests unless otherwise requested
      headers = {Authorization: `Basic ${Buffer.from(gid + ':' + key).toString('base64')}`}; // basic auth headers
      ready = true; // set ready to true so we can test a first call. if it fails we'll flip this back.

      // test connectivity.
      try {
        let geos = await get('/ref-data/geos', {countries: 'CA', subdivisionTypes: ['territory', 'province']});  // eslint-disable-line no-unused-vars
      } catch (errorResponse) {
        let error = errorResponse.error || {},
            message = `ask kodiak api error: ${error.message || 'something went wrong connecting to the Ask Kodiak API'}`;

        ready = false;

        throw new Error(message);
      }

      // keys established and verified. ready to roll.
      return ready;

    }; // init method. call once before running. sets up parameters and tests connectivity

exports.init = init;
exports.get = get;
exports.post = post;
