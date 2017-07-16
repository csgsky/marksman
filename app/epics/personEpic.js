import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/personAction'
import { combineEpics } from 'redux-observable'
import { PersonalDiariesApi, PersonalInfoApi, FollowUserApi, UnFollowUserApi } from '../api/apis'
import {AsyncStorage} from 'react-native'
function personInitEpic (action$) {
  return action$.ofType(actions.PERSON_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.id),
                (token, id) => ({token, id})
              ).flatMap(
                it => Observable.zip(
                  Observable.from(PersonalInfoApi(it.token, action.id)),
                  Observable.from(PersonalDiariesApi(it.token, it.id, 0)),
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
                Observable.of(action.id),
                (token, id, page) => {
                  return {token, id, page}
                }
              ).flatMap(
                it => {
                  if (it.token) {
                    return Observable.from(PersonalDiariesApi(it.token, it.id, it.page))
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

function personFollowEpic (action$) {
  return action$.ofType(actions.PERSON_FOLLOW)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                token => ({token})
              ).flatMap(
                it => {
                  if (it.token) {
                    if (action.payload.myFocus) {
                      return Observable.from(UnFollowUserApi(action.payload.userId, it.token))
                    }
                    return Observable.from(FollowUserApi(action.payload.userId, it.token))
                  } else {
                    return Observable.of(2)
                  }
                }
              ).map(it => {
                if (it.return_code === 2) {
                } else {
                  return actions.personFollowSuccess()
                }
              }
            ).catch(error => {
              console.log('epic error --> ' + error)
            })
       )
}

export default combineEpics(personInitEpic, personDiaryMoreEpic, personFollowEpic)
