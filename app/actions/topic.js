export const TOPIC_INIT = 'TOPIC_INIT'
export const TOPIC_DATA = 'TOPIC_DATA'
export const TOPIC_COMMENTS_INIT = 'TOPIC_COMMENTS_INIT'
export const TOPIC_COMMENTS_LOAD_MORE = 'TOPIC_COMMENTS_LOAD_MORE'
export const TOPIC_COMMENTS_MORE_DATA = 'TOPIC_COMMENTS_MORE_DATA'
export const TOPIC_FOLLOW = 'TOPIC_FOLLOW'
export const TOPIC_FOLLOW_SUCCESS = 'TOPIC_FOLLOW_SUCCESS'

export function topicInit ({topicId, ownerId}) {
  return {
    type: TOPIC_INIT,
    isRefreshing: true,
    topicId,
    ownerId
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

export function topicCommentsLoadMore ({topicId, ownerId, page}) {
  console.log('action ---> TOPIC_COMMENTS_LOAD_MORE')
  return {
    type: TOPIC_COMMENTS_LOAD_MORE,
    topicId,
    ownerId,
    page
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

export function topicFollow (id) {
  console.log('action ---> TOPIC_FOLLOW')
  return {
    type: TOPIC_FOLLOW,
    id
  }
}

export function topicFollowSuccess () {
  console.log('action ---> TOPIC_FOLLOW_SUCCESS')
  return {
    topic: TOPIC_FOLLOW_SUCCESS
  }
}
