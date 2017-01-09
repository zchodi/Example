/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,

  LOAD_CONTENT_SUCCESS,
  LOAD_CONTENT,
  LOAD_CONTENT_ERROR,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  _loading: false,
  _error: false,
  _currentUser: false,
  _userData: {
    _repositories: false,
  },

});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);

    case LOAD_CONTENT:
      return state
        .set('_loading', true)
        .set('_error', false)
        .setIn(['_userData', '_repositories'], false);
    case LOAD_CONTENT_SUCCESS:
      return state
        .setIn(['_userData', '_repositories'], action.conts)
        .set('_loading', false)
    case LOAD_CONTENT_ERROR:
      return state
        .set('_error', action.error)
        .set('_loading', false);

    default:
      return state;
  }
}

export default appReducer;
