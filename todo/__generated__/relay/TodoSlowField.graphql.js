/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TodoSlowField$ref: FragmentReference;
declare export opaque type TodoSlowField$fragmentType: TodoSlowField$ref;
export type TodoSlowField = {|
  +slowField: ?string,
  +$refType: TodoSlowField$ref,
|};
export type TodoSlowField$data = TodoSlowField;
export type TodoSlowField$key = {
  +$data?: TodoSlowField$data,
  +$fragmentRefs: TodoSlowField$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoSlowField",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slowField",
      "storageKey": null
    }
  ],
  "type": "Todo",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'e70c25747fded6537b94e589bcde8f18';

module.exports = node;
