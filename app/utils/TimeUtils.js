
export const getDay = (time) => {
  let date = new Date(time)
  return date.getDate()
}

export const getYYMM = (time) => {
  let date = new Date(time)
  return date.getFullYear() + '年' + date.getMonth() + '月'
}

export const getDate = (time) => {
  let date = new Date(time).getDay()
  switch (date) {
    case 1:
      return '星期一'
    case 2:
      return '星期二'
    case 3:
      return '星期三'
    case 4:
      return '星期四'
    case 5:
      return '星期五'
    case 6:
      return '星期六'
    case 0:
      return '星期日'
    default:
      return '星期三'
  }
}

