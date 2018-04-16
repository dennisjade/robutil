import jws from 'jws';
import _ from 'lodash';

const isString = obj => typeof obj === 'string';

const tokenPayload = (token) => {
  const data = jws.decode(token);
  const rawPayload = (data !== null) ? data.payload : null;

  return (isString(rawPayload) ? JSON.parse(rawPayload) : rawPayload) || '';
};

function getToken(headers) {
  if (!headers.authorization) return null;

  const [, token] = headers.authorization.split('Bearer ');
  if (!token) return null;

  try {
    return tokenPayload(token);
  } catch (e) {
    return null;
  }
}

export const verify = (headerToken, headers) => {
  if (!headers.hasOwnProperty('x-shopify-hmac-sha256') ) {
    return _.isEqual(tokenPayload(headerToken), getToken(headers));
  }
  return true;
};

export default verify;
