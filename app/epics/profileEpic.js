import { Observable } from 'rxjs/Rx'
import {AsyncStorage, NativeModules} from 'react-native'
import { combineEpics } from 'redux-observable'
import * as actions from '../actions/profile'
import {getUserProfile, EditUserInfo, getUnloginInfo, ProfileCenterReminderApi} from '../api/apis'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'


function getProfileEpic (action$) {
  return action$.ofType(actions.PERSONAL_INFO_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.userId),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, userId, net) => ({token, userId, net})
              ).flatMap(
                (it) => {
                  if (it.net === '0') {
                    return Observable.of(2)
                  }
                  if (it.userId) {
                    return Observable.from(getUserProfile(it.token, it.userId))
                  }
                  return Observable.zip(
                    AsyncStorage.getItem('nickname'),
                    AsyncStorage.getItem('sign'),
                    (nickname, sign) => ({info: {nickname, sign, avtar: null, user_id: null}, return_code: 10})
                  ).flatMap(value => Observable.of(value))
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(OTHER_ERROR)
                }
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
              return showError(OTHER_ERROR)
            })
       )
}

function getUnLoginProfileEpic (action$) {
  return action$.ofType(actions.PERSONAL_UNLOGIN_INFO_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(AsyncStorage.getItem('devicedid')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, userId, net) => ({token, userId, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(getUnloginInfo(it.token, it.userId))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  console.warn('getUnLoginProfileEpic success ===>  ' + it.customer)
                  return actions.personalInfoData(it.customer)
                }
                return actions.personalInfoError(it.return_code)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}
// PERSONAL_SUBMIT_USERINFO
function submitUserInfoEpic(action$) {
  return action$.ofType(actions.PERSONAL_SUBMIT_USERINFO)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.payload),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, payload, net) => ({token, payload, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(EditUserInfo(it.token, it.payload))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  console.warn('submitUserInfoEpic success ===>  ')
                  return actions.submitUserInfoSuccess(action.newInfo)
                }
                return actions.submitUserInfoError(it.return_code)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}

function profileMessageEpic (action$) {
  return action$.ofType(actions.MESSAGE_PROFILECENER_REMINDER)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                token => ({token})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(ProfileCenterReminderApi(it.token))
                  }
                }
              ).map((it) => {
                if (it.return_code === 1) {
                  return actions.profileMessageReminderData(it)
                }
              }
            ).catch((error) => {
              console.log('profileMessageEpic error --> ' + error)
            })
       )
}

export default combineEpics(getProfileEpic, getUnLoginProfileEpic, submitUserInfoEpic, profileMessageEpic)
