import { ActionTypes } from "../Constants/action-types";

export const setJokes = (action) => {
  return {
    type: ActionTypes.SET_JOKES,
    payload: action,
  };
};
export const setCategory = (action) => {
  return {
    type: ActionTypes.SET_CATEGORY,
    payload: action,
  };
};
export const setSelected = (action) => {
  return {
    type: ActionTypes.SET_SELECTED,
    payload: action,
  };
};
export const setLike = () => {
  return {
    type: ActionTypes.SET_LIKE,
  };
};
export const setDislike = () => {
  return {
    type: ActionTypes.SET_DISLIKE,
  };
};
export const setSearch = (action) => {
  return {
    type: ActionTypes.SET_SEARCH,
    payload: action,
  };
};
