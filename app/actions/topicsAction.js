export const TOPICS_INIT = 'TOPICS_INIT'
export const TOPICS_DATA = 'TOPICS_DATA'
export const TOPICS_MORE = 'TOPICS_MORE'
export const TOPICS_MORE_DATA = 'TOPICS_MORE_DATA'
export const TOPIC_LIST_CLEAR_PAGE_DATA = 'TOPIC_LIST_CLEAR_PAGE_DATA'
export function topicListInit (page, come4) {
  return {
    type: TOPICS_INIT,
    isRefreshing: true,
    page,
    come4
  }
}

export function topicListData (data) {
  return {
    type: TOPICS_DATA,
    isRefreshing: false,
    talks: data,
    hasMore: data.length >= 10
  }
}

export function topicListMore (page, come4) {
  return {
    type: TOPICS_MORE,
    isLoadingMore: true,
    page,
    come4
  }
}

export function topicListMoreData (data) {
  return {
    type: TOPICS_MORE_DATA,
    isLoadingMore: false,
    talks: data,
    hasMore: data.length >= 10
  }
}

export function clearPageData() {
  return {
    type: TOPIC_LIST_CLEAR_PAGE_DATA
  }
}
