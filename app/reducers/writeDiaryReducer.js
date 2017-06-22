import * as types from '../actions/diaryAction'


const initState = {
  diary: null
}


export default function writeDiary (state = initState, action = {}) {
  switch (action.type) {
    case types.WRITE_DIARY_INIT:
      console.log('writeDiary reducer WRITE_DIARY_INIT-> ' + action.payload)
      return {
        ...state,
        diary: action.payload
      }
    default:
      return state
  }
}
