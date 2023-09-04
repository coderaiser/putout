import {authReducer} from './auth/reducers';
import {todoReducer} from './main/todo/reducers';

export default combineReducers({
    auth: authReducer,
    todo: todoReducer,
});
