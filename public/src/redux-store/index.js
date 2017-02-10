import {createStore,combineReducers} from 'redux'
import PolymerRedux from 'polymer-redux'
import {dispachActionBehavior} from './config'
import {handleAuth} from './auth'

import {authReducer,authAction} from './reducer/auth'
import {questionReducer,questionAction} from './reducer/question'
import {examinationReducer,examinationAction} from './reducer/examination'
import {classRoomReducer,classRoomAction} from './reducer/classRoom'
import {examinationRoomReducer,examinationRoomAction} from './reducer/examinationRoom'


const rootReducer = combineReducers({
    auth:authReducer,
    question:questionReducer,
    examination:examinationReducer,
    classRoom:classRoomReducer,
    examinationRoom:examinationRoomReducer
});

const storeApp = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

window.ReduxBehavior = PolymerRedux(storeApp);
window.dispachActionBehavior = dispachActionBehavior();

handleAuth();

window.questionAction = questionAction(storeApp);
window.examinationAction = examinationAction(storeApp);
window.classRoomAction = classRoomAction(storeApp);
window.examinationRoomAction = examinationRoomAction(storeApp);
window.authAction = authAction(storeApp)