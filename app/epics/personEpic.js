import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/personAction'
import { combineEpics } from 'redux-observable'
import { PersonalDiariesApi, PersonalInfoApi } from '../api/apis'
import {AsyncStorage} from 'react-native'
function personInitEpic (action$) {
  return action$.ofType(actions.PERSON_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                (token) => {
                  return {token}
                }
              ).flatMap(
                it => Observable.zip(
                  Observable.from(PersonalInfoApi(it.token, action.id)),
                  Observable.from(PersonalDiariesApi(it.token, 0)),
                  (info, {diarys}) => ({info, diaries: diarys})
                ).flatMap(it => Observable.of(it))
              ).map(it => {
                if (it.info.return_code === 2 || it.diaries.return_code === 2) {
                } else {
                  console.log('epic  ---> personal info ' + it.info.return_code)
                  console.log('epic  ---> personal diaries ' + it.diaries)
                  return actions.personData(it)
                }
              }
            ).catch(error => {
              console.log('epic error --> ' + error)
            })
       )
}

function personDiaryMoreEpic (action$) {
  return action$.ofType(actions.PERSON_DIARY_MORE)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page + 1),
                (token, page) => {
                  return {token, page}
                }
              ).flatMap(
                it => {
                  if (it.token) {
                    return Observable.from(PersonalDiariesApi(it.token, it.page))
                  } else {
                    return Observable.of(2)
                  }
                }
              ).map(it => {
                if (it.return_code === 2) {
                } else {
                  return actions.personDiaryMoreData(it.diarys)
                }
              }
            ).catch(error => {
              console.log('epic error --> ' + error)
            })
       )
}

export default combineEpics(personInitEpic, personDiaryMoreEpic)
