import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/personAction'
import { combineEpics } from 'redux-observable'
import { PersonalDiariesApi, PersonalInfoApi, FollowUserApi, UnFollowUserApi, LikeTopicApi } from '../api/apis'
import {AsyncStorage, NativeModules} from 'react-native'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function personInitEpic (action$) {
  return action$.ofType(actions.PERSON_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.zip(
                    Observable.from(PersonalInfoApi(it.token, action.id)),
                    Observable.from(PersonalDiariesApi(it.token, action.id, 0)),
                    (info, {diarys}) => ({info, diaries: diarys})).flatMap(it => Observable.of(it))
                  }
                  return Observable.of(2)
                }
              )
              .map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.info.return_code === 1) {
                  return actions.personData(it)
                }
                return showError(OTHER_ERROR)
              }
            )
            .catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
            })
          )
}

function personDiaryMoreEpic (action$) {
  return action$.ofType(actions.PERSON_DIARY_MORE)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page + 1),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, page, net) => ({token, page, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(PersonalDiariesApi(it.token, action.id, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.personDiaryMoreData(it.diarys)
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
            })
       )
}

function personFollowEpic (action$) {
  return action$.ofType(actions.PERSON_FOLLOW)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    if (action.payload.myFocus) {
                      return Observable.from(UnFollowUserApi(action.payload.userId, it.token))
                    }
                    return Observable.from(FollowUserApi(action.payload.userId, it.token))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.personFollowSuccess()
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
            })
       )
}

function diaryLikeEpic (action$) {
  return action$.ofType(actions.PERSON_DIARY_LIKE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(LikeTopicApi({id: action.payload.diaryId, ownerId: action.payload.ownerId, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.personDiaryLikeSuccess({index: action.payload.index})
                }
                return showError(OTHER_ERROR)
              }).catch((error) => {
                return Observable.of(showError(NET_WORK_ERROR))
              }))
}

export default combineEpics(personInitEpic, personDiaryMoreEpic, personFollowEpic, diaryLikeEpic)
