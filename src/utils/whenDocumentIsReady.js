/**
 * @description Detect IE8-like events attachment
 * @returns {boolean}
 */
function isIE8() {
  return 'attachEvent' in document && typeof document.attachEvent === 'function';
}

/**
 * @description Defines if document content parsed and ready for manipulations
 */
export default new Promise((resolve) => {
  if (!isIE8()) {
    document.addEventListener('DOMContentLoaded', () => {
      resolve(true);
    });
  } else {
    document.attachEvent('onreadystatechange', () => {
      if (document.readyState === 'complete') {
        resolve(true);
      }
    });
  }
});
