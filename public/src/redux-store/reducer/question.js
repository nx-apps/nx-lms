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
        QUESTION_INSERT:function(data){
            return new Promise((resolve,reject)=>{
                // data = {
                //     answer:1,
                //     choice:["A" ,"B"],
                //     tag:["ac"],
                //     topic:'What is your name ?',
                //     user_id:'888'
                // };

                axios.post('./question/question',data)
                .then((response)=>{
                    this.QUESTION_GET_LIST();
                    resolve(response);
                })
                .catch((error)=>{
                    reject(error);
                });

            })
            
        },
        QUESTION_SELECT:function(questionId){
            return axios.get('./question/question_only?id='+questionId)
        }
    }
}
