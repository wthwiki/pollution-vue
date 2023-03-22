//定义user模块的属性
import { login , logout , getInfo } from '@/api/deptUser.js'
import cookie from 'js-cookie';
import storage from '@/utils/storage.js'
const deptUser = {
    state: {
        //保存数据
        userId: '',
        username: '',
        // nickName: '',
        token: '',
        roles: [],
        permissions: []
    },
    getters: {
        ISLOGIN(state) {
            return state.username !== '' && state.token !== '';
        },
        permissions(state) {
            return state.permissions;
        },
        roles(state) {
            return state.roles;
        }
    },
    mutations: {
        //改变数据
        SAVE_USERNAME(state, username) {
            state.username = username;
        },
        SAVE_NICKNAME(state, nickName) {
            state.nickName = nickName;
        },
        SAVE_USERID(state, userId) {
            state.userId = userId;
        },
        SAVE_TOKEN(state, token) {
            state.token = token;
        },
        SAVE_ROLES(state, roles) {
            state.roles = roles;
        },
        SAVE_PERMISSIONS(state, permissions) {
            state.permissions = permissions;
        },
    },
    actions: {
        LOGIN({ commit }, deptUser) {
            return new Promise(function (resolve) {
                login(deptUser).then(res => { 
                    //需要将获取的数据，保存起来
                    console.log(res)
                    console.log(res.data.data.token)
                    commit("SAVE_USERNAME", res.data.data.username);
                    // commit("SAVE_NICKNAME", res.data.deptUser.nickName);
                    // commit("SAVE_ADMINID", res.data.data.adminId);
                    commit("SAVE_USERNAME", res.data.data.username);
                    commit("SAVE_USERID", res.data.data.userId);
                    storage.saveSessionObject("loginUser", res.data.data);
                    cookie.set("userId",res.data.data.userId);
                    cookie.set("token",res.data.data.token);
                    
                    // localStorage.setItem("ms_username", res.data.deptUser.username);
                    resolve(res);
                })
            })
        },
        LOGOUT({ commit }) {
            return new Promise(function (resolve) {
                logout().then(res => {
                    //需要将获取的数据，保存起来
                    commit("SAVE_DEPTNAME", "");
                    storage.remove("deptName");
                    commit("SAVE_NICKNAME", "");
                    storage.remove("nickName");
                    commit("SAVE_TOKEN", "");
                    storage.remove("token")
                    storage.remove("loginUser");
                    resolve(res);
                })
            })
        },
        RECOVERY_USER({ commit }) {
            //从storage中获取数据
            let loginUser = storage.getSessionObject("loginUser");
            if (loginUser) {
                commit("SAVE_USERNAME", loginUser.username);
                // commit("SAVE_NICKNAME", loginUser.deptUser.nickName);
                commit("SAVE_TOKEN", loginUser.token);
            }
        },
        GET_INFO({ commit }) {
            return new Promise(resolve => {
                console.log(resolve)
                getInfo().then(res => {
                    console.log(res)
                    //需要将获取的数据，保存起来
                    // commit("SAVE_ROLES", res.data.roles);
                    // console.log(res.data)
                    commit("SAVE_PERMISSIONS", res.data.data.perms);
                    resolve();
                })
            })
        }
    }
}
//把deptUser导出去
export default deptUser