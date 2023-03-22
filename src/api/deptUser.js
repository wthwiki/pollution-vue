import request from '../utils/request';

export function login(data){
    return request({
        url: '/do/login',
        method: 'post',
        data: data
    })
}

export function getInfo(){
    return request({
        url: '/deptUser/getInfo',
        method: 'get',
    })
}

export function logout(){
    return request({
        url: '/do/logout',
        method: 'get',
    })
}