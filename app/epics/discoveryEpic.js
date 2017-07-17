import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/discoverAction'
import {AsyncStorage, NativeModules} from 'react-native'
import { combineEpics } from 'redux-observable'
import { TopicsListApi, TopUsersApi } from '../api/apis'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function discoveryInitEpic (action$) {
  return action$.ofType(actions.DISCOVERY_INIT)
            .mergeMap(() =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    Observable.zip(
                        Observable.from(TopicsListApi(it.token, it.page)),
                        Observable.from(TopUsersApi(it.token)),
                        (topics, topUsers) => {
                          return {
                            topics, topUsers
                          }
                        })
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
                  return null
                }
            )
            .catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
        )
}

export default combineEpics(discoveryInitEpic)
