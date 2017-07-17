import {AsyncStorage, NativeModules} from 'react-native'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/diaryAction'
import { PostDiaryApi} from '../api/apis'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'


// function diaryCommentInitEpic (action$) {
//   return action$.ofType(actions.DIARY_COMMENT_INIT)
//             .mergeMap(action =>
//               Observable.zip(
//                 Observable.from(AsyncStorage.getItem('token')),
//                 token => ({token})
//               ).flatMap(
//                 it => Observable.from(CommentsApi({id: action.id, ownerId: action.ownerId, page: 0, userId: it.token}))
//               ).map((it) => {
//                 if (it.return_code === 2) {
//                   return null
//                 }
//                 // console.log('epic  ---> topic ' + it.topic)
//                 return actions.diaryCommentData(it)
//               }
//             ).catch((error) => {
//               console.log('epic error --> ' + error)
//             })
//        )
// }

function postWriteDiary (action$) {
  return action$.ofType(actions.WRITE_DIARY_POST_DIARY)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.payload),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, payload, net) => ({token, payload, net})
              ).flatMap(
                (it) => {
                  if (it.net === 1 && it.token) {
                    return Observable.from(PostDiaryApi(it.payload, it.token))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 2) {
                  return null
                } else if (it.return_code === 1) {
                  return actions.postDiarySuccess()
                }
                return null
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}

export default combineEpics(postWriteDiary)
