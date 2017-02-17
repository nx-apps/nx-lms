import axios from '../axios'
import {commonAction} from '../config'

const initialState = {
    dataList:[]
}

export function moduleReducer(state = initialState,action){

    switch (action.type) {
        case 'MODULE_LIST':
            return Object.assign({},state,{dataList:action.payload});
        default:
            return state
    }

}

export function moduleAction(store){
    return [commonAction(),
        {
            MODULE_LIST:function(){
                console.log('ddd');
                axios.get('/tag/tag').then(res=>{
                    store.dispatch({type:"MODULE_LIST",payload:res.data})
                }).catch(err=>{
                    cosole.log(err);
                })
            },
            MODULE_INSERT:function(data){
                axios.post('/tag/tag',data).then(res=>{
                    this.MODULE_LIST();
                }).catch(err=>{
                    cosole.log(err);
                })
            },
            MODULE_UPDATE:function(data){
                axios.put('/tag/tag',data).then(res=>{
                    this.MODULE_LIST();
                }).catch(err=>{
                    cosole.log(err);
                })
            },
            MODULE_DELETE:function(id){
                axios.delete('/tag/tag',{params:{id}}).then(res=>{
                    this.MODULE_LIST();
                }).catch(err=>{
                    cosole.log(err);
                })
            },
        }
    ]
}
