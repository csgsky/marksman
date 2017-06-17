import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/personalCenterAction'
import { combineEpics } from 'redux-observable'
import { getUserProfile , getUnloginInfo} from '../api/apis'
import {AsyncStorage} from 'react-native'
import consts from '../utils/const'
function getProfileEpic (action$) {
  return action$.ofType(actions.PERSONAL_INFO_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.userId),
                (token, userId) => {
                  return {token, userId}
                }
              ).flatMap(
                it => {
                  if (it.token) {
                    return Observable.from(getUserProfile(it.token, it.userId))
                  } else {
                    return Observable.of(2)
                  }
                }
              ).map(it => {
                if (it.return_code === 1) {
                  console.warn('getProfileEpic success ===>  ' + it.account)
                  return actions.personalInfoData(it)
                } else {
                  console.warn('getProfileEpic error ===>  ' + it.return_code)
                  return action.personalInfoError(it.return_code)
                }
              }
            ).catch(error => {
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
