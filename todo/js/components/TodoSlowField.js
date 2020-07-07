import React from 'react';
import {useFragment} from 'react-relay/hooks';

export default function TodoSlowField({todo: todoRef}) {
  const todo = useFragment(
    graphql`
      fragment TodoSlowField on Todo {
        slowField
      }
    `,
    todoRef,
  );
  return <div>{todo.slowField}</div>;
}
