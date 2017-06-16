import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/topic'
import { combineEpics } from 'redux-observable'
import { TopicApi, CommentsApi } from '../api/apis'
import {AsyncStorage} from 'react-native'
function topicInitEpic (action$) {
  return action$.ofType(actions.TOPIC_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                (token) => {
                  return {token}
                }
              ).flatMap(
                it => Observable.zip(
                  Observable.from(TopicApi(action.params.topicId, it.token)),
                  Observable.from(CommentsApi(action.params.topicId, action.params.ownerId, 0, it.token)),
                  (topic, {comments}) => ({topic: topic.talk, comments})
                ).flatMap(data => Observable.of(data))
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                console.log('epic  ---> topic ' + it.topic)
                return actions.topicData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function commentsMoreEpic (action$) {
  return action$.ofType(actions.TOPIC_COMMENTS_LOAD_MORE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page + 1),
                (token, page) => ({token, page})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(CommentsApi(action.topicId, action.ownderId, it.token, it.page))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                return actions.topicCommentsMoreData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

export default combineEpics(topicInitEpic, commentsMoreEpic)
