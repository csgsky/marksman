import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/trashActions'
import { combineEpics } from 'redux-observable'
import { TrashApi, RecoveryDiary } from '../api/apis'
import {AsyncStorage} from 'react-native'

function trashInitEpic (action$) {
  return action$.ofType(actions.TRASH_INIT)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                token => ({token})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(TrashApi(it.token, 0))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                return actions.trashData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function trashMoreEpic (action$) {
  return action$.ofType(actions.TRASH_MORE)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page + 1),
                (token, page) => ({token, page})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(TrashApi(it.token, it.page))
                  } else {
                    return Observable.of(2)
                  }
                }
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                return actions.trashMoreData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function trashRecoveryEpic (action$) {
  return action$.ofType(actions.RECOVER_DIARY)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.payload),
                (token, payload) => ({token, payload})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    console.warn(it.payload)
                    return Observable.from(RecoveryDiary(it.token, it.payload))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 1) {
                  return actions.recoverDiarySuccess()
                }
                return null
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

export default combineEpics(trashInitEpic, trashMoreEpic, trashRecoveryEpic)
