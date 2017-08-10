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
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                Observable.of(action.come4),
                Observable.from(AsyncStorage.getItem('tags')),
                (token, page, net, come4, tags) => ({token, page, net, come4, tags})
              ).flatMap(
                (it) => {
                  console.log('talksInitEpic ===> it ', it)
                  if (it.token && it.net === '1') {
                    console.log('talksInitEpic ===> has net', it.come4)
                    return Observable.from(TopicsListApi(it.token, it.page, it.come4, it.tags))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                console.log(it)
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (action.come4 === 'news') {
                  if (it.return_code === 1) {
                    return actions.topicListData(it.mymsgs)
                  }
                  return showError(OTHER_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.topicListData(it.talks)
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
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
                Observable.from(AsyncStorage.getItem('tags')),
                (token, page, come4, net, tags) => ({token, page, come4, net, tags})
              ).flatMap(
                (it) => {
                  console.log('talksMoreEpic ===> it ', it)
                  if (it.token && it.net === '1') {
                    console.log('talksMoreEpic ===> has net', it.come4)
                    return Observable.from(TopicsListApi(it.token, it.page, it.come4, it.tags))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                console.warn(it)
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (action.come4 === 'news') {
                  if (it.return_code === 1) {
                    return actions.topicListMoreData(it.mymsgs)
                  }
                  return showError(OTHER_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.topicListMoreData(it.talks)
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
            })
       )
}

export default combineEpics(talksInitEpic, talksMoreEpic)
