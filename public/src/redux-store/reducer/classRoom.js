import axios from '../axios'

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
    return {
        listeners:{
            'method':'handleCall'
        },
        handleCall:function(e){
            var {method,payload,callback} = e.detail;
            eval(`this.${method}(payload,callback)`)
        },

        testA:function(detail,callback){
            console.log('xx');
        },

        CLASSROOM_GET_LIST:function(){
            axios.get('./student/student')
            .then((response)=>{
                console.log(response.data);
                store.dispatch({type:'CLASSROOM_GET_LIST',payload:response.data});
            })
            .catch((error)=>{
                console.log(error);
            })
        },
    }
}
