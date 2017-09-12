import { FETCH_ALL } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch(action.type) {
    // case DELETE_POST:
    //   return _.omit(state, action.payload);
    case FETCH_ALL:
      return _.mapKeys(action.payload.data.rows, 'id');
    default:
      return state;
  }
}