import {AsyncStorage} from 'react-native'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/homeActions'
import { MineDiaryApi } from '../api/apis'

function homeInitEpic (action$) {
  return action$.ofType(actions.HOME_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                (token, page) => ({token, page})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(MineDiaryApi(it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                return actions.homeData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function homeMoreEpic (action$) {
  return action$.ofType(actions.HOME_LOADING_MORE)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                (token, page) => ({token, page})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(MineDiaryApi(it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                return actions.homeLoadingMoreData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}
export default combineEpics(homeInitEpic, homeMoreEpic)
