/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/15
 * Description: 文件描述
 */
import Vue from 'vue'

// 按钮权限
Vue.directive('roleBtn', {
  bind: function (el, binding) {
    let roleArr = binding.value
    let arr = []
    //  console.log(roleArr[0])
    let userRole = JSON.parse(sessionStorage.user).data.userMenu
    //  console.log(userRole)
    userRole.reduce((a, b) => {
      if (b.children && b.children.length > 0) {
        b.children.filter(k => {
          if (k.path === roleArr[0]) {
            arr.push(k)
          }
        })
      } else {
        if (b.path === roleArr[0]) {
          arr.push(b)
        }
      }
    })
        
    if (!arr[0].meta.handleAuth[roleArr[1]]) {
      el.parentNode.removeChild(el)
    }
  }
})
export default Vue
