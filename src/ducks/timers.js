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

export default handleActions({
  [create]: handleCreate,
  [destroy]: handleDelete,
}, initialState);

export const getAllTimers = timers =>
  Object.values(timers.list);
