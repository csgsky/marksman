import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/loginActions'
import { combineEpics } from 'redux-observable'
import {AsyncStorage, NativeModules} from 'react-native'
import {LoginApi, ThirdLoginApi} from '../api/apis'
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
                    // alert(token);
                    return {token, data: {account, password}, net}
                  }
                ).flatMap(it => {
                  // alert('flat map' + it.net)
                  if (it.token && it.net === '1') {
                    return Observable.from(LoginApi(it.token, it.data))
                    // return Observable.of({return_code: 3})
                  }
                  return Observable.of(2)
                }
                ).map((it) => {
                  // console.log('alert login' + it.return_code)
                  if (it === 2) {
                    return showError(NET_WORK_ERROR)
                  }
                  if (it.return_code === 1) {
                    return actions.loginSuccess(it, it.user_id)
                  }
                  return actions.loginError(it)
                }
              ).catch((error) => {
                return Observable.of(showError('系统错误'))
              })
        )
}


function thirdLoginEpic (action$) {
  return action$.ofType(actions.THIRD_LOGIN)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.loginType),
                Observable.of(action.code),
                Observable.of(action.openId),
                Observable.from(AsyncStorage.getItem('sex')),
                Observable.from(AsyncStorage.getItem('sign')),
                Observable.from(AsyncStorage.getItem('nickname')),
                Observable.from(AsyncStorage.getItem('tags')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, login_type, login_code, open_id, sex, sign, nickname, tags, net) => {
                  return {token, data: {login_type, login_code, open_id, sex, sign, nickname, tags}, net}
                }
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(ThirdLoginApi(it.token, it.data))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.loginSuccess(it, it.user_id)
                } else if (it.return_code === 6) {
                  return actions.loginError(it.return_msg)
                }
                return actions.loginError(it.return_msg)
              }
            ).catch((error) => {
              Observable.of(showError('系统错误'))
            }
            )
       )
}
export default combineEpics(loginEpic, thirdLoginEpic)
