/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { TodoSlowField$ref } from "./TodoSlowField.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type Todo_todo$ref: FragmentReference;
declare export opaque type Todo_todo$fragmentType: Todo_todo$ref;
export type Todo_todo = {|
  +complete: boolean,
  +id: string,
  +text: string,
  +$fragmentRefs: TodoSlowField$ref,
  +$refType: Todo_todo$ref,
|};
export type Todo_todo$data = Todo_todo;
export type Todo_todo$key = {
  +$data?: Todo_todo$data,
  +$fragmentRefs: Todo_todo$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Todo_todo",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "complete",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "text",
      "storageKey": null
    },
    {
      "kind": "Defer",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "TodoSlowField"
        }
      ]
    }
  ],
  "type": "Todo",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'ddfdb61b3ffccb26fdea8cc65c30393c';

module.exports = node;
