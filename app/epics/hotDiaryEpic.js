import {AsyncStorage} from 'react-native'
import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import * as actions from '../actions/hotDiaryAction'
import { FooterHotDiaryApi } from '../api/apis'

function hotDiaryInitEpic (action$) {
  return action$.ofType(actions.HOTDIARY_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                (token, page) => ({token, page})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    console.log('epic  --->  it token  ' + it.token)
                    return Observable.from(FooterHotDiaryApi(it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                console.log('epic  ---> return_code ' + it.return_code)
                console.log('epic  ---> diary ' + it.diarys.length)
                return actions.hotDiaryData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}


function hotDiaryMoreEpic (action$) {
  return action$.ofType(actions.HOTDIARY_LOADING_MORE)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                (token, page) => ({token, page})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(FooterHotDiaryApi(it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                return actions.hotDiaryLoadingMoreData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

export default combineEpics(hotDiaryInitEpic, hotDiaryMoreEpic)
