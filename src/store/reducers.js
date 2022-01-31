import { combineReducers } from "redux";
import {
  UPDATE_REMAINING_APPS,
  UPDATE_NUM_YESES,
  LOGIN,
  LOGOUT,
  UPDATE_COMMENTS_MAP,
} from "./actions";

const DEFAULT = {
  name: "",
  verified: false,
  remainingApps: [],
  numYeses: 0,
  commentsMap: {},
};

const mainReducer = (state = DEFAULT, action) => {
  if (action.type === UPDATE_REMAINING_APPS) {
    return { ...state, remainingApps: action.body };
  } else if (action.type === UPDATE_NUM_YESES) {
    return { ...state, numYeses: action.body };
  } else if (action.type === LOGIN) {
    return { ...state, name: action.body, verified: true };
  } else if (action.type === LOGOUT) {
    return DEFAULT;
  } else if (action.type === UPDATE_COMMENTS_MAP) {
    return { ...state, commentsMap: action.body}
  } else {
    return state;
  }
};

export const rootReducer = combineReducers({ mainReducer });
