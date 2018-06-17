export const friendlyDate = (dateStr) => {
  let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr)
  let time = dateObj.getTime()
  let now = Date.now()
  let space = now - time

  let str = ''
  if (space < 60000) {
    str = '刚刚'
  } else if (space < 1000*3600) {
    str = Math.floor(space/60000) + '分钟前'
  } else if (space < 1000*3600*24 ) {
    str = Math.floor(space/(1000*3600)) + '小时前'
  } else {
    str = Math.floor(space/(1000*3600*24)) + '天前'
  }
  return str
}
