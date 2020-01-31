'use strict';

const request = require('request-promise-native');

const BASE_BACKEND_URL = 'https://global-apps-backend-uevpdyoiea-ew.a.run.app';

const getRequestToken = cloudRunUrl => {
  const metadataServerTokenURL =
    'http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience=';
  const tokenRequestOptions = {
    uri: metadataServerTokenURL + cloudRunUrl,
    headers: {
      'Metadata-Flavor': 'Google',
    },
  };
  return request.get(tokenRequestOptions);
};

const prepareCloudRunCall = (url, body) => {
  return {
    method: 'POST',
    url,
    resolveWithFullResponse: false,
    simple: true,
    json: true,
    body,
  };
};

const post = (path, options) => {
  return getRequestToken(BASE_BACKEND_URL).then(token => {
    const req = prepareCloudRunCall(`${BASE_BACKEND_URL}${path}`, options.data);
    return request.post(req).auth(null, null, true, token);
  });
};

module.exports = {
  post,
};
