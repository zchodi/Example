/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectCurrentUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('currentUser')
);

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error')
);

const selectRepos = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

//*************************************************   DONE

const _selectCurrentUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('_currentUser')
);

const _selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('_loading')
);

const _selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('_error')
);

const _selectConts = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['_userData', '_repositories'])
);
//******************************************************************

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  selectCurrentUser,
  selectLoading,
  selectError,
  selectRepos,
  //*********************
  selectLocationState,
  _selectCurrentUser,
  _selectLoading,
  _selectError,
  _selectConts,
};
