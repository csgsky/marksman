import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import {AsyncStorage} from 'react-native'
import { MyFollowUsersApi, UnFollowUserApi, FollowUserApi } from '../api/apis'
import * as actions from '../actions/myFollowUsersAction'

function myFollowUsersInitEpic (action$) {
  return action$.ofType(actions.MY_FOLLOW_USERS_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                (token) => {
                  return {token}
                }
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(MyFollowUsersApi(it.token, 0))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 1) {
                  console.log(it)
                  console.log('epic  ---> MY_FOLLOW_USERS_INIT_SUCCESS ' + it.return_code)
                  return actions.myFollowUsersInitSuccess({users: it.users, isEmpty: it.isnull})
                }
                return undefined
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function myFollowUsersMoreEpic (action$) {
  return action$.ofType(actions.MY_FOLLOW_USERS_LOAD_MORE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.payload.page + 1),
                (token, page) => ({token, page})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(MyFollowUsersApi(it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                console.log('epic ---> MY_FOLLOW_USERS_MORE_SUCCESS')
                console.log(it)
                if (it.return_code === 1) {
                  return actions.myFollowUsersMoreSuccess({users: it.users})
                }
                return undefined
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function myFollowUsersFollowEpic(action$) {
  return action$.ofType(actions.MY_FOLLOW_USERS_FOLLOW)
    .mergeMap(action =>
      Observable.zip(
         Observable.from(AsyncStorage.getItem('token')),
         token => ({token})
      ).flatMap((it) => {
        console.log(action.payload)
        if (it.token) {
          if (action.payload.myFocus) {
            return Observable.from(UnFollowUserApi(action.payload.id, it.token))
          }
          return Observable.from(FollowUserApi(action.payload.id, it.token))
        }
        return Observable.of(2)
      }).map((it) => {
        if (it.return_code === 1) {
          console.warn('my follow follow epic ==> ' + action.payload.position)
          return actions.myFollowUsersFollowSuccess({position: action.payload.position, type: action.payload.type})
        }
        return null
      }).catch((error) => {
        console.log(error)
      })
    )
}

export default combineEpics(myFollowUsersInitEpic, myFollowUsersMoreEpic, myFollowUsersFollowEpic)
