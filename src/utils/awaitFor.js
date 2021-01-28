/**
 * @description Returns promise to be resolved in time
 * @param {number}time
 * @returns {Promise<undefined>}
 */
export default function awaitFor(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
