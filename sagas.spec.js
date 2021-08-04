import test from "tape";

import { put, call } from "redux-saga/effects";
import { incrementAsync, delay } from "./sagas";

test("incrementAsync Saga test", (assert) => {
  const gen = incrementAsync();

  //checks if 1 and 2 are equal(deep check)
  assert.deepEqual(
    gen.next().value, //1
    call(delay, 1000), //2
    "incrementAsync must call delay(1000)"
  );

  assert.deepEqual(
    gen.next().value, //1
    put({ type: "INCREMENT" }), //2
    "incrementAsync Saga must dispatch an INCREMENT action"
  );

  assert.deepEqual(
    gen.next(), //1
    { done: true, value: undefined }, //2
    "incrementAsync Saga must be done"
  );

  assert.end();
});
