import { USER_TASKS } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch(action.type) {
    case USER_TASKS:
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}