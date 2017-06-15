export const FEEDBACK = 'FEEDBACK'
export const FEEDBACK_SUCCESS = 'FEEDBACK_SUCCESS'
export const CLEAR_FEEDBACK = 'CLEAR_FEEDBACK'

export function feedback (text) {
  return {
    type: FEEDBACK,
    data: {
      content: text,
      type: 1
    }
  }
}

export function feedbackSuccess () {
  return {
    type: FEEDBACK_SUCCESS
  }
}

export function clearFeedback () {
  return {
    type: CLEAR_FEEDBACK
  }
}
