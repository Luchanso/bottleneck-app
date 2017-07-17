/**
 * Подсчитывает суммарное время работы таймера
 * @param {Array<Object>} intervals Временные интервалы
 */
export const calculateTotalTime = (intervals) => {
  return intervals.reduce((sum, item) => {
    const { start, stop } = item;

    if (!stop) {
      return sum + (Date.now() - start);
    }

    return sum + (stop - start);
  }, 0);
};

export default null;
