import {AsyncStorage} from 'react-native'
import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import * as actions from '../actions/recentDiaryAction'
import { FooterRecentDiaryApi } from '../api/apis'

function recentInitEpic (action$) {
  return action$.ofType(actions.RECENTDIARY_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                (token, page) => ({token, page})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    // console.log('epic  --->  it token  ' + it.token)
                    return Observable.from(FooterRecentDiaryApi(it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                return actions.recentDiaryData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function recentMoreEpic (action$) {
  return action$.ofType(actions.RECENTDIARY_LOADING_MORE)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                (token, page) => ({token, page})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(FooterRecentDiaryApi(it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                return actions.recentDiaryLoadingMoreData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}


export default combineEpics(recentInitEpic, recentMoreEpic)
