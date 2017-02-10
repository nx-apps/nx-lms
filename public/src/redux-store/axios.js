import {create} from 'axios'

export default create({
    baseURL:`https://${window.location.hostname}:${location.port}/api`
});