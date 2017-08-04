import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import {AsyncStorage, NativeModules} from 'react-native'
import { MyFollowUsersApi, UnFollowUserApi, FollowUserApi } from '../api/apis'
import * as actions from '../actions/myFollowUsersAction'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function myFollowUsersInitEpic (action$) {
  return action$.ofType(actions.MY_FOLLOW_USERS_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(MyFollowUsersApi(it.token, 0))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  console.log(it)
                  console.log('epic  ---> MY_FOLLOW_USERS_INIT_SUCCESS ' + it.return_code)
                  return actions.myFollowUsersInitSuccess({users: it.users, isEmpty: it.isnull})
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}

function myFollowUsersMoreEpic (action$) {
  return action$.ofType(actions.MY_FOLLOW_USERS_LOAD_MORE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.payload.page + 1),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, page, net) => ({token, page, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(MyFollowUsersApi(it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                console.log('epic ---> MY_FOLLOW_USERS_MORE_SUCCESS')
                console.log(it)
                if (it.return_code === 1) {
                  return actions.myFollowUsersMoreSuccess({users: it.users})
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return Observable.of(showError(NET_WORK_ERROR))
            })
       )
}

function myFollowUsersFollowEpic(action$) {
  return action$.ofType(actions.MY_FOLLOW_USERS_FOLLOW)
    .mergeMap(action =>
      Observable.zip(
         Observable.from(AsyncStorage.getItem('token')),
         Observable.from(NativeModules.SplashScreen.getNetInfo()),
         (token, net) => ({token, net})
      ).flatMap((it) => {
        console.log(action.payload)
        if (it.token && it.net === '1') {
          if (action.payload.myFocus) {
            return Observable.from(UnFollowUserApi(action.payload.id, it.token))
          }
          return Observable.from(FollowUserApi(action.payload.id, it.token))
        }
        return Observable.of(2)
      }).map((it) => {
        if (it === 2) {
          return showError(NET_WORK_ERROR)
        }
        if (it.return_code === 1) {
          console.warn('my follow follow epic ==> ' + action.payload.position)
          return actions.myFollowUsersFollowSuccess({position: action.payload.position, type: action.payload.type})
        }
        return showError(OTHER_ERROR)
      }).catch((error) => {
        return Observable.of(showError(NET_WORK_ERROR))
      })
    )
}

export default combineEpics(myFollowUsersInitEpic, myFollowUsersMoreEpic, myFollowUsersFollowEpic)
