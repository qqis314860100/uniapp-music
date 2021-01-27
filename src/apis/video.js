import Req from '../utils/request/index';

// 获取标签栏数据
export function apiGetNavList(data) {
  return Req.request({
    url: '/videomock',
    method: 'GET',
    data,
    authType: 'None',
  });
}
