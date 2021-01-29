let globalId = 0;

/**
 * @description Unique global id
 * @param {string?}prefix
 * @return {string}
 */
export default function getId(prefix = '') {
  globalId += 1;
  return String(prefix) + globalId;
}
