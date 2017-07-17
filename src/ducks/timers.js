import { createAction, handleActions } from 'redux-actions';
import uuid from 'uuid/v4';
import logger from 'src/logger';

const prefix = 'timers';

const initialState = {
  started: '',
  list: {},
};

export const create = createAction(`${prefix}/CREATE`);
export const rename = createAction(`${prefix}/RENAME`);
export const destroy = createAction(`${prefix}/DESTROY`);
export const reset = createAction(`${prefix}/RESET`);
export const start = createAction(`${prefix}/START`);
export const stop = createAction(`${prefix}/STOP`);

const handleCreate = (state) => {
  const id = uuid();
  const order = Object.values(state.list).length;
  const log = logger('ducks.timers.handleCreate');

  log('id', id);
  log('order', order);

  return {
    ...state,
    list: {
      ...state.list,
      [id]: {
        id,
        order,
        isStart: false,
        isStop: true,
        name: '',
        intervals: [],
      },
    },
  };
};

const handleDelete = (state, action) => {
  const { id } = action.payload;

  const newList = {
    ...state.list,
  };

  delete newList[id];

  return {
    ...state,
    list: newList,
  };
};

const handleStart = (state, action) => {
  const { id } = action.payload;

  const allTimers = getAllTimers(state);
  const newList = {};

  allTimers.forEach((timer) => {
    if (timer.id === id) {
      newList[timer.id] = {
        ...timer,
        isStart: true,
        isStop: false,
        intervals: [...timer.intervals, {
          start: Date.now(),
        }],
      };
    } else {
      newList[timer.id] = {
        ...timer,
        isStart: false,
        isStop: true,
      };

      if (timer.isStart) {
        newList[timer.id]
          .intervals[
            timer.intervals.length - 1
          ]
          .stop = Date.now();
      }
    }
  });

  return {
    ...state,
    list: newList,
    started: id,
  };
};

const handleStop = (state, action) => {
  const { id } = action.payload;
  const { list } = state;
  const timer = list[id];

  const log = logger('ducks.timers.handleStop');

  log('state.started', state.started);
  log('id', id);

  if (state.started !== id) return state;

  const intervals = [...timer.intervals];

  intervals[intervals.length - 1].stop = Date.now();

  return {
    ...state,
    list: {
      ...list,
      [id]: {
        ...timer,
        isStart: false,
        isStop: true,
        intervals,
      },
    },
    started: '',
  };
};

export default handleActions({
  [create]: handleCreate,
  [destroy]: handleDelete,
  [start]: handleStart,
  [stop]: handleStop,
  // [rename]: handleRename,
  // [reset]: handleReset,
}, initialState);

export const getAllTimers = timers =>
  Object.values(timers.list);
