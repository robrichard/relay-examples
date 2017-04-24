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

import 'todomvc-common';

import React from 'react';
import ReactDOM from 'react-dom';
import {QueryRenderer} from 'react-relay';
import ReactRelayLookupRenderer from './components/ReactRelayLookupRenderer';
import getRelayEnvironment from './getRelayEnvironment';
import TodoApp from './components/TodoApp';
import rootQuery from './root';

const mountNode = document.getElementById('root');
const environment = getRelayEnvironment(window.records);

ReactDOM.render(
  <ReactRelayLookupRenderer
    environment={environment}
    query={rootQuery}
    variables={{status: null}}
    render={({error, props}) => {
      if (props) {
        return <TodoApp viewer={props.viewer} />
      } else {
        return <div>Loading</div>;
      }
    }}
  />,
  mountNode
);


window.getRelayEnvironment = getRelayEnvironment;
