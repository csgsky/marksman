import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/trashActions'
import { combineEpics } from 'redux-observable'
import { TrashApi } from '../api/apis'
import {AsyncStorage} from 'react-native'
function trashInitEpic (action$) {
  return action$.ofType(actions.TRASH_INIT)
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
                    return Observable.from(TrashApi(it.token))
                  } else {
                    return Observable.of(2)
                  }
                }
              ).map(it => {
                if (it.return_code === 2) {
                } else {
                  console.log('epic  ---> return_code ' + it.return_code)
                  console.log('epic  ---> diary ' + it.diarys.length)
                  return actions.trashData(it)
                }
              }
            ).catch(error => {
              console.log('epic error --> ' + error)
            })
       )
}

export default combineEpics(trashInitEpic)
