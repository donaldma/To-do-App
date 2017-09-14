import { FETCH_USERS, SEARCH_USER } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_USERS:
      return _.mapKeys(action.payload.data, 'id');
    case SEARCH_USER:
      return _.mapKeys(action.payload.data.rows, 'id');
    default:
      return state;
  }
}