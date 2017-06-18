import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import {AsyncStorage} from 'react-native'
import { MyFollowUsersApi, UnFollowUserApi, FollowUserApi, TopicsListApi, FollowTopicApi, UnfollowTopicApi } from '../api/apis'
import * as actions from '../actions/myFollow'

function myFollowInitEpic (action$) {
  return action$.ofType(actions.MY_FOLLOW_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                (token) => {
                  return {token}
                }
              ).flatMap(
                (it) => {
                  if (it.token) {
                    console.log('epic  --->  it token  ' + it.token)
                    if (action.payload.type === 'users') {
                      return Observable.from(MyFollowUsersApi(it.token, 0))
                    }
                    return Observable.from(TopicsListApi(it.token, 0))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 1) {
                  console.log('epic  ---> MY_FOLLOW_INIT_SUCCESS ' + it.return_code)
                  return actions.myFollowInitSuccess({users: it.users, topics: it.talks || []})
                }
                return undefined
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function myFollowMoreEpic (action$) {
  return action$.ofType(actions.MY_FOLLOW_LOAD_MORE)
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
                console.log('epic ---> MY_FOLLOW_MORE_SUCCESS')
                console.log(it)
                if (it.return_code === 1) {
                  return actions.myFollowMoreSuccess({users: it.users || [], topics: it.talks || [], type: action.payload.type})
                }
                return undefined
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function myFollowFollowEpic(action$) {
  return action$.ofType(actions.MY_FOLLOW_FOLLOW)
    .mergeMap(action =>
      Observable.zip(
         Observable.from(AsyncStorage.getItem('token')),
         token => ({token})
      ).flatMap((it) => {
        console.log(action.payload)
        if (it.token) {
          if (action.payload.myFocus) {
            if (action.payload.type === 'topics') {
              return Observable.from(UnfollowTopicApi(action.payload.id, it.token))
            }
            return Observable.from(UnFollowUserApi(action.payload.id, it.token))
          }
          if (action.payload.type === 'users') {
            return Observable.from(FollowTopicApi(action.payload.id, it.token))
          }
          return Observable.from(FollowUserApi(action.payload.id, null, it.token))
        }
        return Observable.of(2)
      }).map((it) => {
        if (it.return_code === 1) {
          console.warn('my follow follow epic ==> ' + action.payload.position)
          return actions.myFollowFollowSuccess({position: action.payload.position, type: action.payload.type})
        }
        return null
      }).catch((error) => {
        console.log(error)
      })
    )
}

export default combineEpics(myFollowMoreEpic, myFollowInitEpic, myFollowFollowEpic)
