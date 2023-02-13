// actions.js
const FETCH_TASK = 'todos/FETCH_TASK';
const FETCH_TASK_FULFILLED = 'todos/FETCH_TASK_FULFILLED';
const FETCH_TASK_REJECTED = 'todos/FETCH_TASK_REJECTED';
const fetchTask = () => ({ type: FETCH_TASK });
const fetchTaskFulFilled = (payload: any) => {
  console.log('fetchTaskFulFilled ', payload);
  return {
    type: FETCH_TASK_FULFILLED,
    payload,
  };
};
export {
  FETCH_TASK,
  FETCH_TASK_FULFILLED,
  FETCH_TASK_REJECTED,
  fetchTaskFulFilled,
  fetchTask,
};
