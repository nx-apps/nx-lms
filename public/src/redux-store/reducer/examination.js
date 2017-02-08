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
        EXAMINATION_SELECT:function(id){
            return new Promise((resolve,reject)=>{
                axios.get('./examination/examination_only?id='+id)
                .then((response)=>{
                    console.log(response);
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
        EXAMINATION_RANDOM:function(data){
            return axios.post('./examination/examination_random',data)
        },
        EXAMINATION_INSERT:function(data){
            return new Promise((resolve,reject)=>{
                axios.post('./examination/examination',data)
                .then((response)=>{
                    this.EXAMINATION_GET_LIST();
                    resolve(response);
                })
                .catch((error)=>{
                    reject(error);
                });

            })
            
        },
        EXAMINATION_UPDATE:function(data){
            return new Promise((resolve,reject)=>{
                axios.put('./examination/examination',data)
                .then((response)=>{
                    this.QUESTION_GET_LIST();
                    resolve(response);
                })
                .catch((error)=>{
                    reject(error);
                });

            })
            
        },
        EXAMINATION_DELETE:function(id){
            return new Promise((resolve,reject)=>{
                axios.delete('./delete/delete?id='+id)
                .then((response)=>{
                    this.QUESTION_GET_LIST();
                    resolve(response);
                })
                .catch((error)=>{
                    reject(error);
                });

            })
            
        }
        
    }
}
