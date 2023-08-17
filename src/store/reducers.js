import { combineReducers } from "redux";
import {
  UPDATE_ALL_APPLICATIONS,
  UPDATE_DECISIONS,
  UPDATE_REMAINING_APPS,
  UPDATE_NUM_YESES,
  LOGIN,
  LOGOUT,
  UPDATE_COMMENTS_MAP,
  UPDATE_FLAGS_MAP,
  UPDATE_LOCK_APPLICATIONS,
} from "./actions";

const DEFAULT = {
  name: "",
  verified: false,
  lockApplications: true,
  remainingApps: [],
  allApplications: [],
  decisions: [],
  numYeses: 0,
  commentsMap: {},
  flagsMap: {},
};

const mainReducer = (state = DEFAULT, action) => {
  if (action.type === UPDATE_LOCK_APPLICATIONS) {
    return { ...state, lockApplications: action.body }
  } else if (action.type === UPDATE_ALL_APPLICATIONS) {
    return { ...state, allApplications: action.body }
  } else if (action.type === UPDATE_DECISIONS) {
    return { ...state, decisions: action.body }
  } else if (action.type === UPDATE_REMAINING_APPS) {
    return { ...state, remainingApps: action.body };
  } else if (action.type === UPDATE_NUM_YESES) {
    return { ...state, numYeses: action.body };
  } else if (action.type === LOGIN) {
    return { ...state, name: action.body, verified: true };
  } else if (action.type === LOGOUT) {
    return DEFAULT;
  } else if (action.type === UPDATE_COMMENTS_MAP) {
    return { ...state, commentsMap: action.body}
  } else if (action.type === UPDATE_FLAGS_MAP) {
    return { ...state, flagsMap: action.body}
  } else {
    return state;
  }
};

export const rootReducer = combineReducers({ mainReducer });
