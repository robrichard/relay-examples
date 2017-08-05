import {
  graphql,
} from 'react-relay';

const mutation = graphql`
  mutation AddTodoMutation($input: AddTodoInput!) {
    addTodo(input:$input) {
      __typename
    }
  }
`;
