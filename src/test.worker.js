
// console.log(self)


// console.log(componentConfig)

// 监听消息
// self.addEventListener('message', (event) => { 
//   console.log(event) 
// }, false)
onmessage = (event) => {
  console.log(event.data)
  // 向父线程发送数据
  postMessage({ foo: 'foo' })
}

function assignRouter (prev, next) {
  prev.reduce((a, b) => {
    if (b.children && b.children.length > 0) {
      if (b.component) {
        let squs = Object.keys(next).findIndex(v => { return b.component.indexOf(v) > -1 })
        let nums = Object.keys(Object.values(next)[squs]).findIndex(v => { return b.component.indexOf(v) > -1 })

        b.component = Object.values(next)[squs][Object.keys(Object.values(next)[squs])[nums]]
      }
      b.children.filter(k => {
        let index = Object.keys(next).findIndex(v => { return k.component.indexOf(v) > -1 })
        let idx = Object.keys(Object.values(next)[index]).findIndex(v => { return k.component.indexOf(v) > -1 })

        k.component = Object.values(next)[index][Object.keys(Object.values(next)[index])[idx]]
      })
    } else {
      if (b.component) {
        let squ = Object.keys(next).findIndex(v => { return b.component.indexOf(v) > -1 })
        let num = Object.keys(Object.values(next)[squ]).findIndex(v => { return b.component.indexOf(v) > -1 })
        b.component = Object.values(next)[squ][Object.keys(Object.values(next)[squ])[num]]
      }
    }
  }, [])
  self.postMessage(prev);
  return prev
}

//assignRouter()

//self.close();