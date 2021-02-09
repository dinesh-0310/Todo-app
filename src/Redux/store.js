import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { reducer as loginReducer} from './Login/reducer';
import {reducer as registerReducer} from './Register/reducer';
// import {reducer as githubReducer} from './Githubuser/reducer';
import {reducer as profileReducer} from './Profile/reducer';
import {reducer as taskReducer} from './Task/reducer'
// import {reducer as todoReducer} from './Todo/reducer';

const rootReducer = combineReducers({
    register : registerReducer,
    login : loginReducer,
    // github : githubReducer,
    profile : profileReducer,
    // todo : todoReducer
    tasks : taskReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)