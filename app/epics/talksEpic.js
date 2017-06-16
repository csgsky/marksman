import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/topicsAction'
import { combineEpics } from 'redux-observable'
import { TopicsListApi } from '../api/apis'
import {AsyncStorage} from 'react-native'
function talksInitEpic (action$) {
  return action$.ofType(actions.TOPICS_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page),
                (token, page) => {
                  return {token, page}
                }
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(TopicsListApi(it.token, it.page))
                  } else {
                    return Observable.of(2)
                  }
                }
              ).map((it) => {
                if (it.return_code === 2) {
                } else {
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
                (token, page) => {
                  return {token, page}
                }
              ).flatMap(
                it => {
                  if (it.token) {
                    return Observable.from(TopicsListApi(it.token, it.page))
                  } else {
                    return Observable.of(2)
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
