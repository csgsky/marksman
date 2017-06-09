import 'rxjs'
import {AsyncStorage} from 'react-native'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/searchAction'
import { combineEpics } from 'redux-observable'
import { SearchDiaryApi } from '../api/apis'
function searchInitEpic (action$) {
  return action$.ofType(actions.SEARCH_PAGE_SEARCH_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.kw),
                Observable.of(0),
                (token, kw, page) => {
                  return {token, kw, page}
                }
              ).flatMap(
                it => {
                  if (it.token) {
                    console.log('epic  --->  it token  ' + it.token)
                    console.log('epic  --->  it kw  ' + it.kw)
                    console.log('epic  --->  it page  ' + it.page)
                    return Observable.from(SearchDiaryApi(it.token, it.kw, it.page))
                  } else {
                    return Observable.of(2)
                  }
                }
              ).map(it => {
                if (it.return_code === 1) {
                  console.log('search epic ===> ' + it.diarys.length)
                  if (it.diarys.length > 0) {
                    return actions.searchDiaryData(it.diarys)
                  } else {
                    return actions.searchEmpty()
                  }
                } else {
                  console.log('epic  ---> return_code ' + it.return_code)
                }
              }
            ).catch(error => {
              console.log('epic error --> ' + error)
            })
       )
}

export default combineEpics(searchInitEpic)
