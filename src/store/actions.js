export const UPDATE_DECISIONS = "UPDATE_DECISIONS";
export const UPDATE_REMAINING_APPS = "UPDATE_REMAINING_APPS";
export const UPDATE_NUM_YESES = "UPDATE_NUM_YESES";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const UPDATE_COMMENTS_MAP = "UPDATE_COMMENTS_MAP";
export const UPDATE_FLAGS_MAP = "UPDATE_FLAGS_MAP";

/**
 *
 * @param {*} body: [], decisions
 */
export const updateDecisions = (body) => {
  return {
    type: UPDATE_DECISIONS,
    body,
  };
};

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
 * @param {*} body: dict, maps app ID to comments
 */
export const updateCommentsMap = (body) => {
  return {
    type: UPDATE_COMMENTS_MAP,
    body,
  }
}

/**
 * 
 * @param {*} body: dict, maps app ID to flags
 */
 export const updateFlagsMap = (body) => {
  return {
    type: UPDATE_FLAGS_MAP,
    body,
  }
}

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
