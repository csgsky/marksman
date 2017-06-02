import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/recentDiaryAction'
import { combineEpics } from 'redux-observable'
import { FooterRecentDiaryApi } from '../api/apis'
function recentInitEpic (action$) {
  return action$.ofType(actions.RECENTDIARY_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.of(action.token),
                (token) => {
                  return {token}
                }
              ).flatMap(
                it => {
                  if (it.token) {
                    console.log('epic  --->  it token  ' + it.token)
                    return Observable.from(FooterRecentDiaryApi(it.token))
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

export default combineEpics(recentInitEpic)
