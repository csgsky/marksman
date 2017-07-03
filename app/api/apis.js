
const baseUrlWithoutToken = path => 'http://101.95.97.178:2003' + path
const accept = 'application/com.droi.qy-v1.0-1+json'
const userAgent = 'zy'
const contentType = 'application/json;charset=UTF-8'
// post 提交
export function postApi (path, map, userId) {
  return fetch(baseUrlWithoutToken(path), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': accept,
      'User-Agent': userAgent,
      'Content-Type': contentType,
      'Authorization': userId
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
    console.warn('post responseJson ==> ' + responseJson.return_msg)
    return responseJson
  }).catch((error) => {
    return error
  })
}
// get 请求
export function getApi (path, userId) {
  console.warn('getApi path ==> ', path)
  return fetch(baseUrlWithoutToken(path), {
    method: 'GET',
    headers: {
      'Accept': accept,
      'User-Agent': userAgent,
      'Content-Type': contentType,
      'Authorization': userId
    }
  }).then((response) => {
    if (response.ok) {
      console.warn('GET ok')
    } else {
      console.warn('GET error')
    }
    return response.json()
  }).then((responseJson) => {
    console.warn('responseJson ==> ' + responseJson.return_msg)
    return responseJson
  }).catch((error) => {
    console.warn('getApi error ==> ' + error)
    return error
  })
}

// get 请求
export function deleteApi (path, userId, map) {
  return fetch(baseUrlWithoutToken(path), {
    method: 'DELETE',
    headers: {
      'Accept': accept,
      'User-Agent': userAgent,
      'Content-Type': contentType,
      'Authorization': userId
    },
    body: JSON.stringify(map)
  }).then((response) => {
    if (response.ok) {
      console.warn('DELETE ok')
    } else {
      console.warn('DELETE error')
    }
    return response.json()
  }).then((responseJson) => {
    console.warn('responseJson ==> ' + responseJson.return_msg)
    return responseJson
  }).catch((error) => {
    console.warn('deleteApi error ==> ' + error)
    return error
  })
}

// 首页日记
export const MineDiaryApi = (token, page, userId) => {
  if (userId !== null) {
    return getApi(`/api/diary?rn=6&ordertype=1&p=${page}&user_id=${userId}`, token)
  } else {
    return getApi(`/api/diary?rn=6&ordertype=1&p=${page}`, token)
  }
}

// 足迹、最新
export const FooterRecentDiaryApi = (userId, page) =>
  getApi(`/api/diary?rn=6&ordertype=0&private=1&p=${page}`, userId)

// 足迹、热门
export const FooterHotDiaryApi = (userId, page) =>
  getApi(`/api/diary?rn=6&ordertype=2&private=1&p=${page}`, userId)

// 文集
export const CollectionsApi = (userId, page) =>
  getApi(`/api/collection?rn=10&ordertype=0&p=${page}`, userId)

// 发现、话题
export const TopicsListApi = (userId, page) =>
  getApi(`/api/talk?rn=8&tag=1,2,3&p=${page}`, userId)

// 发现、备受宠爱
export const TopUsersApi = (userId) =>
  getApi('/api/rankuser?p=0&rn=10', userId)

// 备受宠爱列表
export const LovedUsersApi = (userId, page) => {
  return getApi(`/api/rankuser?rn=8&p=${page}`, userId)
}

// 搜索api
export const SearchDiaryApi = (userId, kw, page) => {
  return getApi(`/api/diary?p=${page}&rn=10&order_type=0&order=1&key=${kw}`, userId)
}

// 垃圾箱列表
export const TrashApi = (userId, page) =>
  getApi(`/api/diary?p=${page}&rn=10&ordertype=0&status=0`, userId)

// 用户个人信息
export const PersonalInfoApi = (userId, id) =>
  getApi(`/api/account/${id}`, userId)

// 个人日记列表
export const PersonalDiariesApi = (userId, page) =>
  getApi(`/api/diary?p=${page}&rn=3&ordertype=0&private=1`, userId)

// 反馈意见
export const FeedbackApi = (data, userId) =>
  postApi('/api/feedback', data, userId)

export const TopicApi = (id, userId) =>
  getApi(`/api/talk/${id}`, userId)

// 评论列表
export const CommentsApi = ({id, ownerId, page, userId}) =>
  getApi(`/api/${id}/${ownerId}/comment?p=${page}&rn=10`, userId)

// 获取验证码
export const getVertiCodeApi = (userId, account) =>
  getApi(`/api/addaccount/${account}`, userId)

// 注册提交接口
export const RegisterApi = (userId, map) =>
  postApi(`/api/account`, map, userId)

// 登录接口
export const LoginApi = (userId, map) =>
  postApi(`/api/login`, map, userId)

// 话题关注接口
export const FollowTopicApi = (topicId, userId) =>
  postApi(`/api/talk/focus/${topicId}`, {}, userId)

// 话题取消关注接口
export const UnfollowTopicApi = (topicId, userId) =>
  deleteApi(`/api/talk/focus/${topicId}`, userId, null)

// 关注用户接口
export const FollowUserApi = (account, userId) =>
  postApi(`/api/account/focus/${account}`, {}, userId)
// 取消关注用户接口
export const UnFollowUserApi = (account, userId) =>
  deleteApi(`/api/account/focus/${account}`, userId, null)
// 点赞评论接口
export const LikeCommentApi = ({diaryId, ownerId, commentId, userId}) =>
  postApi(`/api/${diaryId}/${ownerId}/${commentId}/like`, {}, userId)
// 暂无取消点赞功能
export const UnlikeCommentApi = ({diaryId, ownerId, commentId, userId}) =>
  deleteApi(`/api/${diaryId}/${ownerId}/${commentId}/like`, userId, null)

// 点赞话题接口
export const LikeTopicApi = ({id, ownerId, userId}) =>
  postApi(`/api/${id}/${ownerId}/like`, {}, userId)

// 个人信息获取接口
export const getUserProfile = (token, userId) =>
  getApi(`/api/account/${userId}`, token)

// 获取关注人员列表
export const MyFollowUsersApi = (userId, page) =>
  getApi(`/api/account/focus?p=${page}&rn=5`, userId)

export const MyFollowTopicsApi = (userId, page) =>
  getApi(`/api/talk/focus?p=${page}&rn=5`, userId)

export const getUnloginInfo = (devicedId, userId) =>
 getApi(`/api/customer/${devicedId}`, userId)

// 游客注册接口
export const CustomerRegisterApi = (map, userId) =>
  postApi('/api/customer', map, userId)

// 提交评论Api
export const PostCommentApi = ({diaryId, ownerId, data, userId}) =>
  postApi(`/api/${diaryId}/${ownerId}/comment`, data, userId)

// 提交评论的评论Api
export const PostCommentCommentApi = ({diaryId, ownerId, commentId, data, userId}) =>
  postApi(`/api/${diaryId}/${ownerId}/${commentId}/comment`, data, userId)

// 获取评论的评论
export const CommentCommentsApi = ({diaryId, ownerId, commentId, page, userId}) =>
  getApi(`/api/${diaryId}/${ownerId}/${commentId}/comment?p=${page}&rn=10`, userId)

// 日记提交接口
export const PostDiaryApi = (map, userId) =>
  postApi('/api/diary', map, userId)

// 删除日记的接口
export const deleteDiary = (userId, map) =>
  deleteApi('/api/diary', userId, map)

// 日记恢复接口
export const RecoveryDiary = (userId, map) =>
  postApi('/api/recovery', map, userId)
