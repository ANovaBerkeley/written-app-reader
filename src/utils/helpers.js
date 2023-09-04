import { QUESTION_ORDER } from "../secrets";

/**
 * Formats field responses
 * for multiple select questions like "Which programming languages do you know?", converts Object [a,b,c] to "a, b, c"
 * @param {Object} entry: field response to be formatted (can be string or Object[])
 */
export const formatFieldResponse = (entry) => {
  return (typeof entry !== "string" && typeof entry !== "number") ? Array.from(entry).join(", ") : entry;
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
  // Using numeric QUESTION_ORDER is buggy, replacing with direct strings
  // const keys = Object.keys(fields).sort();
  // console.log("keys: ", keys);
  // return QUESTION_ORDER
  //   ? QUESTION_ORDER.slice().map((i) => keys[i])
  //   : keys;
    return QUESTION_ORDER;
};

export const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};
