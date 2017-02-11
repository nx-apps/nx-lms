import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
    dataList:[]
}

export function classRoomReducer(state = initialState,action){

    switch (action.type) {
        case 'CLASSROOM_GET_LIST':
            return Object.assign({},state,{dataList:action.payload});
        default:
            return state
    }

}

export function classRoomAction(store){

    
    return [commonAction(),
        {
            
            TEST_A:function(a){
                this.aaa = '1';
                return new Promise((resolve,reject)=>{
                    return resolve('ddddd');
                })
            },

            CLASSROOM_GET_LIST:function(){
                // axios.get('./student/student')
                // .then((response)=>{
                //     console.log(response.data);
                //     store.dispatch({type:'CLASSROOM_GET_LIST',payload:response.data});
                // })
                // .catch((error)=>{
                //     console.log(error);
                // })
            }

        }
    ]


}
