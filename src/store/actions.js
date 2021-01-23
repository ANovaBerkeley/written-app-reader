export const UPDATE_REMAINING_APPS = "UPDATE_REMAINING_APPS";
export const UPDATE_NUM_YESES = "UPDATE_NUM_YESES";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

/**
 *
 * @param {*} body: [], remaining apps
 */
export const updateRemainingApps = (body) => {
  return {
    type: UPDATE_REMAINING_APPS,
    body,
  };
};

/**
 *
 * @param {*} body: int, number of yeses left
 */
export const updateNumYeses = (body) => {
  return {
    type: UPDATE_NUM_YESES,
    body,
  };
};

/**
 *
 * @param {*} body: string, name
 */
export const login = (body) => {
  return {
    type: LOGIN,
    body,
  };
};

/**
 *
 * @param {*} body: string, name
 */
export const logout = () => {
  return {
    type: LOGOUT,
  };
};
