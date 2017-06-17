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
                  Observable.from(TopicApi(action.topicId, it.token)),
                  Observable.from(CommentsApi({topicId: action.topicId, ownerId: action.ownerId, page: 0, userId: it.token})),
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
                    return Observable.from(CommentsApi({topicId: action.topicId, ownerId: action.ownerId, page: action.page + 1, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                console.log(it)
                return actions.topicCommentsMoreData(it.comments)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function topicFollowEpic (action$) {
  return action$.ofType(actions.TOPIC_FOLLOW)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page + 1),
                (token, page) => ({token, page})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(topicFollowEpic(action.id))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                console.log(it.return_message)
                return actions.topicFollowSuccess()
              }).catch((error) => {
                console.log('epic error --->' + error)
              }))
}

export default combineEpics(topicInitEpic, commentsMoreEpic, topicFollowEpic)
