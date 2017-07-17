import {AsyncStorage, NativeModules} from 'react-native'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/homeActions'
import {showError} from '../actions/common'
import { MineDiaryApi } from '../api/apis'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function homeInitEpic (action$) {
  return action$.ofType(actions.HOME_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                Observable.from(AsyncStorage.getItem('userId')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, page, userId, net) => ({token, page, userId, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(MineDiaryApi(it.token, it.page, it.userId))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR);
                }
                if (it.return_code === 2) {
                  return null
                }
                return actions.homeData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR);
            })
       )
}

function homeMoreEpic (action$) {
  return action$.ofType(actions.HOME_LOADING_MORE)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                Observable.from(AsyncStorage.getItem('userId')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, page, userId, net) => ({token, page, userId, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(MineDiaryApi(it.token, it.page, it.userId))
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
                return actions.homeLoadingMoreData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}
export default combineEpics(homeInitEpic, homeMoreEpic)
