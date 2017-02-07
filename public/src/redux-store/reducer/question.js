import axios from '../axios'

const initialState = {
    dataList:[]
}

export function questionReducer(state = initialState,action){

    switch (action.type) {
        case 'QUESTION_GET_LIST':
            return Object.assign({},state,{dataList:action.payload});
        default:
            return state
    }

}

export function questionAction(store){
    return {
        QUESTION_GET_LIST:function(){
            axios.get('./question/question')
            .then((response)=>{
                store.dispatch({type:'QUESTION_GET_LIST',payload:response.data});
            })
            .catch((error)=>{
                console.log(error);
            });
        },
        QUESTION_CREATE:function(){
            axios.post('./question/question')
            .then((response)=>{
                console.log(response.data);
                this.QUESTION_GET_LIST();
                //store.dispatch({type:'QUESTION_GET_LIST',payload:response.data});
            })
            .catch((error)=>{
                console.log(error);
            });
        },
        QUESTION_SELECT:function(){
            axios.get('./question/question/select')
            .then((response)=>{
                console.log(response.data);
                //store.dispatch({type:'QUESTION_GET_LIST',payload:response.data});
            })
            .catch((error)=>{
                console.log(error);
            });
        }
    }
}
