import {request} from './request'
//为什么要用大括号导出  是因为没有用default导出
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
