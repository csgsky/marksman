export const TOPIC_INIT = 'TOPIC_INIT'
export const TOPIC_DATA = 'TOPIC_DATA'
export const TOPIC_MORE = 'TOPIC_MORE'
export const TOPIC_MORE_DATA = 'TOPIC_MORE_DATA'
export function topicListInit (page) {
  return {
    type: TOPIC_INIT,
    isRefreshing: true,
    page: page
  }
}

export function topicListData (data) {
  return {
    type: TOPIC_DATA,
    isRefreshing: false,
    talks: data,
    hasMore: data.length >= 8
  }
}

export function topicListMore (page) {
  return {
    type: TOPIC_MORE,
    isLoadingMore: true,
    page: page
  }
}

export function topicListMoreData (data) {
  return {
    type: TOPIC_MORE_DATA,
    isLoadingMore: false,
    talks: data,
    hasMore: data.length >= 8
  }
}
