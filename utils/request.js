import { BASE_URL } from './ipConfig'
import { HTTP_STATUS } from './status'
import COMMON_PARAMETER from './commonParameter'
import { CacheManager } from './index'

function request (method, content) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL,
      data: {
        ...COMMON_PARAMETER,
        method,
        userId: CacheManager.get('uid') || '',
        content: JSON.stringify(content),
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          console.error('api', '请求资源不存在')
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          console.error('api', '服务端出现了问题')
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          console.error('api', '没有权限访问')
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          if (res.data.status !== '1') {
            // let pages = uni.getCurrentPages()
            // let currentPage = pages[pages.length - 1]
            // let url = currentPage.route
            // if (url !== 'pages/user/login' && ['AD0000000015', 'AD0000000013'].indexOf(res.data.code) !== -1) {
            //   CacheManager.clear()
            //   setTimeout(() => {
            //     uni.showToast({
            //       title: '该账号已注销',
            //       icon: 'none',
            //     })
            //     setTimeout(() => {
            //       uni.hideToast();
            //       uni.reLaunch({
            //         url: '/pages/user/login'
            //       })
            //     }, 2000)
            //   }, 0)
            // } else {
            //   uni.showToast({
            //     title: res.data.message,
            //     icon: 'none'
            //   })
            // }
			uni.showToast({
			  title: res.data.message,
			  icon: 'none'
			})
          }
          resolve(res.data)
        }
      },
      fail (res) {
        console.error('fail', res)
        uni.showToast({
          title: '服务器异常',
          icon: 'none'
        })
        reject(res)
      }
    })
  });
}

export default request
