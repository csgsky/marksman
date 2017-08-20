import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import {AsyncStorage, NativeModules} from 'react-native'
import { MyFollowTopicsApi, FollowTopicApi, UnfollowTopicApi } from '../api/apis'
import * as actions from '../actions/myFollowTopicsAction'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function myFollowTopicsInitEpic (action$) {
  return action$.ofType(actions.MY_FOLLOW_TOPICS_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => {
                  return {token, net}
                }
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(MyFollowTopicsApi(it.token, 0))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.myFollowTopicsInitSuccess({topics: it.talks, isEmpty: it.isnull})
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
            })
       )
}

function myFollowTopicsMoreEpic (action$) {
  return action$.ofType(actions.MY_FOLLOW_TOPICS_LOAD_MORE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.payload.page + 1),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, page, net) => ({token, page, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(MyFollowTopicsApi(it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.myFollowTopicsMoreSuccess({topics: it.talks})
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
            })
       )
}

function myFollowTopicsFollowEpic(action$) {
  return action$.ofType(actions.MY_FOLLOW_TOPICS_FOLLOW)
    .mergeMap(action =>
      Observable.zip(
         Observable.from(AsyncStorage.getItem('token')),
         Observable.from(NativeModules.SplashScreen.getNetInfo()),
         (token, net) => ({token, net})
      ).flatMap((it) => {
        if (it.token && it.net === '1') {
          if (action.payload.myFocus) {
            return Observable.from(UnfollowTopicApi(action.payload.id, it.token))
          }
          return Observable.from(FollowTopicApi(action.payload.id, it.token))
        }
        return Observable.of(2)
      }).map((it) => {
        if (it === 2) {
          return showError(NET_WORK_ERROR)
        }
        if (it.return_code === 1) {
          return actions.myFollowTopicsFollowSuccess({position: action.payload.position})
        }
        return showError(OTHER_ERROR)
      }).catch((error) => {
        return Observable.of(showError(NET_WORK_ERROR))
      })
    )
}

export default combineEpics(myFollowTopicsInitEpic, myFollowTopicsMoreEpic, myFollowTopicsFollowEpic)
