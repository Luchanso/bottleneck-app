import { combineReducers } from 'redux';
import timers, * as timersDuck from 'ducks/timers';
import intervals from 'ducks/intervals';

export default combineReducers({
  timers,
  intervals,
});

/**
 * Возвращает все доступные таймеры
 */
export const getAllTimers = state =>
  timersDuck.getAllTimers(state.timers);
