import request from '../utils/request';

//获得企业列表
export function countAccess(data){
    return request({
        url: '/get/count/by/start/to/end/and/status',
        method: 'get',
        params: data
    })
}

export function countWarning(data){
    return request({
        url: '/get/count/by/start/to/end/and/status',
        method: 'get',
        params: data
    })
}

export function countDanger(data){
    return request({
        url: '/get/count/by/start/to/end/and/status',
        method: 'get',
        params: data
    })
}

export function ccount(data){
    return request({
        url: '/get/data/status/count/by/start/to/end/count',
        method: 'get',
        params: data
    })
}

export function getDeptTargetInformation(data){
    return request({
        url: '/get/datas/by/status/and/start/to/end',
        method: 'get',
        params: data
    })
}

//修改用户
export function updata(data){
    return request({
        url: '/ydlUser',
        method: 'put',
        data: data
    })
}

//删除用户
export function deleteDept(userId){
    return request({
        url: '/ydlUser/'+userId,
        method: 'delete',
    })
}