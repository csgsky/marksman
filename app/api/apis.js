
const baseUrlWithoutToken = path => 'http://business.qianyan.zhuoyoutech.com:2003' + path
const accept = 'application/com.droi.qy-v1.0-1+json'
const userAgent = 'zy'
const contentType = 'application/json;charset=UTF-8'
// post 提交
export function postApi (path, map, userId) {
  console.log('post Api path --->', baseUrlWithoutToken(path))
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
    console.log('post responseJson ==> ' + responseJson.return_msg)
    return responseJson
  }).catch((error) => {
    return error
  })
}
// get 请求
export function getApi (path, userId) {
  console.log('getApi path ==> ', baseUrlWithoutToken(path))
  console.log('getApi userid ==> ', userId)
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
      console.log('GET ok')
    } else {
      console.log('GET error')
    }
    return response.json()
  }).then((responseJson) => {
    console.log('responseJson ==> ' + responseJson.return_msg)
    return responseJson
  }).catch((error) => {
    console.log('getApi error ==> ' + error)
    return error
  })
}

// delete 请求
export function deleteApi (path, userId, map) {
  console.log('delete Api ---> path', path)
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
      console.log('DELETE ok')
    } else {
      console.log('DELETE error')
    }
    return response.json()
  }).then((responseJson) => {
    console.log('responseJson ==> ' + responseJson.return_msg)
    return responseJson
  }).catch((error) => {
    console.log('deleteApi error ==> ' + error)
    return error
  })
}
// put 请求
export function putApi (path, userId, map) {
  console.log('put api map ==> ', map)
  return fetch(baseUrlWithoutToken(path), {
    method: 'PUT',
    headers: {
      'Accept': accept,
      'User-Agent': userAgent,
      'Content-Type': contentType,
      'Authorization': userId
    },
    body: JSON.stringify(map)
  }).then((response) => {
    if (response.ok) {
      console.log('PUT ok')
    } else {
      console.log('PUT error')
    }
    return response.json()
  }).then((responseJson) => {
    console.log('responseJson ==> ' + responseJson.return_msg)
    return responseJson
  }).catch((error) => {
    console.log('putApi error ==> ' + error)
    return error
  })
}

// 首页日记
export const MineDiaryApi = (token, page, userId) => {
  if (userId !== null) {
    return getApi(`/api/diary?rn=10&p=${page}&user_id=${userId}`, token)
  } else {
    return getApi(`/api/diary?rn=10&p=${page}`, token)
  }
}

// 足迹、最新
export const FooterRecentDiaryApi = (userId, page) =>
  getApi(`/api/diary?rn=10&order_type=0&ifprivate=1&p=${page}`, userId)

// 足迹、热门
export const FooterHotDiaryApi = (userId, page) =>
  getApi(`/api/diary?rn=10&order_type=2&ifprivate=1&p=${page}`, userId)

// 文集
export const CollectionsApi = (userId, page) =>
  getApi(`/api/collection?rn=10&order_type=0&p=${page}`, userId)

// 发现、话题
export const TopicsListApi = (userId, page, come4, tag) => {
  if (come4 === 'news') {
    return getApi(`/api/mymsg?rn=10&mode=0&p=${page}`, userId)
  }
  return getApi(`/api/talk?rn=10&p=${page}`, userId)
}

// 发现、备受宠爱
export const TopUsersApi = (userId) =>
  getApi('/api/rankuser?p=0&rn=10', userId)

// 备受宠爱列表
export const LovedUsersApi = (userId, page) => {
  return getApi(`/api/rankuser?rn=10&p=${page}`, userId)
}

// 搜索api
export const SearchDiaryApi = (token, kw, page, userId) => {
  return getApi(`/api/diary?p=${page}&rn=10&order_type=0&order=1&key=${kw}&user_id=${userId}`, token)
}

// 垃圾箱列表
export const TrashApi = (token, page, userId) =>
  getApi(`/api/diary?p=${page}&rn=10&order_type=0&status=0&user_id=${userId}`, token)

// 用户个人信息
export const PersonalInfoApi = (userId, id) =>
  getApi(`/api/account/${id}`, userId)

// 个人日记列表
export const PersonalDiariesApi = (token, userId, page) =>
  getApi(`/api/diary?p=${page}&rn=10&order_type=0&ifprivate=1&user_id=${userId}`, token)

// 反馈意见
export const FeedbackApi = (data, userId) =>
  postApi('/api/feedback', data, userId)

export const TopicApi = (id, userId) =>
  getApi(`/api/talk/${id}`, userId)

// 评论列表
export const CommentsApi = ({id, ownerId, page, userId}) =>
  getApi(`/api/${id}/${ownerId}/comment?p=${page}&rn=10`, userId)

// 注册，获取验证码
export const getVertiCodeApi = (userId, account) =>
  getApi(`/api/addaccount/${account}`, userId)

// 忘记密码，获取验证码
export const getForgetPasswordCodeApi = (userId, account) =>
  getApi(`/api/fgtpswd/${account}`, userId)

// 注册提交接口
export const RegisterApi = (userId, map) =>
  postApi(`/api/account`, map, userId)

// 忘记密码提交的接口
export const ForgetPasswordApi = (userId, map) =>
  putApi('/api/fgtpswd', userId, map)

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
  getApi(`/api/account/focus?p=${page}&rn=10`, userId)

export const MyFollowTopicsApi = (userId, page) =>
  getApi(`/api/talk/focus?p=${page}&rn=10`, userId)

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

// 编辑日记提交接口
export const PostEditDiaryApi = (map, userId) =>
  putApi('/api/diary', userId, map)

// 删除日记的接口
export const deleteDiary = (userId, map) =>
  deleteApi('/api/diary', userId, map)

// 日记恢复接口
export const RecoveryDiary = (userId, map) =>
  postApi('/api/recovery', map, userId)

// 编辑信息的接口
export const EditUserInfo = (userId, map) =>
  putApi('/api/account', userId, map)

// 我的页面小红点提示 /api/msg
export const ProfileCenterReminderApi = userId =>
  getApi('/api/msg', userId)

// 系统通知
export const SystemMessagesApi = (userId, page) =>
  getApi(`/api/sysmsg?p=${page}&rn=10`, userId)

// 消息 - 分类
export const MineMessageModeApi = userId =>
  getApi('/api/mymsg/mode', userId)

// 消息 - 通知
export const MineMessageNotifApi = (userId, page) =>
  getApi(`/api/mymsg?rn=10&mode=3&p=${page}`, userId)

// 消息 - 评论
export const MineMessageCommentApi = (userId, page) =>
  getApi(`/api/mymsg?rn=10&mode=2&p=${page}`, userId)

// 消息 - 用户
export const MineMessageUserApi = (userId, page) =>
  getApi(`/api/mymsg?rn=10&mode=1&p=${page}`, userId)

// 启动页 - 图片
export const splashApi = userId =>
  getApi('/api/startup', userId)

