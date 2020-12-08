import { createSelector } from "reselect";

export const getPersonColor = createSelector(
  (state) => state.personColor,
  (personColor) => personColor.personColor
);
