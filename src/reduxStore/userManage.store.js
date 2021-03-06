import axios from '../axios'
import { commonAction } from '../config'


const initialState = {
    dataList: [],
    dataSelect: {
        key_tags: [],
        end_tags: []
    },
    currentUser: {}
}

export function userManageReducer(state = initialState, action) {
    switch (action.type) {
        case 'USER_MANAGE_GET_LIST':
            return Object.assign({}, state, { dataList: action.payload });
        case 'USER_MANAGE_CLEAR_GET_LIST':
            return Object.assign({}, state, { dataList: [] });
        case 'USER_MANAGE_CLEAR_LIST':
            return Object.assign({}, state, { dataSelect: { admin: false, key_tags: [], end_tags: [] } });
        case 'USER_MANAGE_SELECT_LIST':
            return Object.assign({}, state, { dataSelect: action.payload });
        case 'USER_MANAGE_CURRENT':
            return Object.assign({}, state, { currentUser: action.payload });
        case 'USER_MANAGE_SELECT_CLEAR_LIST':
            return Object.assign({}, state, {
                dataSelect: {
                    key_tags: [],
                    end_tags: []
                }
            });
        default:
            return state;
    }
}

export function userManageAction(store) {
    return [commonAction(),
    {
        USER_MANAGE_GET_LIST: function (tag) {
            this.USER_MANAGE_SELECT_CLEAR_LIST();
            this.newTag = tag;
            this.fire('toast', { status: 'load' });
            axios.get('./user/user?tags=' + tag)
                .then((response) => {
                    console.log(response.data);
                    this.fire('toast', {
                        status: 'success',
                        callback: () => {
                            this.fire('close');
                        }
                    });
                    store.dispatch({ type: 'USER_MANAGE_GET_LIST', payload: response.data });
                })
                .catch((error) => {
                    console.log('error');
                    console.log(error);
                });
        },
        USER_MANAGE_CLEAR_GET_LIST: function () {
            store.dispatch({ type: 'USER_MANAGE_CLEAR_GET_LIST' });
        },

        USER_MANAGE_GET_CURRENT: function () {
            axios.get('./user/current')
                .then((response) => {
                    response.data.end_tags = response.data.end_tags.map((item) => {
                        return { id: item }
                    })

                    store.dispatch({ type: 'USER_MANAGE_CURRENT', payload: response.data });
                })
                .catch((error) => {
                    console.log('error');
                    console.log(error);
                });
        },

        USER_MANAGE_SELECT_LIST: function (id) {
            axios.get('./user/select_user?id=' + id)
                .then((response) => {
                    this.USER_MANAGE_CLEAR_LIST();
                    console.log(response.data);
                    response.data.end_tags = response.data.end_tags.map((item) => {
                        return { id: item }
                    })
                    response.data.key_tags = response.data.key_tags.map((item) => {
                        return { id: item }
                    })
                    store.dispatch({ type: 'USER_MANAGE_SELECT_LIST', payload: response.data });
                })
                .catch((error) => {
                    console.log('error');
                    console.log(error);
                });
        },
        USER_MANAGE_INSERT: function (data) {
            // this.fire('toast',{status:'load'});
            axios.post('./user/user', data)
                .then((response) => {
                    // this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                    //   callback:()=>{
                    //       console.log(response.data);

                    //   }
                    //  });
                    this.USER_MANAGE_GET_LIST(this.newTag);

                })
                .catch((error) => {
                    console.log('error');
                    console.log({ error });
                    console.log("*", error.response.data.error);
                    if (error.response.data.error == "Duplicate Email") {
                        this.fire('toast', {
                            status: 'connectError', text: 'Email นี้มีอยู่ในระบบแล้ว กรุณากรอก Email ใหม่',
                            callback: function () {
                            }
                        })
                    }
                });
        },

         USER_MANAGE_REGISTER: function (data) {
              // this.fire('toast',{status:'load'});
              this.fire('toast',{status:'load'});
              axios.post('./user/register', data)
                  .then((response) => {
                      this.USER_MANAGE_SELECT_CLEAR_LIST();
                       this.fire('toast',{status:'connectError',text:response.data.ok,
                         callback:()=>{
                            // console.log(response.data);
                            window.location="/erp/login";
  
                         }
                      });
                      
  
                  })
                  .catch((error) => {
                      console.log('error');
                      console.log({ error });
                      console.log("*", error.response.data.error);
                     // if (error.response.data.error == "Duplicate Email") {
                          this.fire('toast', {
                              status: 'connectError', text: error.response.data.error,
                              callback: function () {
                              }
                          })
                     // }
                  });
          },

        USER_MANAGE_UPDATE_PROFILE: function (data) {
            //this.fire('toast',{status:'load'});
            axios.put('./user/user', data)
                .then((response) => {
                    this.fire('toast', {
                        status: 'success',
                        text: 'บันทึกข้อมูลเรียบร้อย',
                        callback: () => {
                            this.fire('close');
                        }
                    });
                    this.USER_MANAGE_GET_CURRENT();
                }).catch((error) => {
                    console.log('error');
                    console.log({ error });
                    console.log("*", error.response.data.error);
                    if (error.response.data.error) {
                        this.fire('toast', {
                            status: 'connectError', text: error.response.data.error,
                            callback: function () {
                            }
                        })
                    }
                });
        },

        USER_MANAGE_UPDATE: function (data) {
            // this.fire('toast',{status:'load'});
            axios.put('./user/user', data)
                .then((response) => {
                    // this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                    //   callback:()=>{

                    //   }
                    //  });
                    this.USER_MANAGE_GET_LIST(this.newTag);
                })
                .catch((error) => {
                    console.log('error');
                    console.log({ error });
                    if (error.response.data.error == "Duplicate Email") {
                        this.fire('toast', {
                            status: 'connectError', text: 'Email นี้มีอยู่ในระบบแล้ว กรุณากรอก Email ใหม่',
                            callback: function () {
                            }
                        })
                    }
                });
        },
        USER_MANAGE_DELETE: function (id) {
            // this.fire('toast',{status:'load'});
            axios.delete('./user/user?id=' + id)
                .then((response) => {
                    // this.fire('toast',{status:'success',text:'บันทึกสำเร็จ',
                    //   callback:()=>{

                    //   }
                    //  });
                    this.USER_MANAGE_GET_LIST(this.newTag);
                })
                .catch((error) => {
                    this.fire('toast', {
                        status: 'connectError', text: error.response.data.error,
                        callback: function () { }
                    })
                });
        },
        USER_MANAGE_CLEAR_LIST: function () {
            store.dispatch({ type: 'USER_MANAGE_CLEAR_LIST', payload: {} });
        },
        USER_MANAGE_SELECT_CLEAR_LIST: function () {
            store.dispatch({ type: 'USER_MANAGE_SELECT_CLEAR_LIST', payload: {} });
        }
    }
    ]
}