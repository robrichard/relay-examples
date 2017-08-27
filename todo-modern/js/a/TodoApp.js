import React from 'react';
import {
  createFragmentContainer,
  graphql,
} from 'react-relay';

const TodoApp = ({viewer}) => (
    <div>
      Viewer typename: {viewer.__typename}
    </div>
);

export default createFragmentContainer(TodoApp, {
  viewer: graphql`
    fragment TodoApp_viewer on User {
        __typename
    }
  `,
});
