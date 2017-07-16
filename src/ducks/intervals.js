import { createAction, handleActions } from 'redux-actions';
// import { reselect } from 'reselect';

const root = 'intervals';
const initialState = {};

// actions
export const put = createAction(`${root}/PUT`);

// reducers
export const handlePut = (state, action) => {
  const { id, interval } = action.payload;

  return {
    ...state,
    [id]: [...state[id], interval],
  };
};

export default handleActions({
  [put]: handlePut,
}, initialState);

// selectors
/**
 * Суммарное время работы таймера
 * @param {Object} state
 * @param {String} id
 */
export const getSummaryTimeWork = (state, id) => {
  const timerIntervals = state[id];

  return timerIntervals.reduce((item, sum) => {
    const { start, stop } = item;

    return sum + (start - stop);
  }, 0);
};
