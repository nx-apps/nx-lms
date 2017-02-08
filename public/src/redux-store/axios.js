import {create} from 'axios'

export default create({
    baseURL:`http://${window.location.hostname}:${location.port}/api`
});