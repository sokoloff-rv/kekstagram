/**
 * Возвращает случайное целое число из заданного диапазона
 *
 * @param {number} startNumber - Начало диапазона
 * @param {number} finishNumber - Конец диапазона
 *
 * @return {number} Случайное число из заданного диапазона
 */
const getRandomNumber = (startNumber, finishNumber) => {
  const roundedStartNumber = Math.ceil(startNumber);
  const roundedFinishNumber = Math.floor(finishNumber);
  let randomNumber = Math.round(Math.random() * (roundedFinishNumber - roundedStartNumber) + roundedStartNumber);
  if (startNumber < 0 || finishNumber < 0 || roundedStartNumber > roundedFinishNumber) {
    randomNumber = 0;
  }
  return randomNumber;
};

/**
 * Проверяет строку на соответствие максимальной длине
 *
 * @param {string} text - Проверяемая строка
 * @param {number} maxLength - Максимальная длина
 *
 * @return {bool} true, если длина строки не больше максимальной, false в противном случае
 */
const checkLength = (text, maxLength) => {
  if (typeof text !== 'string' || typeof maxLength !== 'number') {
    return false;
  }
  return text.length <= maxLength;
};

/**
 * Выводит сообщение об ошибке
 *
 * @param {string} errorText - Текст ошибки
 * @param {number} duration - Время в миллисекундах, после которого уведомление скрывается
 *
 * @return {Function} Функция, скрывающая уведомление об ошибке
 */
const showError = (errorText, duration = 5000) => {
  const errorContainer = document.createElement('div');
  errorContainer.classList.add('error-notice');
  errorContainer.textContent = errorText;
  document.body.append(errorContainer);

  const removeError = () => {
    if (errorContainer.parentNode) {
      errorContainer.parentNode.removeChild(errorContainer);
    }
  };

  const timeoutId = setTimeout(removeError, duration);

  return () => {
    clearTimeout(timeoutId);
    removeError();
  };
};

/**
 * Устранение дребезга
 *
 * @param {string} callback - Функция-колбэк
 * @param {string} timeoutDelay - Время в миллисекундах
 *
 * @return {any} результат выполнения функции-колбэка с устранением дребезга
 */
function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  getRandomNumber,
  checkLength,
  showError,
  debounce
};
