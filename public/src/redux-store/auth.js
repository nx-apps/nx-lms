import axios from './axios'
import {baseURL} from './config'

export function handleAuth(){
    var path = window.location.pathname.split("/");
    if(path[1]==="login"){
        console.log('ok')
        
    }else{
        if(localStorage.getItem("token")){
            axios.post('/auth/checkToken',{token:localStorage.getItem("token")})
            .then(res=>{
                ReduxBehavior.dispatch({type:'AUTH_SET_USER',payload:res.data})
            })
            .catch(err=>{
                localStorage.removeItem("token");
                window.location = baseURL+'/login';
            })
        }else{
            console.log('fail')
            window.location = baseURL+'/login';
        }
    }
}