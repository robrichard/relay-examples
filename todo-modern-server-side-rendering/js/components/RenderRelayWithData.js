'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class RenderRelayWithData extends Component {
  render() {
    const {fragment, environment, render} = this.props;
    const snapshot = environment.lookup(fragment);
    return render({props: snapshot.data});
  }
  getChildContext() {
    return {
      relay: {
        environment: this.props.environment,
        variables: this.props.variables
      }
    };
  }
}

RenderRelayWithData.propTypes = {
  fragment: PropTypes.object.isRequired,
  environment: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
  variables: PropTypes.object,
};

RenderRelayWithData.childContextTypes = {
  relay: PropTypes.object
};

export default RenderRelayWithData;
