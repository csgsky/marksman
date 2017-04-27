import * as types from '../constant/actionType'

const initState = {
  slug: '',
  token: ''
}


export default function slug (state = initState, action = {}) {
  console.log('reducer' + action.type)
  switch (action.type) {
    case types.LOGIN_SUCCESS :
      return {
        ...state,
        token: action.token,
        slug: action.slug
      }
    default:
      return state
  }
}

