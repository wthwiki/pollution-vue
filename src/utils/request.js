import axios from 'axios';
import store from '@/store'


const request = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    headers: {'Content-Type':'application/json;charset=UTF-8'},
    baseURL: 'http://localhost:80/',
    timeout: 4000
});

request.interceptors.request.use(
    config => {
        if(store.state.deptUser.token){
            //'Bearer '
            config.headers['Authorization'] = store.state.deptUser.token // 让每个请求携带自定义token 请根据实际情况自行修改
            config.headers['deptName'] = store.state.deptUser.deptName // 让每个请求携带自定义token 请根据实际情况自行修改
          }
          
        // 在发送请求之前做些什么
        return config;
    },
    error => {
        console.log(error);
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// request.interceptors.response.use(
//     response => {
//         if (response.status === 200) {
//             return response.data;
//         } else {
//             Promise.reject();
//         }
//     },
//     error => {
//         console.log(error);
//         return Promise.reject(error);
//     }
// );

export default request;
