'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import areEqual from 'fbjs/lib/areEqual';
import {
  createOperationSelector,
  getOperation
} from 'relay-runtime';

class ReactRelayLookupRenderer extends React.Component {
  constructor(props, context) {
    super(props, context);
    let {query, variables} = props;

    const environment = props.environment;
    let operation = null;
    if (query) {
      query = getOperation(query);
      operation = createOperationSelector(query, variables);
      variables = operation.variables;
    }

    this._mounted = false;
    this._operation = operation;
    this._pendingFetch = null;
    this._relayContext = {
      environment,
      variables,
    };
    this._rootSubscription = null;
    this._selectionReference = null;
    if (query) {
      this.state = {
        readyState: getDefaultState(),
      };
    } else {
      this.state = {
        readyState: {
          error: null,
          props: {},
          retry: null,
        },
      };
    }

    if (operation) {
      const snapshot = environment.lookup(operation.fragment);
      if (!snapshot.data) {
        this._fetch(operation, props.cacheConfig);
      } else {

        this._selectionReference = environment.retain(operation.root);
        this._rootSubscription = environment.subscribe(snapshot, this._onChange);

        this.state = {
          readyState: {
            error: null,
            props: snapshot.data,
            retry: null,
          },
        }
      }
    }
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.query !== this.props.query ||
      nextProps.environment !== this.props.environment ||
      !areEqual(nextProps.variables, this.props.variables)
    ) {
      const {query, variables} = nextProps;
      // TODO (#16225453) QueryRenderer works with old and new environment, but
      // the flow typing doesn't quite work abstracted.
      // $FlowFixMe
      const environment = nextProps.environment;
      if (query) {
        const {
          createOperationSelector,
          getOperation,
        } = environment.unstable_internal;
        const operation = createOperationSelector(
          getOperation(query),
          variables
        );
        this._operation = operation;
        this._relayContext = {
          environment,
          variables: operation.variables,
        };
        this._fetch(operation, nextProps.cacheConfig);
        this.setState({
          readyState: getDefaultState(),
        });
      } else {
        this._operation = null;
        this._relayContext = {
          environment,
          variables,
        };
        this._release();
        this.setState({
          readyState: {
            error: null,
            props: {},
            retry: null,
          },
        });
      }
    }
  }

  componentWillUnmount() {
    this._release();
    this._mounted = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.render !== this.props.render ||
      nextState.readyState !== this.state.readyState
    );
  }

  _release() {
    if (this._pendingFetch) {
      this._pendingFetch.dispose();
      this._pendingFetch = null;
    }
    if (this._rootSubscription) {
      this._rootSubscription.dispose();
      this._rootSubscription = null;
    }
    if (this._selectionReference) {
      this._selectionReference.dispose();
      this._selectionReference = null;
    }
  }

  _fetch(
    operation,
    cacheConfig,
  ) {
    const {environment} = this._relayContext;

    // Immediately retain the results of the new query to prevent relevant data
    // from being freed. This is not strictly required if all new data is
    // fetched in a single step, but is necessary if the network could attempt
    // to incrementally load data (ex: multiple query entries or incrementally
    // loading records from disk cache).
    const nextReference = environment.retain(operation.root);

    let readyState = getDefaultState();
    let snapshot; // results of the root fragment
    const onCompleted = () => {
      this._pendingFetch = null;
    };
    const onError = error => {
      readyState = {
        error,
        props: null,
        retry: () => {
          this._fetch(operation, cacheConfig);
        },
      };
      if (this._selectionReference) {
        this._selectionReference.dispose();
      }
      this._pendingFetch = null;
      this._selectionReference = nextReference;
      this.setState({readyState});
    };
    const onNext = () => {
      // `onNext` can be called multiple times by network layers that support
      // data subscriptions. Wait until the first payload to render `props` and
      // subscribe for data updates.
      if (snapshot) {
        return;
      }
      snapshot = environment.lookup(operation.fragment);
      readyState = {
        error: null,
        props: snapshot.data,
        retry: null,
      };

      if (this._selectionReference) {
        this._selectionReference.dispose();
      }
      this._rootSubscription = environment.subscribe(snapshot, this._onChange);
      this._selectionReference = nextReference;
      this.setState({readyState});
    };

    if (this._pendingFetch) {
      this._pendingFetch.dispose();
    }
    if (this._rootSubscription) {
      this._rootSubscription.dispose();
    }
    const request = environment.streamQuery({
      cacheConfig,
      onCompleted,
      onError,
      onNext,
      operation,
    });
    this._pendingFetch = {
      dispose() {
        request.dispose();
        nextReference.dispose();
      },
    };
  }

  _onChange = (snapshot) => {
    this.setState({
      readyState: {
        ...this.state.readyState,
        props: snapshot.data,
      },
    });
  }

  getChildContext() {
    return {
      relay: this._relayContext,
    };
  }

  render() {
    // Note that the root fragment results in `readyState.props` is already
    // frozen by the store; this call is to freeze the readyState object and
    // error property if set.
    // if (__DEV__) {
    //   deepFreeze(this.state.readyState);
    // }
    return this.props.render(this.state.readyState);
  }
}

ReactRelayLookupRenderer.childContextTypes = {
  relay: PropTypes.object,
};

function getDefaultState() {
  return {
    error: null,
    props: null,
    retry: null,
  };
}

export default ReactRelayLookupRenderer;
