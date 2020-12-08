import actionTypes from "../actions/actionTypes";

const initState = {
  personColor: {},
};
const personColor = (state = initState, action) => {
  const { params, type } = action;
  switch (type) {
    case actionTypes.SET_PERSON_COLOR:
      return { ...state, personColor: { ...params } };
    default:
      return state;
  }
};

export default personColor;
