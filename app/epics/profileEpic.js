import { Observable } from 'rxjs/Rx'
import {AsyncStorage} from 'react-native'
import { combineEpics } from 'redux-observable'
import * as actions from '../actions/profile'
import {getUserProfile} from '../api/apis'

function getProfileEpic (action$) {
  return action$.ofType(actions.PERSONAL_INFO_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.userId),
                (token, userId) => ({token, userId})
              ).flatMap(
                (it) => {
                  if (it.userId) {
                    return Observable.from(getUserProfile(it.token, it.userId))
                  }
                  return Observable.zip(
                    AsyncStorage.getItem('nickname'),
                    AsyncStorage.getItem('sign'),
                    (nickname, sign) => ({info: {nickname, sign, avtar: '', user_id: null}, return_code: 10})
                  ).flatMap(value => Observable.of(value))
                }
              ).map((it) => {
                if (it.return_code === 1) {
                  console.warn('getProfileEpic success ===>  ')
                  return actions.personalInfoData(it)
                } else if (it.return_code === 10) {
                  console.warn('getProfileEpic success unlogin ===>  ')
                  return actions.personalInfoData(it.info)
                }
                return action.personalInfoError(it.return_code)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function getUnLoginProfileEpic (action$) {
  return action$.ofType(actions.PERSONAL_UNLOGIN_INFO_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(AsyncStorage.getItem('devicedid')),
                (token, userId) => {
                  return {token, userId}
                }
              ).flatMap(
                it => {
                  if (it.token) {
                    return Observable.from(getUnloginInfo(it.token, it.userId))
                  } else {
                    return Observable.of(2)
                  }
                }
              ).map(it => {
                if (it.return_code === 1) {
                  console.warn('getUnLoginProfileEpic success ===>  ' + it.customer)
                  return actions.personalInfoData(it.customer)
                } else {
                  console.warn('getUnLoginProfileEpic error ===>  ' + it.return_code)
                  return action.personalInfoError(it.return_code)
                }
              }
            ).catch(error => {
              console.log('epic error --> ' + error)
            })
       )
}

export default combineEpics(getProfileEpic, getUnLoginProfileEpic)
