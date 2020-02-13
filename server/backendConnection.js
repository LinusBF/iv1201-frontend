'use strict';

const request = require('request-promise-native');

const BASE_BACKEND_URL = 'https://global-apps-backend-uevpdyoiea-ew.a.run.app';
const GCP_METADATA_URL =
  'http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience=';

const getRequestToken = cloudRunUrl => {
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
    url,
    resolveWithFullResponse: false,
    simple: true,
    json: true,
    body,
  };
};

const post = (path, options) => {
  return getRequestToken(BASE_BACKEND_URL).then(token => {
    const req = prepareCloudRunCall(`${BASE_BACKEND_URL}${path}`, options.data, 'POST');
    return request.post(req).auth(null, null, true, token);
  });
};

const get = (path, options) => {
  return getRequestToken(BASE_BACKEND_URL).then(token => {
    const req = prepareCloudRunCall(`${BASE_BACKEND_URL}${path}`, options.data, 'GET');
    return request.get(req).auth(null, null, true, token);
  });
};

module.exports = {
  post,
  get,
};
