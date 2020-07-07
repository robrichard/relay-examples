/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TodoListFooter_user$ref: FragmentReference;
declare export opaque type TodoListFooter_user$fragmentType: TodoListFooter_user$ref;
export type TodoListFooter_user = {|
  +id: string,
  +userId: string,
  +completedCount: number,
  +totalCount: number,
  +$refType: TodoListFooter_user$ref,
|};
export type TodoListFooter_user$data = TodoListFooter_user;
export type TodoListFooter_user$key = {
  +$data?: TodoListFooter_user$data,
  +$fragmentRefs: TodoListFooter_user$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoListFooter_user",
  "selections": [
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
      "name": "userId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "completedCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalCount",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '9918b7f02ce09807ec3a3e2a082da3f0';

module.exports = node;
