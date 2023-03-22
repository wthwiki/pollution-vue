import request from '../utils/request';

//获得企业列表
export function listDeptTarget(data){
    return request({
        url: '/get/data/page',
        method: 'get',
        params: data
    })
}

// //修改用户
// export function updata(data){
//     return request({
//         url: '/deptTarget',
//         method: 'put',
//         data: data
//     })
// }

//删除用户
export function deleteDeptTarget(id){
    return request({
        url: '/delete/data/by/data/'+id,
        method: 'delete',
    })
}