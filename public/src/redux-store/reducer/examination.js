import axios from '../axios'

const initialState = {
    dataList:[],
    listTag:[],
    dataTest:[],
}

export function examinationReducer(state = initialState,action){

    switch (action.type) {
        case 'EXAMINATION_GET_LIST':
            return Object.assign({},state,{dataList:action.payload});
        case 'EXAMINATION_GET_TAG_LIST':
            return Object.assign({},state,{listTag:action.payload});
        case 'EXAMINATION_GET_DATA_TEST':
            return Object.assign({},state,{dataTest:action.payload});
        default:
            return state
    }

}

export function examinationAction(store){
    return {
        EXAMINATION_GET_DATA_TEST:function(id){
            axios.get('./test_exam/test_exam?id='+id)
            .then((response)=>{
                console.log('success!!');
                console.log(response.data)
                store.dispatch({type:'EXAMINATION_GET_DATA_TEST',payload:response.data})
            })
            .catch((error)=>{
                console.log('error');
                console.log(error);
            });
        },
        // EXAMINATION_GET_TAG_LIST:function(){
        //     axios.get('./examination/examination_tagall')
        //     .then((response)=>{
        //         console.log('success!!');
        //         store.dispatch({type:'EXAMINATION_GET_TAG_LIST',payload:response.data})
        //         console.log(response.data);
        //     })
        //     .catch((error)=>{
        //         console.log('error');
        //         console.log(error);
        //     });
        // },
        EXAMINATION_GET_LIST:function(tags){
            this.tags = tags;
            this.fire('toast',{status:'load'});
            axios.get('./examination/examination?module='+tags)
            .then((response)=>{
                console.log(response.data);
                store.dispatch({type:'EXAMINATION_GET_LIST',payload:response.data});
                this.fire('toast',{status:'success',
                    callback:function(){
                        
                    }
                });
            })
            .catch((error)=>{
                console.log(error);
            })
        },
        EXAMINATION_SELECT:function(id){
            return new Promise((resolve,reject)=>{
                axios.get('./examination/examination_only?id='+id)
                .then((response)=>{
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
            axios.post('./examination/examination',data)
            .then((response)=>{
                // console.log('success!!');
                this.EXAMINATION_GET_LIST(this.tags);
                // console.log(response.data);
            })
            .catch((error)=>{
                console.log('error');
                console.log(error);
            });
            // return new Promise((resolve,reject)=>{
            //     axios.post('./examination/examination',data)
            //     .then((response)=>{
            //         this.EXAMINATION_GET_LIST(this.tags);
            //         resolve(response);
            //     })
            //     .catch((error)=>{
            //         reject(error);
            //     });

            // })
            
        },
        EXAMINATION_UPDATE:function(data){
            return new Promise((resolve,reject)=>{
                axios.put('./examination/examination',data)
                .then((response)=>{
                    this.EXAMINATION_GET_LIST(this.tags);
                    resolve(response);
                })
                .catch((error)=>{
                    reject(error);
                });

            })
            
        },
        EXAMINATION_DELETE:function(id){
            return new Promise((resolve,reject)=>{
                axios.delete('./examination/examination?id='+id)
                .then((response)=>{
                    this.EXAMINATION_GET_LIST(this.tags);
                    resolve(response);
                })
                .catch((error)=>{
                    reject(error);
                });

            })
            
        }
        
    }
}
