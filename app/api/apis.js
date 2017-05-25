
const baseUrlWithoutToken = (path) => 'http://101.95.97.178:2003' + path
const accept = 'application/com.droi.qy-v1.0-1+json'
const userAgent = 'zy'
const authorization = 'param=/ZTE/ZTE1.1/460022402238613/null/10.0.10.243/17695/02:00:00:00:00:00/com.droi.qy/720/1280/null/a9a392bb28f550366c1c55f59b35aac0f94ff1eb'
const contentType = 'application/json;charset=UTF-8'
// 登录
export function login (methodType, path, map) {
  return fetch(baseUrlWithoutToken(path), {
    method: methodType,
    credentials: 'include',
    headers: {
      'Accept': accept,
      'User-Agent': userAgent,
      'Content-Type': contentType,
      'Authorization': authorization
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
