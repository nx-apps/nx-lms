import axios from '../axios'
import { commonAction } from '../config'

const initialState = {
    module: [],
    module2: [],
    subModule: [],
    difficultyIndex: [
        {
            id: 1,
            label: 'ง่าย'
        },
        {
            id: 2,
            label: 'ปานกลาง'
        },
        {
            id: 3,
            label: 'ยาก'
        }
    ]
}

export function commonSystemReducer(state = initialState, action) {
    switch (action.type) {
        case 'COMMON_MODULE':
            return Object.assign({}, state, { module: action.payload });
        case 'COMMON_MODULE2':
            return Object.assign({}, state, { module2: action.payload });
        case 'COMMON_SUB_MODULE':
            return Object.assign({}, state, { subModule: action.payload });
        default:
            return state;
    }
}

export function commonSystemAction(store) {
    return [
        commonAction(), {
            COMMON_MODULE: function (getall = false, allModule = false) {
                // var user = store.getState().auth.user;
                return new Promise((resolve, reject) => {
                    axios.get('/common/module/', {
                        params: { getall, allModule }
                    })
                        .then(res => {
                            store.dispatch({ type: 'COMMON_MODULE', payload: res.data })
                            console.log('sssss');
                            resolve();
                        })
                        .catch(err => {
                            console.log(err);
                            reject();
                        })
                })

            },
             COMMON_MODULE2: function (getall = false, allModule = false) {
                // var user = store.getState().auth.user;
                return new Promise((resolve, reject) => {
                    axios.get('/common/module2/', {
                        params: { getall, allModule }
                    })
                        .then(res => {
                            store.dispatch({ type: 'COMMON_MODULE2', payload: res.data })
                            console.log('sssss');
                            resolve();
                        })
                        .catch(err => {
                            console.log(err);
                            reject();
                        })
                })

            },
            COMMON_SUB_MODULE: function (module) {
                axios.get('./question/sub_module?module=' + module)
                    .then((response) => {

                        var tag = response.data;
                        tag = tag.map((item) => {
                            return { id: item }
                        });
                        response.data = tag;
                        //  console.log('sub',response.data);
                        store.dispatch({ type: 'COMMON_SUB_MODULE', payload: response.data });
                    })
                    .catch((error) => {
                        console.log('error');
                        console.log(error);
                    });
            },
        }
    ]
}