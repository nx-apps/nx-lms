import axios from '../axios'
import { commonAction } from '../config'

const initialState = {
    dataList: [],
    dataSelect: {},
    subModuleList: []
}

export function questionReducer(state = initialState, action) {

    switch (action.type) {
        case 'QUESTION_GET_LIST':
            return Object.assign({}, state, { dataList: action.payload });
        case 'QUESTION_SELECT':
            return Object.assign({}, state, { dataSelect: action.payload });
        case 'QUESTION_CLEAR_SELECT':
            return Object.assign({}, state, { dataSelect: { choice: [] } });
        case 'QUESTION_CLEAR_LIST':
            return Object.assign({}, state, { dataList: [] });
        default:
            return state
    }

}

export function questionAction(store) {
    return [commonAction(),
    {
        QUESTION_GET_LIST: function (module) {
            this.newTag = module;
            this.fire('toast', { status: 'load' });
            var user_id = store.getState().auth.user.id;
            axios.get('./question/question', { params: { user_id, module } })
                .then((response) => {
                    console.log(response.data);
                    store.dispatch({ type: 'QUESTION_GET_LIST', payload: response.data });
                    this.fire('toast', {
                        status: 'success', text: 'โหลดข้อมูลสำเร็จ',
                        callback: () => {
                            this.fire('close');
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        QUESTION_INSERT: function (data) {
            data.user_id = store.getState().auth.user.id;
            console.log(JSON.stringify(data));
            axios.post('./question/question', data)
                .then((response) => {
                    console.log('success!!');
                    console.log(response.data);
                    this.QUESTION_GET_LIST(this.newTag)
                })
                .catch((error) => {
                    console.log('error');
                    console.log({ error });
                    console.log(JSON.stringify(error));
                    if (error.response.data.error == "ERROR CAN NOT INSERT") {
                        this.fire('toast', {
                            status: 'connectError', text: 'ข้อที่ ซ้ำ !!',
                            callback: function () {
                            }
                        })
                    }
                });

        },
        QUESTION_UPDATE: function (data) {
            data.user_id = store.getState().auth.user.id;
            axios.put('./question/question', data)
                .then((response) => {
                    this.QUESTION_GET_LIST(this.newTag)
                })
                .catch((error) => {
                    console.log('error');
                    console.log(error);
                });
            // return new Promise((resolve,reject)=>{
            //     axios.put('./question/question',data)
            //     .then((response)=>{
            //         this.QUESTION_GET_LIST(this.moduleSelect);
            //         resolve(response);
            //     })
            //     .catch((error)=>{
            //         reject(error);
            //     });

            // })

        },
        QUESTION_DELETE: function (questionId) {
            axios.delete('./question/question?id=' + questionId)
                .then((response) => {
                    this.QUESTION_GET_LIST(this.newTag);
                })
                .catch((error) => {
                     this.fire('toast',{status:'connectError',text:error.response.data.error,
                         callback:function(){}
                    })
                });

        },
        QUESTION_SELECT: function (questionId) {
            this.titleRight = 'แก้ไขคำถาม';
            this.status = 'update';

            this.fire('toast', { status: 'load' });
            this.QUESTION_CLEAR_SELECT();
            axios.get('./question/question_only?id=' + questionId)
                .then((response) => {
                    this.fire('toast', {
                        status: 'success',
                        callback: () => {
                            store.dispatch({ type: 'QUESTION_SELECT', payload: response.data });
                            this.$$('panel-right').open();
                        }
                    });


                })
                .catch((error) => {
                    console.log(error)
                });
        },
        QUESTION_CLEAR_SELECT: function () {
            store.dispatch({ type: 'QUESTION_CLEAR_SELECT' });
        },
        QUESTION_CLEAR_LIST: function () {
            store.dispatch({ type: 'QUESTION_CLEAR_LIST' });
        },
        QUESTION_IMAGE: function (files) {
            var data = new FormData();
            data.append('file', files[0]);
            return axios.post('./image/image', data);
        },
        QUESTION_UPLOAD: function (files) {
            var data = new FormData();
            data.append('file', files[0]);
            data.append('user_id', store.getState().auth.user.id);
            return axios.post('./question/upload', data);
        },
        QUESTION_UPLOAD_CONFIRM: function (datas) {
          //  var data = new FormData();
           // data.append('file', files[0]);
           // data.append('user_id', store.getState().auth.user.id);
            return axios.post('./question/confirm', datas);
        }

    }
    ]
}
