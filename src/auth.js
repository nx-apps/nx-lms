import axios from './axios'
import {baseURL} from './config'

export function handleAuth(store){
    var path = window.location.pathname.split("/");
 
        if(localStorage.getItem("token")){
            axios.post('/auth/checkToken',{token:localStorage.getItem("token")})
            .then(res=>{
                store.dispatch({type:'AUTH_SET_USER',payload:res.data})
            })
            .catch(err=>{
                localStorage.removeItem("token");
            })
        }

}