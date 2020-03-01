'use strict';

const request = require('request-promise-native');

const BASE_BACKEND_URL = process.env.RUN_LOCAL
  ? 'http://localhost:3000'
  : 'https://global-apps-backend-uevpdyoiea-ew.a.run.app';
const GCP_METADATA_URL =
  'http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience=';

const getRequestToken = cloudRunUrl => {
  if (process.env.RUN_LOCAL) return Promise.resolve('');
  const tokenRequestOptions = {
    uri: GCP_METADATA_URL + cloudRunUrl,
    headers: {
      'Metadata-Flavor': 'Google',
    },
  };
  return request.get(tokenRequestOptions);
};

const prepareCloudRunCall = (url, body, reqType) => {
  return {
    method: reqType,
    url: url,
    resolveWithFullResponse: false,
    simple: true,
    json: true,
    body,
  };
};

const post = (path, options) => {
  return getRequestToken(BASE_BACKEND_URL).then(token => {
    const req = prepareCloudRunCall(
      `${BASE_BACKEND_URL}${path}`,
      options ? options.data : {},
      'POST'
    );
    return request.post(req).auth(null, null, true, token);
  });
};

const get = path => {
  return getRequestToken(BASE_BACKEND_URL).then(token => {
    const req = {
      method: 'GET',
      url: `${BASE_BACKEND_URL}${path}`,
      resolveWithFullResponse: false,
      simple: true,
    };
    /*const req = prepareCloudRunCall(
      `${BASE_BACKEND_URL}${path}`,
      options ? options.data : {},
      'GET'
    );*/
    return request
      .get(req)
      .auth(null, null, true, token)
      .then(res => {
        console.debug(res);
        return res;
      });
  });
};

module.exports = {
  post,
  get,
};
