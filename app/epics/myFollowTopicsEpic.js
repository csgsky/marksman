import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import {AsyncStorage} from 'react-native'
import { MyFollowTopicsApi, FollowTopicApi, UnfollowTopicApi } from '../api/apis'
import * as actions from '../actions/myFollowTopicsAction'

function myFollowTopicsInitEpic (action$) {
  return action$.ofType(actions.MY_FOLLOW_TOPICS_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                (token) => {
                  return {token}
                }
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(MyFollowTopicsApi(it.token, 0))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 1) {
                  console.log('epic  ---> MY_FOLLOW_TOPICS_INIT_SUCCESS ' + it.return_code)
                  return actions.myFollowTopicsInitSuccess({topics: it.talks})
                }
                return undefined
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function myFollowTopicsMoreEpic (action$) {
  return action$.ofType(actions.MY_FOLLOW_TOPICS_LOAD_MORE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.payload.page + 1),
                (token, page) => ({token, page})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(MyFollowTopicsApi(it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                console.log('epic ---> MY_FOLLOW_TOPICS_MORE_SUCCESS')
                console.log(it)
                if (it.return_code === 1) {
                  return actions.myFollowTopicsMoreSuccess({topics: it.talks})
                }
                return undefined
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function myFollowTopicsFollowEpic(action$) {
  return action$.ofType(actions.MY_FOLLOW_TOPICS_FOLLOW)
    .mergeMap(action =>
      Observable.zip(
         Observable.from(AsyncStorage.getItem('token')),
         token => ({token})
      ).flatMap((it) => {
        console.log(action.payload)
        if (it.token) {
          if (action.payload.myFocus) {
            return Observable.from(UnfollowTopicApi(action.payload.id, it.token))
          }
          return Observable.from(FollowTopicApi(action.payload.id, it.token))
        }
        return Observable.of(2)
      }).map((it) => {
        if (it.return_code === 1) {
          console.warn('my follow follow epic ==> ' + action.payload.position)
          return actions.myFollowTopicsFollowSuccess({position: action.payload.position})
        }
        return null
      }).catch((error) => {
        console.log(error)
      })
    )
}

export default combineEpics(myFollowTopicsInitEpic, myFollowTopicsMoreEpic, myFollowTopicsFollowEpic)
