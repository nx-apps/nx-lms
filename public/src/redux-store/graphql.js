import { create } from 'axios'
import { baseURL } from './config'

const axios = create({
    baseURL: baseURL + '/api',
    headers: { 'Content-Type': 'application/graphql' }
});

export function graphql(query) {
    return new Promise(function(resolve,reject){
        axios.post('graphql', query).then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err);
        })
    })
}