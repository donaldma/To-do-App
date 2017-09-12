import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import AllTasksReducer from './reducer_all';
import UsersReducer from './reducer_users';

const rootReducer = combineReducers({
  form: formReducer,
  allTasks: AllTasksReducer,
  users: UsersReducer
});

export default rootReducer;
