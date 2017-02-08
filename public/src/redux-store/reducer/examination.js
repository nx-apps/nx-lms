import axios from '../axios'

const initialState = {
    dataList:[]
}

export function examinationReducer(state = initialState,action){

    switch (action.type) {
        case 'EXAMINATION_GET_LIST':
            return Object.assign({},state,{dataList:action.payload});
        default:
            return state
    }

}

export function examinationAction(store){
    return {
        EXAMINATION_GET_LIST:function(){
            axios.get('./examination/examination')
            .then((response)=>{
                store.dispatch({type:'EXAMINATION_GET_LIST',payload:response.data});
            })
            .catch((error)=>{
                console.log(error);
            })
        },
        EXAMINATION_INSERT:function(data){
            // return new Promise((resolve,reject)=>{
            //     axios.post('./question/question',data)
            //     .then((response)=>{
            //         this.QUESTION_GET_LIST();
            //         resolve(response);
            //     })
            //     .catch((error)=>{
            //         reject(error);
            //     });

            // })
            
        },
        EXAMINATION_UPDATE:function(data){
            // return new Promise((resolve,reject)=>{
            //     axios.put('./question/question',data)
            //     .then((response)=>{
            //         this.QUESTION_GET_LIST();
            //         resolve(response);
            //     })
            //     .catch((error)=>{
            //         reject(error);
            //     });

            // })
            
        },
        EXAMINATION_DELETE:function(questionId){
            // return new Promise((resolve,reject)=>{
            //     axios.delete('./question/question?id='+questionId)
            //     .then((response)=>{
            //         this.QUESTION_GET_LIST();
            //         resolve(response);
            //     })
            //     .catch((error)=>{
            //         reject(error);
            //     });

            // })
            
        },
        EXAMINATION_SELECT:function(questionId){
            // return new Promise((resolve,reject)=>{
            //     axios.get('./question/question_only?id='+questionId)
            //     .then((response)=>{
            //         var choice = response.data.choice.map((row,i)=>{
            //             if(i===response.data.answer){
            //                 return {checked:true,choice:row};
            //             }else{
            //                 return {checked:false,choice:row};
            //             }
            //         });
            //         response.data.choice = choice;
            //         resolve(response);
            //     })
            //     .catch((error)=>{
            //         reject(error);
            //     });
            // });
        }
    }
}
