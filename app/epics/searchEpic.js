import {AsyncStorage, NativeModules} from 'react-native'
import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import * as actions from '../actions/searchAction'
import { SearchDiaryApi } from '../api/apis'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function searchInitEpic (action$) {
  return action$.ofType(actions.SEARCH_PAGE_SEARCH_INIT)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.kw),
                Observable.of(0),
                Observable.from(AsyncStorage.getItem('userId')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, kw, page, userId, net) => ({token, kw, page, userId, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(SearchDiaryApi(it.token, it.kw, it.page, it.userId))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  if (it.diarys.length > 0) {
                    return actions.searchDiaryData(it.diarys)
                  }
                  return actions.searchEmpty()
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
            })
       )
}

function searchMoreEpic (action$) {
  return action$.ofType(actions.SEARCH_LOADING_MORE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.kw),
                Observable.of(action.page),
                Observable.from(AsyncStorage.getItem('userId')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, kw, page, userId, net) => ({token, kw, page, userId, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(SearchDiaryApi(it.token, it.kw, it.page, it.userId))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.searchLoadingMoreData(it.diarys)
                }
                return actions.searchEmpty()
              }
            ).catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
            })
       )
}

export default combineEpics(searchInitEpic, searchMoreEpic)
