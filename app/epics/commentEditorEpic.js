import {AsyncStorage} from 'react-native'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/commentEditorAction'
// import { combineEpics } from 'redux-observable'
import PubSub from 'pubsub-js'
import { PostCommentApi, PostCommentCommentApi } from '../api/apis'

function commentPostEpic (action$) {
  return action$.ofType(actions.COMMENT_POST)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                (token) => {
                  return {token}
                }
              ).flatMap(
                (it) => {
                  if (it.token) {
                    const {diaryId, commentId, ownerId, data} = action.payload
                    if (commentId) {
                      return Observable.from(PostCommentCommentApi({diaryId, ownerId, commentId, data, userId: it.token}))
                    }
                    return Observable.from(PostCommentApi({diaryId, ownerId, data, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 2) {
                } else {
                  console.log('epic  ---> commentpostsuccess ')
                  console.log(it)
                  PubSub.publish('commentsRefresh')
                  PubSub.publish('refreshDetailPage')
                  PubSub.publish('refreshDiaryList')
                  return actions.commentPostSuccess()
                }
              }
            ).catch(error => {
              console.log('epic error --> ' + error)
            })
       )
}

export default commentPostEpic
