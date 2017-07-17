import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/trashActions'
import { combineEpics } from 'redux-observable'
import { TrashApi, RecoveryDiary } from '../api/apis'
import {AsyncStorage, NativeModules} from 'react-native'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function trashInitEpic (action$) {
  return action$.ofType(actions.TRASH_INIT)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(AsyncStorage.getItem('userId')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, userId, net) => ({token, userId, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(TrashApi(it.token, 0, it.userId))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.trashData(it)
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}

function trashMoreEpic (action$) {
  return action$.ofType(actions.TRASH_MORE)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page + 1),
                Observable.from(AsyncStorage.getItem('userId')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, page, userId, net) => ({token, page, userId, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(TrashApi(it.token, it.page, it.userId))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.trashMoreData(it)
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}

function trashRecoveryEpic (action$) {
  return action$.ofType(actions.RECOVER_DIARY)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.payload),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, payload, net) => ({token, payload, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    console.warn(it.payload)
                    return Observable.from(RecoveryDiary(it.token, it.payload))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.recoverDiarySuccess()
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}

export default combineEpics(trashInitEpic, trashMoreEpic, trashRecoveryEpic)
