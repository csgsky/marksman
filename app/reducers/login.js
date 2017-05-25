import * as types from '../constant/actionType'

const initState = {
  it: ''
}


export default function slug (state = initState, action = {}) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      console.warn('return_code ===> ' + action.it.return_msg)
      return {
        ...state,
        it: action.it.return_msg
      }
    default:
      return state
  }
}

