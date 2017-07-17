import { Observable } from 'rxjs/Rx'
import {AsyncStorage, NativeModules} from 'react-native'
import { combineEpics } from 'redux-observable'
import { LovedUsersApi, FollowUserApi, UnFollowUserApi} from '../api/apis'
import * as actions from '../actions/lovedActions'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function lovedInitEpic (action$) {
  return action$.ofType(actions.LOVED_INIT)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, page, net) => ({token, page, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(LovedUsersApi(it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 2) {
                  return null
                }
                return actions.LovedListData(it.ranks)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}

function lovedMoreEpic (action$) {
  return action$.ofType(actions.LOVED_MORE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page + 1),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, page, net) => ({token, page, net})
                
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(LovedUsersApi(it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 2) {
                  return null
                }
                return actions.LovedListMoreData(it.ranks)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}

function lovedFollowedEpic(action$) {
  return action$.ofType(actions.LOVED_FOLLOWED)
    .mergeMap(action =>
      Observable.zip(
         Observable.from(AsyncStorage.getItem('token')),
         Observable.of(action.followedId),
         Observable.from(NativeModules.SplashScreen.getNetInfo()),
         (token, followedId, net) => ({token, followedId, net})
      ).flatMap((it) => {
        if (it.token && it.net === '1') {
          if (action.myFocus === 0) {
            return Observable.from(FollowUserApi(it.followedId, it.token))
          } else if (action.myFocus === 1) {
            return Observable.from(UnFollowUserApi(it.followedId, it.token))
          }
        }
        return Observable.of(2)
      }).map((it) => {
        if (it === 2) {
          return showError(NET_WORK_ERROR)
        }
        if (it.return_code === 1) {
          if (action.myFocus === 0) {
            return actions.LovedFollowSuccess(action.position)
          } else if(action.myFocus === 1) {
            return actions.LovedUnFollowSuccess(action.position)
          }
        }
        return null
      }).catch((error) => {
        console.log(error)
        return showError(OTHER_ERROR)
      })
    )
}

export default combineEpics(lovedInitEpic, lovedMoreEpic, lovedFollowedEpic)
