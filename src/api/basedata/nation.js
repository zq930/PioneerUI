import request from '@/utils/request'

// 查询民族列表
export function listNation(query) {
  return request({
    url: '/basedata/nation/list',
    method: 'get',
    params: query
  })
}

// 查询民族详细
export function getNation(nationId) {
  return request({
    url: '/basedata/nation/' + nationId,
    method: 'get'
  })
}

// 新增民族
export function addNation(data) {
  return request({
    url: '/basedata/nation',
    method: 'post',
    data: data
  })
}

// 修改民族
export function updateNation(data) {
  return request({
    url: '/basedata/nation',
    method: 'put',
    data: data
  })
}

// 删除民族
export function delNation(nationId) {
  return request({
    url: '/basedata/nation/' + nationId,
    method: 'delete'
  })
}
