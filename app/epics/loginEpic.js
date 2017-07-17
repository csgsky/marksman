import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/loginActions'
import { combineEpics } from 'redux-observable'
import {AsyncStorage, NativeModules} from 'react-native'
import {LoginApi} from '../api/apis'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function loginEpic (action$) {
  return action$.ofType(actions.LOGIN)
            .mergeMap((action) =>
                Observable.zip(
                  Observable.from(AsyncStorage.getItem('token')),
                  Observable.of(action.account),
                  Observable.of(action.password),
                  Observable.from(NativeModules.SplashScreen.getNetInfo()),
                  (token, account, password, net) => {
                    return {token, data: {account, password}, net}
                  }
                ).flatMap(it => {
                  if (it.token && it.net === '1') {
                    return Observable.from(LoginApi(it.token, it.data))
                  }
                  return Observable.of(2)
                }
                ).map(it => {
                  if (it === 2) {
                    return showError(NET_WORK_ERROR)
                  }
                  if (it.return_code === 1) {
                    return actions.loginSuccess(it, it.user_id)
                  }
                  return actions.loginError(it.return_msg)
                }
              ).catch((error) => {
                console.warn('epic error --> ' + error)
                return showError(OTHER_ERROR)
              })
        )
}

export default combineEpics(loginEpic)
