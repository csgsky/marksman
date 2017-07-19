import {AsyncStorage, NativeModules} from 'react-native'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/commentEditorAction'
// import { combineEpics } from 'redux-observable'
import PubSub from 'pubsub-js'
import { PostCommentApi } from '../api/apis'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function commentPostEpic (action$) {
  return action$.ofType(actions.COMMENT_POST)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => {
                  return {token, net}
                }
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    const {diaryId, ownerId, data} = action.payload
                    return Observable.from(PostCommentApi({diaryId, ownerId, data, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 2) {
                } else {
                  console.log('epic  ---> commentpostsuccess ')
                  console.log(it)
                  PubSub.publish('refreshDetailPage')
                  PubSub.publish('refreshDiaryList')
                  return actions.commentPostSuccess()
                }
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}

export default commentPostEpic
