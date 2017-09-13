import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import AllTasksReducer from './reducer_all';
import UsersReducer from './reducer_users';
import UsersTasksReducer from './reducer_tasks';

const rootReducer = combineReducers({
  form: formReducer,
  allTasks: AllTasksReducer,
  users: UsersReducer,
  usersTasks: UsersTasksReducer
});

export default rootReducer;
