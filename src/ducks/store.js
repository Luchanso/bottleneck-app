import { createAction } from 'redux-actions';

const root = 'store';

/**
 * Сохранить состояние приложения
 */
export const save = () => {
  createAction(`${root}/SAVE`)();
};

/**
 * Загрузить последнее состояние
 */
export const load = () => {
  createAction(`${root}/LOAD`)();
};
