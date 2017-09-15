import {AsyncStorage, NativeModules} from 'react-native'
import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import * as actions from '../actions/hotDiaryAction'
import { FooterHotDiaryApi, LikeTopicApi } from '../api/apis'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function hotDiaryInitEpic (action$) {
  return action$.ofType(actions.HOTDIARY_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                Observable.of(action.timeStap),
                (token, page, net, timeStap) => ({token, page, net, timeStap})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(FooterHotDiaryApi(it.token, it.page, it.timeStap))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 2) {
                  return null
                }
                return actions.hotDiaryData(it)
              }
            ).catch((error) => {
              return showError(OTHER_ERROR)
            })
       )
}


function hotDiaryMoreEpic (action$) {
  return action$.ofType(actions.HOTDIARY_LOADING_MORE)
            .debounceTime(1000)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                Observable.of(action.timeStap),
                (token, page, net, timeStap) => ({token, page, net, timeStap})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(FooterHotDiaryApi(it.token, it.page, it.timeStap))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 2) {
                  return showError(NET_WORK_ERROR)
                }
                return actions.hotDiaryLoadingMoreData(it)
              }
            ).catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
            })
       )
}

function diaryLikeEpic (action$) {
  return action$.ofType(actions.HOTDIARY_LIKE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(LikeTopicApi({id: action.payload.diaryId, ownerId: action.payload.ownerId, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.hotDiaryLikeSuccess({index: action.payload.index})
                }
                return showError(NET_WORK_ERROR)
              }).catch((error) => {
                return Observable.of(showError(NET_WORK_ERROR))
              }))
}

export default combineEpics(hotDiaryInitEpic, hotDiaryMoreEpic, diaryLikeEpic)
