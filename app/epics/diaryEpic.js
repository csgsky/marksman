import {AsyncStorage} from 'react-native'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/diaryAction'
import { CommentsApi } from '../api/apis'

function diaryCommentInitEpic (action$) {
  return action$.ofType(actions.DIARY_COMMENT_INIT)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                token => ({token})
              ).flatMap(
                it => Observable.from(CommentsApi({id: action.id, ownerId: action.ownerId, page: 0, userId: it.token}))
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                // console.log('epic  ---> topic ' + it.topic)
                return actions.diaryCommentData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

export default combineEpics(diaryCommentInitEpic)
