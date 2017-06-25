export const TOPIC_INIT = 'TOPIC_INIT'
export const TOPIC_DATA = 'TOPIC_DATA'
export const TOPIC_COMMENTS_INIT = 'TOPIC_COMMENTS_INIT'
export const TOPIC_COMMENTS_LOAD_MORE = 'TOPIC_COMMENTS_LOAD_MORE'
export const TOPIC_COMMENTS_MORE_DATA = 'TOPIC_COMMENTS_MORE_DATA'
export const TOPIC_FOLLOW = 'TOPIC_FOLLOW'
export const TOPIC_FOLLOW_SUCCESS = 'TOPIC_FOLLOW_SUCCESS'
export const TOPIC_UNFOLLOW = 'TOPIC_UNFOLLOW'
export const TOPIC_UNFOLLOW_SUCCESS = 'TOPIC_UNFOLLOW_SUCCESS'
export const TOPIC_COMMENT_LIKE = 'TOPIC_COMMENT_LIKE'
export const TOPIC_COMMENT_LIKE_SUCCESS = 'TOPIC_COMMENT_LIKE_SUCCESS'
export const TOPIC_COMMENT_UNLIKE = 'TOPIC_COMMENT_UNLIKE'
export const TOPIC_COMMENT_UNLIKE_SUCCESS = 'TOPIC_UNLIKE_SUCCESS'
export const TOPIC_LIKE = 'TOPIC_LIKE'
export const TOPIC_LIKE_SUCCESS = 'TOPIC_LIKE_SUCCESS'

export function topicInit ({topicId, ownerId, diaryId}) {
  return {
    type: TOPIC_INIT,
    isRefreshing: true,
    topicId,
    ownerId,
    diaryId
  }
}

export function topicCommentsInit () {
  console.log('action ---> TOPIC_COMMENTS_INIT')
  return {
    type: TOPIC_COMMENTS_INIT,
    isLoading: true
  }
}

export function topicData (data) {
  console.log('action  --->  TOPIC_DATA')
  console.log('action  --->  TOPIC_DATA  ')
  return {
    type: TOPIC_DATA,
    isRefreshing: true,
    topic: data.topic,
    comments: data.comments
  }
}

export function topicCommentsLoadMore ({ownerId, page, diaryId}) {
  console.log('action ---> TOPIC_COMMENTS_LOAD_MORE')
  return {
    type: TOPIC_COMMENTS_LOAD_MORE,
    ownerId,
    page,
    diaryId
  }
}

export function topicCommentsMoreData (data) {
  console.log('action ---> TOPIC_COMMENTS_MORE_DATA')
  return {
    type: TOPIC_COMMENTS_MORE_DATA,
    isLoadingMore: false,
    comments: data,
    hasMore: data.length >= 4
  }
}

export function topicFollow (diaryId) {
  console.log('action ---> TOPIC_FOLLOW')
  return {
    type: TOPIC_FOLLOW,
    diaryId
  }
}

export function topicFollowSuccess () {
  console.log('action ---> TOPIC_FOLLOW_SUCCESS')
  return {
    type: TOPIC_FOLLOW_SUCCESS
  }
}

export function topicUnfollow (diaryId) {
  console.log('action ---> TOPIC_UNFOLLOW')
  return {
    type: TOPIC_UNFOLLOW,
    diaryId
  }
}

export function topicUnfollowSuccess () {
  console.log('action ---> TOPIC_UNFOLLOW_SUCCESS')
  return {
    type: TOPIC_UNFOLLOW_SUCCESS
  }
}

export function topicCommentLike ({diaryId, ownerId, commentId, index}) {
  console.log('action ---> TOPIC_COMMENT_LIKE', {diaryId, ownerId, commentId, index})
  return {
    type: TOPIC_COMMENT_LIKE,
    diaryId,
    ownerId,
    commentId,
    index
  }
}

export function topicCommentLikeSuccess (index) {
  console.log('action ---> TOPIC_COMMENT_LIKE_SUCCESS')
  return {
    type: TOPIC_COMMENT_LIKE_SUCCESS,
    index
  }
}

export function topicCommentUnlike ({diaryId, ownerId, commentId, index}) {
  console.log('action ---> TOPIC_COMMENT_UNLIKE', {diaryId, ownerId, commentId, index})
  return {
    type: TOPIC_COMMENT_UNLIKE,
    diaryId,
    ownerId,
    commentId,
    index
  }
}

export function topicCommentUnlikeSuccess (index) {
  console.log('action ---> TOPIC_COMMENT_UNLIKE_SUCCESS')
  return {
    type: TOPIC_COMMENT_UNLIKE_SUCCESS,
    index
  }
}

export function topicLike (payload) {
  console.log('action ---> TOPIC_LIKE')
  return {
    type: TOPIC_LIKE,
    payload
  }
}

export function topicLikeSuccess (payload) {
  console.log('action ---> TOPIC_LIKE_SUCCESS')
  return {
    type: TOPIC_LIKE_SUCCESS,
    payload
  }
}
