import axios from './axios'
import {baseURL} from './config'
import Cookies from 'js-cookie'



export function handleAuth(store){
    var path = window.location.pathname.split("/");
 
       //if(_getCookie("token")){
            axios.post('/auth/checkToken')
            .then(res=>{
                store.dispatch({type:'AUTH_SET_USER',payload:res.data})
            })
            .catch(err=>{
               Cookies.remove("token");
            })
       // }

}