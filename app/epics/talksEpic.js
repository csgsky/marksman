import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import * as actions from '../actions/topicsAction'
import { TopicsListApi } from '../api/apis'
import {AsyncStorage, NativeModules} from 'react-native'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'


function talksInitEpic (action$) {
  return action$.ofType(actions.TOPICS_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                Observable.of(action.come4),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, page, net, come4) => ({token, page, net, come4})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(TopicsListApi(it.token, it.page, it.come4))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                console.log(it)
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.topicListData(it.talks)
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}

function talksMoreEpic (action$) {
  return action$.ofType(actions.TOPICS_MORE)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page + 1),
                Observable.of(action.come4),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, page, come4, net) => ({token, page, come4, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(TopicsListApi(it.token, it.page, it.come4))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.topicListMoreData(it.talks)
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}

export default combineEpics(talksInitEpic, talksMoreEpic)
