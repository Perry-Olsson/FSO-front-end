const timeoutId = setTimeout(() => {
  console.log('hello')
}, 2000)

setTimeout(() => {clearTimeout(timeoutId)}, 1000)