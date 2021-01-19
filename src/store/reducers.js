import { combineReducers } from "redux";
import { UPDATE_REMAINING_APPS } from "./actions";

const DEFAULT = {
  name: "",
  verified: false,
  remainingApps: [],
};

const mainReducer = (state = DEFAULT, action) => {
  if (action.type === UPDATE_REMAINING_APPS) {
    return { ...state, remainingApps: action.body };
  } else {
    return state;
  }
};

export const rootReducer = combineReducers({ mainReducer });
