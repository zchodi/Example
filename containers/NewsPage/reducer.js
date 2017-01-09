/*
 * HomeReducer
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
  CHANGE_CONTENT,
} from './constant';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  content: '',
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CONTENT:
      return state
        .set( 'content' , action.content)
    default:
      return state;
  }
}

export default homeReducer;
