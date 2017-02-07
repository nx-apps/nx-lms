import {createStore,combineReducers} from 'redux';
import PolymerRedux from 'polymer-redux'

import {questionReducer,questionAction} from './reducer/question'

const rootReducer = combineReducers({
    question:questionReducer
});

const storeApp = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

window.ReduxBehavior = PolymerRedux(storeApp);

window.questionAction = questionAction(storeApp);