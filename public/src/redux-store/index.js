import {createStore,combineReducers} from 'redux';
import PolymerRedux from 'polymer-redux'

import {questionReducer,questionAction} from './reducer/question'
import {examinationReducer,examinationAction} from './reducer/examination'
import {classRoomReducer,classRoomAction} from './reducer/classRoom'
import {dispachActionBehavior} from './config'

const rootReducer = combineReducers({
    question:questionReducer,
    examination:examinationReducer,
    classRoom:classRoomReducer
});

const storeApp = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

window.ReduxBehavior = PolymerRedux(storeApp);
window.dispachActionBehavior = dispachActionBehavior();

window.questionAction = questionAction(storeApp);
window.examinationAction = examinationAction(storeApp);
window.classRoomAction = classRoomAction(storeApp);