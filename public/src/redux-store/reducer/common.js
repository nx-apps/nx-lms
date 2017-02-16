import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
   examResult:{}
}

export function commonReducer(state = initialState,action){
    switch (action.type) {
        case 'COMMON_MODULE':
            //return Object.assign({},state,{examResult:action.payload});
            break;
        default:
            break;
    }
}

export function examAction(store){
    return [
        commonAction(),{
            COMMON_MODULE:function(data){
                
            },
        }
    ]
}