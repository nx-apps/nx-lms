import {createStore,combineReducers} from 'redux'
import PolymerRedux from 'polymer-redux'
import {dispatchActionBehavior} from './config'
import {handleAuth} from './auth'

import {authReducer,authAction} from './reduxStore/auth.store.js'
import {classRoomReducer,classRoomAction} from './reduxStore/classRoom.store.js'
import {commonSystemReducer,commonSystemAction} from './reduxStore/commonSystem.store.js'
import {difficultyReducer,difficultyAction} from './reduxStore/difficulty.store.js'
import {examReducer,examAction} from './reduxStore/exam.store.js'
import {examHistoryReducer,examHistoryAction} from './reduxStore/examHistory.store.js'
import {examinationReducer,examinationAction} from './reduxStore/examination.store.js'
import {examinationRoomReducer,examinationRoomAction} from './reduxStore/examinationRoom.store.js'
import {examResultReducer,examResultAction} from './reduxStore/examResult.store.js'
import {examRoomReducer,examRoomAction} from './reduxStore/examRoom.store.js'
import {moduleReducer,moduleAction} from './reduxStore/module.store.js'
import {questionReducer,questionAction} from './reduxStore/question.store.js'
import {userManageReducer,userManageAction} from './reduxStore/userManage.store.js'


const rootReducer = combineReducers({
	auth:authReducer,
	classRoom:classRoomReducer,
	commonSystem:commonSystemReducer,
	difficulty:difficultyReducer,
	exam:examReducer,
	examHistory:examHistoryReducer,
	examination:examinationReducer,
	examinationRoom:examinationRoomReducer,
	examResult:examResultReducer,
	examRoom:examRoomReducer,
	module:moduleReducer,
	question:questionReducer,
	userManage:userManageReducer,

});

const storeApp = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

window.ReduxBehavior = [PolymerRedux(storeApp),dispatchActionBehavior()];
window.dispatchActionBehavior = dispatchActionBehavior();

handleAuth(storeApp);

window.authAction = authAction(storeApp);
window.classRoomAction = classRoomAction(storeApp);
window.commonSystemAction = commonSystemAction(storeApp);
window.difficultyAction = difficultyAction(storeApp);
window.examAction = examAction(storeApp);
window.examHistoryAction = examHistoryAction(storeApp);
window.examinationAction = examinationAction(storeApp);
window.examinationRoomAction = examinationRoomAction(storeApp);
window.examResultAction = examResultAction(storeApp);
window.examRoomAction = examRoomAction(storeApp);
window.moduleAction = moduleAction(storeApp);
window.questionAction = questionAction(storeApp);
window.userManageAction = userManageAction(storeApp);
