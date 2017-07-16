import {AsyncStorage} from 'react-native'
import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import * as actions from '../actions/topicsAction'
import { TopicsListApi } from '../api/apis'


function talksInitEpic (action$) {
  return action$.ofType(actions.TOPICS_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                Observable.of(action.come4),
                (token, page, come4) => ({token, page, come4})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(TopicsListApi(it.token, it.page, it.come4))
                  }
                }
              ).map((it) => {
                if (it.return_code === 1) {
                  if (action.come4 === 'news') {
                    return actions.topicListData(it.mymsgs)
                  }
                  return actions.topicListData(it.talks)
                }
              }
            ).catch(error => {
              console.log('epic error --> ' + error)
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
                (token, page, come4) => ({token, page, come4})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(TopicsListApi(it.token, it.page, it.come4))
                  }
                }
              ).map(it => {
                if (it.return_code === 2) {
                } else {
                  return actions.topicListMoreData(it.talks)
                }
              }
            ).catch(error => {
              console.log('epic error --> ' + error)
            })
       )
}

export default combineEpics(talksInitEpic, talksMoreEpic)
