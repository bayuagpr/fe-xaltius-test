import ActionsTypes from "./actionTypes";

export const setPersonColor = (params) => {
  return {
    type: ActionsTypes.SET_PERSON_COLOR,
    params,
  };
};
