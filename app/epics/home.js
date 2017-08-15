import {AsyncStorage, NativeModules} from 'react-native'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/homeActions'
import {showError} from '../actions/common'
import { MineDiaryApi, checkAndroidVersion} from '../api/apis'
import {NET_WORK_ERROR} from '../constant/errors'

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
                  return Observable.from(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR);
                }
                if (it.return_code === 2) {
                  return showError(NET_WORK_ERROR);
                }
                return actions.homeData(it)
              }
            ).catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
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
                  return showError(NET_WORK_ERROR);
                }
                return actions.homeLoadingMoreData(it)
              }
            ).catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
            })
       )
}

function checkVersion (action$) {
  return action$.ofType(actions.HOME_CHECK_VERSION)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                Observable.from(NativeModules.SplashScreen.getCurrentSdk()),
                (token, net, sdkVersion) => ({token, net, sdkVersion})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(checkAndroidVersion(it.token, it.sdkVersion))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 2) {
                  return showError(NET_WORK_ERROR);
                } else if (it.return_code === 0) {
                  return showError(it.return_msg)
                }
                // console.log({version: it})
                return actions.checkVersionData(it)
              }
            ).catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
            })
       )
}

export default combineEpics(homeInitEpic, homeMoreEpic, checkVersion)
