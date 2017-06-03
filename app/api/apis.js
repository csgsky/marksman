
const baseUrlWithoutToken = (path) => 'http://101.95.97.178:2003' + path
const accept = 'application/com.droi.qy-v1.0-1+json'
const userAgent = 'zy'
const authorization = 'param=/ZTE/ZTE1.1/460022402238613/null/10.0.10.243/17695/02:00:00:00:00:00/com.droi.qy/720/1280/null/'
const contentType = 'application/json;charset=UTF-8'
// post 提交
export function postApi (path, map) {
  return fetch(baseUrlWithoutToken(path), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': accept,
      'User-Agent': userAgent,
      'Content-Type': contentType,
      'Authorization': authorization + authorization
    },
    body: JSON.stringify(map)
  }).then((response) => {
    if (response.ok) {
      console.log('ok')
    } else {
      console.log('error')
    }
    return response.json()
  }).then((responseJson) => {
    return responseJson
  }).catch((error) => {
    return error
  })
}
// get 请求
export function getApi (path, userId) {
  return fetch(baseUrlWithoutToken(path), {
    method: 'GET',
    headers: {
      'Accept': accept,
      'User-Agent': userAgent,
      'Content-Type': contentType,
      'Authorization': authorization + userId
    }
  }).then((response) => {
    if (response.ok) {
      console.log('GET ok')
    } else {
      console.log('GET error')
    }
    return response.json()
  }).then((responseJson) => {
    console.warn('responseJson ==> ' + responseJson.return_msg)
    return responseJson
  }).catch((error) => {
    return error
  })
}

// 首页日记
export const MineDiaryApi = (userId) =>
  getApi('/api/diary?p=0&rn=10&ordertype=1&status=1', userId)

// 足迹、热门
export const FooterRecentDiaryApi = (userId) =>
  getApi('/api/diary?p=0&rn=10&ordertype=0&status=1&private=1', userId)

// 足迹、最新
export const FooterHotDiaryApi = (userId) =>
  getApi('/api/diary?p=0&rn=10&ordertype=0&status=1&private=1', userId)

