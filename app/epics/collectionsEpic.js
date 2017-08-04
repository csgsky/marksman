import {AsyncStorage, NativeModules} from 'react-native'
import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import * as actions from '../actions/collectionsAction'
import { CollectionsApi } from '../api/apis'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function collectionsInitEpic (action$) {
  return action$.ofType(actions.COLLECTIONS_INIT)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, page, net) => ({token, page, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    console.warn('epic  --->  it token  ' + it.page)
                    return Observable.from(CollectionsApi(it.token, it.page))
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
                return actions.collectionsData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return Observable.of(showError(NET_WORK_ERROR))
            })
       )
}

function collectionLoadingMoreEpic (action$) {
  return action$.ofType(actions.COLLECTIONS_LOADING_MORE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, page, net) => ({token, page, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    console.warn('epic  --->  it token  ' + it.page)
                    return Observable.from(CollectionsApi(it.token, it.page))
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
                return actions.collectionLoadingMoreData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return Observable.of(showError(NET_WORK_ERROR))
            })
       )
}

export default combineEpics(collectionsInitEpic, collectionLoadingMoreEpic)
