import React from 'react';
import { fetchTaskFulFilled, FETCH_TASK } from './actions';
import { map, mergeMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { combineEpics, ofType } from 'redux-observable';

const fetchTasksEpic = (action$: any) => {
  console.log('fetchTaskEpic ');
  return action$.pipe(
    ofType(FETCH_TASK),
    mergeMap((action) =>
      ajax
        .getJSON(`http://localhost:3001/api/v1/tasks`)
        .pipe(map((response) => fetchTaskFulFilled(response)))
    )
  );
};

const rootEpic = combineEpics(fetchTasksEpic);
export { fetchTasksEpic };
export default rootEpic;
