import { USER_TASKS, CLEAR_STATE } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch(action.type) {
    case USER_TASKS:
      return _.mapKeys(action.payload.data, 'id');
    case CLEAR_STATE:
      return state = {};
    default:
      return state;
  }
}