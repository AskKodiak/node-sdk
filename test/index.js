const config = require('./askkodiakrc.json'),
      gid = config.gid,
      key = config.key,
      url = config.url,
      askkodiak = require('../index.js');

var ready = false; // init status.

exports.get = async (relativeUrl, paramsObj) => {
  if (!ready) {
    ready = await askkodiak.init(gid, key, url);
  }
  return await askkodiak.get(relativeUrl, paramsObj);
};

exports.post = async (relativeUrl, data, paramsObj) => {
  if (!ready) {
    ready = await askkodiak.init(gid, key, url);
  }
  return await askkodiak.post(relativeUrl, data, paramsObj);
};
