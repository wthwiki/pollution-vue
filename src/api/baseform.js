import request from '../utils/request';

export function insertDeptTarget(data){
    return request({
        url: '/save/form/data',
        method: 'post',
        data: data,
    })
}