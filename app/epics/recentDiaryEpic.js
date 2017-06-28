import {AsyncStorage} from 'react-native'
import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import * as actions from '../actions/recentDiaryAction'
import { FooterRecentDiaryApi, LikeTopicApi } from '../api/apis'

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

function diaryLikeEpic (action$) {
  return action$.ofType(actions.RECENTDIARY_LIKE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                token => ({token})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(LikeTopicApi({id: action.payload.diaryId, ownerId: action.payload.ownerId, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                console.log(it.return_msg)
                if (it.return_code === 1) {
                  return actions.recentDiaryLikeSuccess({index: action.payload.index})
                }
              }).catch((error) => {
                console.log('epic error --->' + error)
              }))
}


export default combineEpics(recentInitEpic, recentMoreEpic, diaryLikeEpic)
