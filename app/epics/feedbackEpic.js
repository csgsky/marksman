import { Observable } from 'rxjs/Rx'
import {AsyncStorage, NativeModules} from 'react-native'
import * as actions from '../actions/feedback'
import { FeedbackApi } from '../api/apis'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function feedbackEpic (action$) {
  return action$.ofType(actions.FEEDBACK)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(FeedbackApi(action.data, it.token))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.feedbackSuccess()
                }
                return null
              }
            ).catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
            })
       )
}

export default feedbackEpic
