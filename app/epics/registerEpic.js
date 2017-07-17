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
                console.warn('it return code ==> ' + it)
                if (it.return_code === 1) {
                  return actions.codeSuccess()
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              console.warn('epic error --> ' + error)
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
                    console.log('flatMap REGISTER token ===> ' + it.token)
                    console.log('flatMap REGISTER account ===> ' + it.account)
                    console.log('flatMap REGISTER password ===> ' + it.password)
                    console.log('flatMap REGISTER message ===> ' + it.message)
                    console.log('flatMap REGISTER sex ===> ' + it.sex)
                    console.log('flatMap REGISTER sign ===> ' + it.sign)
                    console.log('flatMap REGISTER nickname ===> ' + it.nickname)
                    console.log('flatMap REGISTER tags ===> ' + it.tags)
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
