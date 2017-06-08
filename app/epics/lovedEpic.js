import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/lovedActions'
import { combineEpics } from 'redux-observable'
import { LovedUsersApi } from '../api/apis'
import {AsyncStorage} from 'react-native'
function lovedInitEpic (action$) {
  return action$.ofType(actions.LOVED_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                (token, page) => {
                  return {token, page}
                }
              ).flatMap(
                it => {
                  if (it.token) {
                    return Observable.from(LovedUsersApi(it.token, it.page))
                  } else {
                    return Observable.of(2)
                  }
                }
              ).map(it => {
                if (it.return_code === 2) {
                } else {
                  return actions.LovedListData(it.ranks)
                }
              }
            ).catch(error => {
              console.log('epic error --> ' + error)
            })
       )
}

function lovedMoreEpic (action$) {
  return action$.ofType(actions.LOVED_MORE)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page + 1),
                (token, page) => {
                  return {token, page}
                }
              ).flatMap(
                it => {
                  if (it.token) {
                    return Observable.from(LovedUsersApi(it.token, it.page))
                  } else {
                    return Observable.of(2)
                  }
                }
              ).map(it => {
                if (it.return_code === 2) {
                } else {
                  return actions.LovedListMoreData(it.ranks)
                }
              }
            ).catch(error => {
              console.log('epic error --> ' + error)
            })
       )
}

export default combineEpics(lovedInitEpic, lovedMoreEpic)
