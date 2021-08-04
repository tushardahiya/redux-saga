import { all, call, put, takeEvery } from "redux-saga/effects";

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* helloSaga() {
  console.log("hello saga");
}
//If the Effect type is a PUT then it will dispatch an action to the Store. If the Effect is a CALL then it'll call the given function.

// the worker saga : this will perform the async increment increment task
export function* incrementAsync() {
  yield call(delay, 1000);
  yield put({ type: "INCREMENT" });
}

//this is our watcher saga ,  this will spawn a new incrementAsync(worker saga) on each INCREMENT_ASYNC
function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}

/*the yield expression call(delay, 1000) is what gets passed to the caller of next. call just like put, 
returns an Effect which instructs the middleware to call a given function with the given arguments.
 In fact, neither put nor call performs any dispatch or asynchronous call by themselves, they return plain JavaScript objects. */
