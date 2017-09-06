// 深度复制
export function deepCopy (obj) {
  let newObj
  if (typeof obj !== 'object') {
    newObj = obj
  }
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    newObj = []
  } else if (Object.prototype.toString.call(obj) === '[object Object]') {
    newObj = {}
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
        newObj[key] = deepCopy(obj[key])
      } else if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
        newObj[key] = deepCopy(obj[key])
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  return newObj
}
