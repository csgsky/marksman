import { Observable } from 'rxjs/Rx'
import {AsyncStorage, NativeModules} from 'react-native'
import { combineEpics } from 'redux-observable'
import * as actions from '../actions/registerAction'
import {getVertiCodeApi, RegisterApi, getForgetPasswordCodeApi, ForgetPasswordApi} from '../api/apis'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR, PHONO_NUMBER_HAS_REGISTER} from '../constant/errors'

function vertiCodeEpic (action$) {
  return action$.ofType(actions.REGISTER_GET_CODE)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.account),
                Observable.of(action.pageType),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, account, pageType, net) => ({token, account, pageType, net})
              ).flatMap(
                (it) => {
                  if (it.account && it.net === '1' && it.pageType === 'register') {
                    return Observable.from(getVertiCodeApi(it.token, it.account))
                  } else if (it.account && it.net === '1' && it.pageType === 'forget') {
                    return Observable.from(getForgetPasswordCodeApi(it.token, it.account))
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
                if (it.return_code === 3) {
                  return showError(PHONO_NUMBER_HAS_REGISTER)
                }
              }
            ).catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
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
                Observable.of(action.nickname),
                Observable.from(AsyncStorage.getItem('tags')),
                Observable.of(action.pageType),
                Observable.of(action.avtarByte),
                Observable.of(action.avtarSuffix),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, account, password, message, sex, sign, nickname, tags, pageType, avtar_byte, avtar_suffix, net) => {
                  return {token, data: {account, password, message, sex: sex || '1', sign: sign || '慵懒~是一种生活的姿态！', nickname: nickname || '尚未填写昵称', tags: tags || '9', avtar_byte, avtar_suffix}, pageType, net}
                }
              ).flatMap(
                it => {
                  if (it.token && it.net === '1' && it.pageType === 'register') {
                    return Observable.from(RegisterApi(it.token, it.data))
                  } else if (it.token && it.net === '1' && it.pageType === 'forget') {
                    return Observable.from(ForgetPasswordApi(it.token, {account: it.data.account, password: it.data.password, message: it.data.message}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.registerSuccess(it.user_id ? it.user_id + '' : null)
                } else if (it.return_code === 6) {
                  return actions.registerError(it.return_msg)
                }
                return actions.registerError(it.return_msg)
              }
            ).catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
            })
       )
}
export default combineEpics(vertiCodeEpic, registerEpic)
