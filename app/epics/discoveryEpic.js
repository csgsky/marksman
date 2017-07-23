import { Observable } from 'rxjs/Rx'
import {AsyncStorage, NativeModules} from 'react-native'
import { combineEpics } from 'redux-observable'
import { TopicsListApi, TopUsersApi, UnFollowUserApi, FollowUserApi} from '../api/apis'
import {showError} from '../actions/common'
import * as actions from '../actions/discoverAction'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function discoveryInitEpic (action$) {
  return action$.ofType(actions.DISCOVERY_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  console.log(action)
                  if (it.token && it.net === '1') {
                    return Observable.zip(
                        Observable.from(TopicsListApi(it.token, 0)),
                        Observable.from(TopUsersApi(it.token)),
                        (topics, topUsers) => ({topics, topUsers}))
                  }
                  return Observable.of(2)
                }).flatMap(it => Observable.of(it))
                .map((it) => {
                  if (it === 2) {
                    return showError(NET_WORK_ERROR)
                  }
                  if (it.topics.return_code === 1 && it.topUsers.return_code === 1) {
                    return actions.discoveryData(it.topics.talks, it.topUsers.ranks, it.topUsers.banners)
                  }
                  console.log('epic  ---> return_code mistake')
                  return showError(NET_WORK_ERROR)
                }
            )
            .catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
        )
}

function discoveryMoreEpic (action$) {
  return action$.ofType(actions.DISCOVERY_MORE)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, page, net) => ({token, page, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(TopicsListApi(it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.discoveryMoreData(it.talks)
                }
                return showError(NET_WORK_ERROR)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}

function recommendUserFollowEpic(action$) {
  return action$.ofType(actions.RECOMMEND_USER_FOLLOWED)
    .mergeMap(action =>
      Observable.zip(
         Observable.from(AsyncStorage.getItem('token')),
         Observable.of(action.followedId),
         Observable.from(NativeModules.SplashScreen.getNetInfo()),
         (token, followedId, net) => ({token, followedId, net})
      ).flatMap((it) => {
        if (it.token && it.net === '1') {
          if (action.myFocus === 0) {
            console.log('走关注的接口')
            return Observable.from(FollowUserApi(it.followedId, it.token))
          } else if (action.myFocus === 1) {
            console.log('走取消关注的接口')
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
            return actions.recommendUserFollowSuccess(action.position)
          } else if (action.myFocus === 1) {
            return actions.recommendUserUnFollowSuccess(action.position)
          }
        }
        return showError(OTHER_ERROR)
      }).catch((error) => {
        console.log(error)
        return showError(OTHER_ERROR)
      })
    )
}

export default combineEpics(discoveryInitEpic, recommendUserFollowEpic, discoveryMoreEpic)
