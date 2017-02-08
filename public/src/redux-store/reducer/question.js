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
        QUESTION_UPDATE:function(data){
            return new Promise((resolve,reject)=>{
                axios.put('./question/question',data)
                .then((response)=>{
                    this.QUESTION_GET_LIST();
                    resolve(response);
                })
                .catch((error)=>{
                    reject(error);
                });

            })
            
        },
        QUESTION_DELETE:function(questionId){
            return new Promise((resolve,reject)=>{
                axios.delete('./question/question?id='+questionId)
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
            return new Promise((resolve,reject)=>{
                axios.get('./question/question_only?id='+questionId)
                .then((response)=>{
                    // var choice = response.data.choice.map((row,i)=>{
                    //     if(i===response.data.answer){
                    //         return {checked:true,choice:row};
                    //     }else{
                    //         return {checked:false,choice:row};
                    //     }
                    // });
                    // response.data.choice = choice;
                    resolve(response);
                })
                .catch((error)=>{
                    reject(error);
                });
            });
        },
        QUESTION_IMAGE:function(files){
            var data = new FormData();
            data.append('file',files[0]);
            return axios.post('./image/image', data);
        }
    }
}
