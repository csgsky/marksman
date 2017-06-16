export const TOPICS_INIT = 'TOPICS_INIT'
export const TOPICS_DATA = 'TOPICS_DATA'
export const TOPICS_MORE = 'TOPICS_MORE'
export const TOPICS_MORE_DATA = 'TOPICS_MORE_DATA'
export function topicListInit (page) {
  return {
    type: TOPICS_INIT,
    isRefreshing: true,
    page
  }
}

export function topicListData (data) {
  return {
    type: TOPICS_DATA,
    isRefreshing: false,
    talks: data,
    hasMore: data.length >= 8
  }
}

export function topicListMore (page) {
  return {
    type: TOPICS_MORE,
    isLoadingMore: true,
    page: page
  }
}

export function topicListMoreData (data) {
  return {
    type: TOPICS_MORE_DATA,
    isLoadingMore: false,
    talks: data,
    hasMore: data.length >= 8
  }
}
