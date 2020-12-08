import { createSelector } from "reselect";

export const getPersonColor = createSelector(
  (state) => state.personColor,
  (personColor) => personColor.personColor
);

export const isColorReady = createSelector(
  (state) => state.personColor,
  (personColor) => personColor.isColorReady
);
