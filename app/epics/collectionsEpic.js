import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/collectionsAction'
import { combineEpics } from 'redux-observable'
import { CollectionsApi } from '../api/apis'
function collectionsInitEpic (action$) {
  return action$.ofType(actions.COLLECTIONS_INIT)
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
                    return Observable.from(CollectionsApi(it.token))
                  } else {
                    return Observable.of(2)
                  }
                }
              ).map(it => {
                if (it.return_code === 2) {
                } else {
                  console.log('epic  ---> return_code ' + it.return_code)
                  return actions.collectionsData(it)
                }
              }
            ).catch(error => {
              console.log('epic error --> ' + error)
            })
       )
}

export default combineEpics(collectionsInitEpic)
