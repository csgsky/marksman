import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/discoverAction'
import {AsyncStorage} from 'react-native'
import { combineEpics } from 'redux-observable'
import { TopicsListApi, TopUsersApi } from '../api/apis'
function discoveryInitEpic (action$) {
  return action$.ofType(actions.DISCOVERY_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(0),
                (token, page) => {
                  return {token, page}
                }
              ).flatMap(
                it => Observable.zip(
                        Observable.from(TopicsListApi(it.token, it.page)),
                        Observable.from(TopUsersApi(it.token)),
                        (topics, topUsers) => {
                          return {
                            topics, topUsers
                          }
                        }
                       ).flatMap(it => Observable.of(it))
              ).map(it => {
                if (it.topics.return_code === 1 && it.topUsers.return_code === 1) {
                  return actions.discoveryData(it.topics.talks, it.topUsers.ranks, it.topUsers.banners)
                } else {
                  console.log('epic  ---> return_code mistake')
                  return actions.discoveryData(it)
                }
              }
            ).catch(error => {
              console.log('epic error --> ' + error)
            })
       )
}

export default combineEpics(discoveryInitEpic)
