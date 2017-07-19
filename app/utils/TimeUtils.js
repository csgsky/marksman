import Moment from 'moment'

export const getDay = (time) => {
  const date = Moment(time)
  return date.date()
}

export const getYYMM = (time) => {
  const date = Moment(time)
  return date.year() + '年' + (date.month() + 1) + '月'
}

export const getYYMMDD = (time) => {
  const date = Moment(time)
  return date.year() + '-' + (date.month() + 1) + '-' + date.date()
}

export const getMMDD = (time) => {
  const date = Moment(time)
  return (date.month() + 1) + '-' + date.date()
}

export const getYYMMDDC = (time) => {
  const date = Moment(time)
  return date.year() + '年' + (date.month() + 1) + '月' + date.date() + '日'
}

export const getDotYYMMDD = (time) => {
  const date = Moment(time)
  return date.year() + '.' + (date.month() + 1) + '.' + date.date()
}

export const getHHMM = (time) => {
  const date = Moment(time)
  return date.hour() + ':' + (date.minute() === 0 ? '00' : date.minute())
}

// 时间显示，一分以内为‘刚刚’，一小时以内为‘分钟前’，一天以内为‘小时前’，今年为‘月日’，往年为‘年月日’
export function recentTime (_time) {
  const today = new Date()
  const ONE_MINUTE = 60 * 1000
  const ONE_HOUR = ONE_MINUTE * 60
  const ONE_DAY = ONE_HOUR * 24
  const date = Moment(_time)
  const delta = today - date
  if (delta < ONE_MINUTE) {
    return '刚刚'
  }
  if (delta < ONE_HOUR) {
    return Math.floor(delta / ONE_MINUTE) + timeDesc.ONE_MINUTE_AGO
  }
  if (delta < ONE_DAY) {
    return Math.floor(delta / ONE_HOUR) + timeDesc.ONE_HOUR_AGO
  }
  return getYYMMDDC(_time)
}

const timeDesc = {
  JUST_NOW: '刚刚',
  ONE_MINUTE_AGO: '分钟前',
  ONE_HOUR_AGO: '小时前',
  ONE_DAY_AGO: '天前'
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

