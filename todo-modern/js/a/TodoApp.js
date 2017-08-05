import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

class TodoApp extends React.Component {
  render() {
    return (
      <div>
        bogus
      </div>
    );
  }
}

export default createFragmentContainer(TodoApp, {
  viewer: graphql`
    fragment TodoApp_viewer on User {
      id
    }
  `,
});
