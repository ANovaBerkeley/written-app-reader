export const UPDATE_REMAINING_APPS = "UPDATE_REMAINING_APPS";

/**
 *
 * @param {*} body: {remainingApps: []}
 */
export const updateRemainingApps = (body) => {
  return {
    type: UPDATE_REMAINING_APPS,
    body,
  };
};
