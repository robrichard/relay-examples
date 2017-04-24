'use strict';

import {
  createOperationSelector,
  getOperation
} from 'relay-runtime';
import nunjucks from 'nunjucks';
import React from 'react';
import {graphql} from 'react-relay/compat';
import {renderToString, } from 'react-dom/server';
import getRelayEnvironment from './getRelayEnvironment';
import RenderRelayWithData from './components/RenderRelayWithData';
import TodoApp from './components/TodoApp';
import rootQuery from './root';

const variables = {status: null};

export default function (req, res, next) {
  let payload;

  const environment = getRelayEnvironment();
  const operation = createOperationSelector(
    getOperation(rootQuery),
    variables
  );

  environment.retain(operation.root);
  environment.sendQuery({
    cacheConfig: {
      serverRenderKey: 'rootQuery',
      savePayload: p => {
        payload = p;
      }
    },
    operation,
    onCompleted: () => {
      const renderedComponent = renderToString(
        <RenderRelayWithData
          fragment={operation.fragment}
          environment={environment}
          variables={variables}
          render={({props}) => <TodoApp viewer={props.viewer}/>}
        />
      );


      res.send(nunjucks.render('index.html', {
        renderedComponent: renderedComponent,
        payload: JSON.stringify(payload)
      }));
    },
    onError: e => {
      console.error(e);
      res.status('500').end();
    }
  });
}
