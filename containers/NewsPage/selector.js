/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

const selectContent = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('content')
);

export {
  selectHome,
  selectContent,
};
