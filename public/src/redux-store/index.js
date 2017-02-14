import {createStore,combineReducers} from 'redux'
import PolymerRedux from 'polymer-redux'
import {dispatchActionBehavior} from './config'
import {handleAuth} from './auth'

import {authReducer,authAction} from './reducer/auth'
import {questionReducer,questionAction} from './reducer/question'
import {examinationReducer,examinationAction} from './reducer/examination'
import {classRoomReducer,classRoomAction} from './reducer/classRoom'
import {examinationRoomReducer,examinationRoomAction} from './reducer/examinationRoom'
import {examRoomReducer,examRoomAction} from './reducer/examRoom'
import {examHistoryReducer,examHistoryAction} from './reducer/examHistory'
import {examReducer,examAction} from './reducer/exam'
import {examResultReducer,examResultAction} from './reducer/examResult'

const rootReducer = combineReducers({
    auth:authReducer,
    question:questionReducer,
    examination:examinationReducer,
    classRoom:classRoomReducer,
    examinationRoom:examinationRoomReducer,
    examRoom:examRoomReducer,
    examHistory:examHistoryReducer,
    exam:examReducer,
    examResult:examResultReducer
});
const storeApp = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

window.ReduxBehavior = PolymerRedux(storeApp);
window.dispatchActionBehavior = dispatchActionBehavior();

handleAuth();

window.questionAction = questionAction(storeApp);
window.examinationAction = examinationAction(storeApp);
window.classRoomAction = classRoomAction(storeApp);
window.examinationRoomAction = examinationRoomAction(storeApp);
window.authAction = authAction(storeApp);
window.examRoomAction = examRoomAction(storeApp);
window.examHistoryAction = examHistoryAction(storeApp);
window.examAction = examAction(storeApp);
window.examResultAction = examResultAction(storeApp);