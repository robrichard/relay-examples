'use strict';

import 'isomorphic-fetch';
import {
  Network
} from 'relay-runtime';

function fetchQuery(
  operation,
  variables,
  cacheConfig
) {

  // if (cacheConfig.payload) {
  //   return Promise.resolve(cacheConfig.payload);
  // }

  // console.log('making request', operation.text);
  return fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
    return response.json();
  }).then(payload => {
    // if (cacheConfig && typeof cacheConfig.savePayload === 'function') {
    //   cacheConfig.savePayload(payload);
    // }

    return payload
  });
}

export default Network.create(fetchQuery);
