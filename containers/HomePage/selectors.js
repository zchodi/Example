/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

const selectUsername = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('username')
);
const selectContent = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('content')
);

export {
  selectHome,
  selectUsername,
  selectContent,
};
