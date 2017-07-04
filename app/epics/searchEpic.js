import {AsyncStorage} from 'react-native'
import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import * as actions from '../actions/searchAction'
import { SearchDiaryApi } from '../api/apis'

function searchInitEpic (action$) {
  return action$.ofType(actions.SEARCH_PAGE_SEARCH_INIT)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.kw),
                Observable.of(0),
                Observable.from(AsyncStorage.getItem('userId')),
                (token, kw, page, userId) => ({token, kw, page, userId})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(SearchDiaryApi(it.token, it.kw, it.page, it.userId))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 1) {
                  if (it.diarys.length > 0) {
                    return actions.searchDiaryData(it.diarys)
                  }
                  return actions.searchEmpty()
                }
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
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
                (token, kw, page, userId) => ({token, kw, page, userId})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(SearchDiaryApi(it.token, it.kw, it.page, it.userId))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 1) {
                  return actions.searchLoadingMoreData(it.diarys)
                }
                return actions.searchEmpty()
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

export default combineEpics(searchInitEpic, searchMoreEpic)
