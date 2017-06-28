import Moment from 'moment'

export const getDay = (time) => {
  const date = Moment(time)
  return date.date()
}

export const getYYMM = (time) => {
  const date = Moment(time)
  return date.year() + '年' + (date.month() + 1) + '月'
}

export const getHHMM = (time) => {
  const date = Moment(time)
  return date.hour() + ':' + date.minute()
}
export const getDate = (time) => {
  const date = Moment(time).day()
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

