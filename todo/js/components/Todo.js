// @flow
/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation';
import RemoveTodoMutation from '../mutations/RemoveTodoMutation';
import RenameTodoMutation from '../mutations/RenameTodoMutation';
import TodoTextInput from './TodoTextInput';
import TodoSlowField from './TodoSlowField';

import React, {useState} from 'react';
import {createFragmentContainer, graphql, type RelayProp} from 'react-relay';
import classnames from 'classnames';
import type {Todo_todo} from 'relay/Todo_todo.graphql';
import {useFragment} from 'react-relay/hooks';
import type {Todo_user} from 'relay/Todo_user.graphql';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

type Props = {|
  +relay: RelayProp,
  +todo: Todo_todo,
  +user: Todo_user,
|};

const Todo = ({relay, todo: todoRef, user: userRef}: Props) => {
  const todo = useFragment(
    graphql`
      fragment Todo_todo on Todo {
        ...TodoSlowField @defer
        complete
        id
        text
      }
    `,
    todoRef,
  );
  const user = useFragment(
    graphql`
      fragment Todo_user on User {
        id
        userId
        totalCount
        completedCount
      }
    `,
    userRef,
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleCompleteChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const complete = e.currentTarget.checked;
    ChangeTodoStatusMutation.commit(relay.environment, complete, todo, user);
  };

  const handleDestroyClick = () => removeTodo();
  const handleLabelDoubleClick = () => setIsEditing(true);
  const handleTextInputCancel = () => setIsEditing(false);

  const handleTextInputDelete = () => {
    setIsEditing(false);
    removeTodo();
  };

  const handleTextInputSave = (text: string) => {
    setIsEditing(false);
    RenameTodoMutation.commit(relay.environment, text, todo);
  };

  const removeTodo = () =>
    RemoveTodoMutation.commit(relay.environment, todo, user);

  return (
    <li
      className={classnames({
        completed: todo.complete,
        editing: isEditing,
      })}>
      <div className="view">
        <input
          checked={todo.complete}
          className="toggle"
          onChange={handleCompleteChange}
          type="checkbox"
        />

        <label onDoubleClick={handleLabelDoubleClick}>
          {todo.text}
          <React.Suspense fallback={<div>Loading...</div>}>
            <TodoSlowField todo={todo} />
          </React.Suspense>
        </label>
        <button className="destroy" onClick={handleDestroyClick} />
      </div>

      {isEditing && (
        <TodoTextInput
          className="edit"
          commitOnBlur={true}
          initialValue={todo.text}
          onCancel={handleTextInputCancel}
          onDelete={handleTextInputDelete}
          onSave={handleTextInputSave}
        />
      )}
    </li>
  );
};

export default Todo;
