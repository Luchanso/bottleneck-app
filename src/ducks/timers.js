import { createAction, handleActions } from 'redux-actions';
import uuid from 'uuid/v4';

const prefix = 'timers';

const initialState = {
  started: '',
};

export const create = createAction(`${prefix}/CREATE`);
export const rename = createAction(`${prefix}/RENAME`);
export const destroy = createAction(`${prefix}/DESTROY`);
export const reset = createAction(`${prefix}/RESET`);
export const start = createAction(`${prefix}/START`);
export const stop = createAction(`${prefix}/STOP`);

const handleCreate = (state) => {
  const id = uuid();

  return {
    ...state,
    [id]: {
      id,
      isStart: false,
      isStop: true,
      name: '',
      actions: [],
    },
  };
};

export default handleActions({
  create: handleCreate,
}, initialState);
