import request from '@/utils/request'

// 查询地区列表
export function listArea(query) {
  return request({
    url: '/basedata/area/list',
    method: 'get',
    params: query
  })
}

// 树形数据
export function treeListArea(query) {
  return request({
    url: '/basedata/area/treeList',
    method: 'get',
    params: query
  })
}

// 查询地区详细
export function getArea(id) {
  return request({
    url: '/basedata/area/' + id,
    method: 'get'
  })
}

// 新增地区
export function addArea(data) {
  return request({
    url: '/basedata/area',
    method: 'post',
    data: data
  })
}

// 修改地区
export function updateArea(data) {
  return request({
    url: '/basedata/area',
    method: 'put',
    data: data
  })
}

// 删除地区
export function delArea(id) {
  return request({
    url: '/basedata/area/' + id,
    method: 'delete'
  })
}
