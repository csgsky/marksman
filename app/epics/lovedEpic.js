import { Observable } from 'rxjs/Rx'
import {AsyncStorage} from 'react-native'
import { combineEpics } from 'redux-observable'
import { LovedUsersApi, FollowUserApi, UnFollowUserApi} from '../api/apis'
import * as actions from '../actions/lovedActions'

function lovedInitEpic (action$) {
  return action$.ofType(actions.LOVED_INIT)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                (token, page) => ({token, page})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(LovedUsersApi(it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                return actions.LovedListData(it.ranks)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function lovedMoreEpic (action$) {
  return action$.ofType(actions.LOVED_MORE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page + 1),
                (token, page) => ({token, page})
                
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(LovedUsersApi(it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                return actions.LovedListMoreData(it.ranks)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function lovedFollowedEpic(action$) {
  return action$.ofType(actions.LOVED_FOLLOWED)
    .mergeMap(action =>
      Observable.zip(
         Observable.from(AsyncStorage.getItem('token')),
         Observable.of(action.followedId),
         (token, followedId) => ({token, followedId})
      ).flatMap((it) => {
        if (it.token) {
          if (action.myFocus === 0) {
            return Observable.from(FollowUserApi(it.followedId, it.token))
          } else if (action.myFocus === 1) {
            return Observable.from(UnFollowUserApi(it.followedId, it.token))
          }
        }
        return Observable.of(2)
      }).map((it) => {
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
      })
    )
}

export default combineEpics(lovedInitEpic, lovedMoreEpic, lovedFollowedEpic)
