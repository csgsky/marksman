import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/registerAction'
import { combineEpics } from 'redux-observable'
import {getVertiCodeApi, RegisterApi} from '../api/apis'
import {AsyncStorage, NativeModules} from 'react-native'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function vertiCodeEpic (action$) {
  return action$.ofType(actions.REGISTER_GET_CODE)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.account),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, account, net) => ({token, account, net})
              ).flatMap(
                (it) => {
                  if (it.account && it.net === '1') {
                    return Observable.from(getVertiCodeApi(it.token, it.account))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.codeSuccess()
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              return showError(OTHER_ERROR)
            })
       )
}

function registerEpic (action$) {
  return action$.ofType(actions.REGISTER)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.account),
                Observable.of(action.password),
                Observable.of(action.message),
                Observable.from(AsyncStorage.getItem('sex')),
                Observable.from(AsyncStorage.getItem('sign')),
                Observable.from(AsyncStorage.getItem('nickname')),
                Observable.from(AsyncStorage.getItem('tags')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, account, password, message, sex, sign, nickname, tags, net) => {
                  return {token, data: {account, password, message, sex, sign, nickname, tags, net}}
                }
              ).flatMap(
                it => {
                  if (it.token && it.net === '1') {
                    return Observable.from(RegisterApi(it.token, it.data))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                console.warn('it return code ==> ' + it)
                if (it.return_code === 1) {
                  return actions.registerSuccess(it.user_id)
                }
                return actions.registerError(it.return_msg)
              }
            ).catch((error) => {
              console.warn('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}
export default combineEpics(vertiCodeEpic, registerEpic)
