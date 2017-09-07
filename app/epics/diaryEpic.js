import {AsyncStorage, NativeModules} from 'react-native'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/diaryAction'
import { PostDiaryApi, PostEditDiaryApi} from '../api/apis'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

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
                  if (it.net === '1' && it.token) {
                    if (action.come4 === 'write') {
                      return Observable.from(PostDiaryApi(it.payload, it.token))
                    } else if (action.come4 === 'edit') {
                      return Observable.from(PostEditDiaryApi(it.payload, it.token))
                    }
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 2) {
                  return actions.postDiaryError()
                } else if (it.return_code === 1) {
                  return actions.postDiarySuccess()
                }
                return actions.postDiaryError()
              }
            ).catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
            })
       )
}

export default combineEpics(postWriteDiary)
