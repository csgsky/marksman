

const baseUrl = (path) => 'https://api.iranshao.com' + path + '?access_token='
const baseUrlWithoutToken = (path) => 'https://api.iranshao.com' + path
const accept = 'application/json'
const userAgent = 'iranshao/2.2.0 (android 7.1;Android SDK built for x86)'

// 登录
export function login (methodType, path, map) {
  return fetch(baseUrlWithoutToken(path), {
    method: methodType,
    headers: {
      'Accept': accept,
      'User-Agent': userAgent,
      'Content-Type': accept
    },
    body: JSON.stringify({
      account: map.account,
      password: map.password
    })
  }).then((response) => {
    console.log('api fetch')
    console.log(response)
    return response.json()
  }).then((responseJson) => {
    console.log('api fetch user slug: ' + responseJson.user_slug)
    return responseJson
  }).catch((error) => {
    return error
  })
}

export function articles (methodType, path, token) {
  console.log('url ==> ' + baseUrl(path) + token)
  return fetch(baseUrl(path) + token, {
    method: methodType,
    headers: {
      'Accept': accept,
      'User-Agent': userAgent,
      'Content-Type': accept
    }
  }).then((response) => {
    console.log('api fetch homePage')
    console.log(response)
    return response.json()
  })
  .then((responseJson) => {
    return responseJson
  })
  .catch((error) => {
    console.log('api fetch article error', error)
    return error
  })
}
