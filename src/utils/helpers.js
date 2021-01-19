/**
 * Formats field responses
 * for multiple select questions like "Which programming languages do you know?", converts Object [a,b,c] to "a, b, c"
 * @param {Object} entry: field response to be formatted (can be string or Object[])
 */
export const formatFieldResponse = (entry) => {
  return typeof entry !== "string" ? Array.from(entry).join(", ") : entry;
};

/**
 * Destructively shuffles an input array.
 * @returns shuffled array
 */
export const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
  return array;
};

export const orderFields = (fields) => {
  return global.QUESTION_ORDER
    ? global.QUESTION_ORDER.slice().map((i) => Object.keys(fields)[i])
    : Object.keys(fields);
};
