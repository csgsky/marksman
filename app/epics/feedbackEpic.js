import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/feedback'
import { FeedbackApi } from '../api/apis'
import {AsyncStorage} from 'react-native'
function feedbackEpic (action$) {
  return action$.ofType(actions.FEEDBACK)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                (token) => {
                  return {token}
                }
              ).flatMap(
                it => {
                  if (it.token) {
                    console.log('epic  --->  it token  ' + it.token)
                    return Observable.from(FeedbackApi(action.data, it.token))
                  } else {
                    return Observable.of(2)
                  }
                }
              ).map(it => {
                if (it.return_code === 1) {
                  console.log('epic feedback ---> return_code ' + it.return_code)
                  return actions.feedbackSuccess()
                } else {
                }
              }
            ).catch(error => {
              console.log('epic error --> ' + error)
            })
       )
}

export default feedbackEpic
