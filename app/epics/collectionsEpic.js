import {AsyncStorage} from 'react-native'
import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import * as actions from '../actions/collectionsAction'
import { CollectionsApi } from '../api/apis'

function collectionsInitEpic (action$) {
  return action$.ofType(actions.COLLECTIONS_INIT)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                (token, page) => ({token, page})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    console.warn('epic  --->  it token  ' + it.page)
                    return Observable.from(CollectionsApi(it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                return actions.collectionsData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function collectionLoadingMoreEpic (action$) {
  return action$.ofType(actions.COLLECTIONS_LOADING_MORE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                (token, page) => ({token, page})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    console.warn('epic  --->  it token  ' + it.page)
                    return Observable.from(CollectionsApi(it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                return actions.collectionLoadingMoreData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

export default combineEpics(collectionsInitEpic, collectionLoadingMoreEpic)
