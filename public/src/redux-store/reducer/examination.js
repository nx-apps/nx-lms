import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
    dataList:[],
    listTag:[],
    dataTest:[],
    dataSelect:[],
    examinationRandomList:[]
}

export function examinationReducer(state = initialState,action){

    switch (action.type) {
        case 'EXAMINATION_GET_LIST':
            return Object.assign({},state,{dataList:action.payload});
        case 'EXAMINATION_GET_TAG_LIST':
            return Object.assign({},state,{listTag:action.payload});
        case 'EXAMINATION_GET_DATA_TEST':
            return Object.assign({},state,{dataTest:action.payload});
        case 'EXAMINATION_GET_DATA_SELECT' : 
            return Object.assign({},state,{dataSelect:action.payload});
        case 'EXAMINATION_RANDOM':
            return Object.assign({},state,{examinationRandomList:action.payload});
        case 'EXAMINATION_CLEAR_LIST':
            return Object.assign({},state,{dataList:[]});
        default:
            return state
    }

}

export function examinationAction(store){
    return [commonAction(),{
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
        EXAMINATION_GET_DATA_SELECT:function(id){
            this.fire('toast',{status:'load'});
            axios.get('./examination/examination_only?id='+id)
            .then((response)=>{
                response.data.objective.map((item)=>{
                    item.sub_module = item.sub_module.map((item2)=>{
                        return {id:item2}
                    })
                    return item
                })
                this.fire('toast',{status:'success',
                  callback:()=>{
                        this.fire('select-data');
                       store.dispatch({type:'EXAMINATION_GET_DATA_SELECT',payload:response.data})
                  }
                 });
                // console.log(response.data);
               
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
                    callback:()=>{
                        this.fire('close');
                    }
                });
            })
            .catch((error)=>{
                console.log(error);
            })
        },
        EXAMINATION_CLEAR_LIST:function(){
             store.dispatch({type:'EXAMINATION_CLEAR_LIST'});
        },
        EXAMINATION_RANDOM:function(data){
            // console.log(JSON.stringify(data));
            // console.log(data);
            axios.post('./examination/examination_random',data)
            .then((response)=>{
               
                store.dispatch({type:'EXAMINATION_RANDOM',payload:response.data});
            })
            .catch((error)=>{
                console.log('error');
                console.log(error);
            });
            // return axios.post('./examination/examination_random',data)
        },
        EXAMINATION_INSERT:function(data){
            data.user_id = store.getState().auth.user.id;
            // console.log(data);
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
            
        },
        EXAMINATION_UPDATE:function(data){
            data.user_id = store.getState().auth.user.id;
            console.log(data);
            axios.put('./examination/examination',data)
            .then((response)=>{
               this.EXAMINATION_GET_LIST(this.tags);
            })
            .catch((error)=>{
                console.log('error');
                console.log(error);
            });
        },
        EXAMINATION_DELETE:function(id){
            axios.delete('./examination/examination?id='+id)
            .then((response)=>{
                this.EXAMINATION_GET_LIST(this.tags);
                // this.fire('delete-data');
            })
            .catch((error)=>{
                console.log('error');
                console.log(error);
            });
        }
        
    }]
}
