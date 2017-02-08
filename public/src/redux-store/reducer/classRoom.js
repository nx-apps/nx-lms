import axios from '../axios'

const initialState = {
    dataList:[]
}

export function classRoomReducer(state = initialState,action){

    switch (action.type) {
        case 'CLASS_GET_LIST':
            return Object.assign({},state,{dataList:action.payload});
        default:
            return state
    }

}

export function classRoomAction(store){
    return {
        
    }
}
