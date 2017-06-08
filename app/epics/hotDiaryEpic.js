import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/hotDiaryAction'
import { combineEpics } from 'redux-observable'
import { FooterHotDiaryApi } from '../api/apis'
import {AsyncStorage} from 'react-native'
function hotDiaryInitEpic (action$) {
  return action$.ofType(actions.HOTDIARY_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                (token) => {
                  return {token}
                }
              ).flatMap(
                it => {
                  if (it.token) {
                    console.log('epic  --->  it token  ' + it.token)
                    return Observable.from(FooterHotDiaryApi(it.token))
                  } else {
                    return Observable.of(2)
                  }
                }
              ).map(it => {
                if (it.return_code === 2) {
                } else {
                  console.log('epic  ---> return_code ' + it.return_code)
                  console.log('epic  ---> diary ' + it.diarys.length)
                  return actions.recentDiaryData(it)
                }
              }
            ).catch(error => {
              console.log('epic error --> ' + error)
            })
       )
}

export default combineEpics(hotDiaryInitEpic)
