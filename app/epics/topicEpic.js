import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/topic'
import { combineEpics } from 'redux-observable'
import { TopicApi, CommentsApi, FollowTopicApi, LikeCommentApi, UnfollowTopicApi, UnlikeCommentApi, LikeTopicApi } from '../api/apis'
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
                  Observable.from(CommentsApi({id: action.diaryId, ownerId: action.ownerId, page: 0, userId: it.token})),
                  (topic, {comments}) => ({topic: topic.talk, comments})
                ).flatMap(data => Observable.of(data))
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                console.log(it.topic)
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
                    return Observable.from(CommentsApi({id: action.diaryId, ownerId: action.ownerId, page: action.page + 1, userId: it.token}))
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
                token => ({token})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(FollowTopicApi(action.diaryId, it.token))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                console.log(it.return_msg)
                if (it.return_code === 1) {
                  return actions.topicFollowSuccess()
                }
              }).catch((error) => {
                console.log('epic error --->' + error)
              }))
}

function topicUnfollowEpic (action$) {
  return action$.ofType(actions.TOPIC_UNFOLLOW)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                token => ({token})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    // 此处调用unfollo topic api
                    return Observable.from(UnfollowTopicApi(action.diaryId, it.token))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                console.log(it.return_code)
                if (it.return_code === 1) {
                  return actions.topicUnfollowSuccess()
                }
              }).catch((error) => {
                console.log('epic error --->' + error)
              }))
}

function commentLikeEpic (action$) {
  return action$.ofType(actions.TOPIC_COMMENT_LIKE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                token => ({token})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(LikeCommentApi({diaryId: action.diaryId, ownerId: action.ownerId, commentId: action.commentId, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                console.log(it.return_msg)
                if (it.return_code === 1) {
                  return actions.topicCommentLikeSuccess(action.index)
                }
              }).catch((error) => {
                console.log('epic error --->' + error)
              }))
}

function commentUnlikeEpic (action$) {
  return action$.ofType(actions.TOPIC_COMMENT_UNLIKE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                token => ({token})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    // 此处调用unfollo topic api
                    return Observable.from(UnlikeCommentApi({id: action.diaryId, ownerId: action.ownerId, commentId: action.commentId, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                console.log(it)
                if (it === 1) {
                  return actions.topicCommentUnlikeSuccess(action.index)
                }
              }).catch((error) => {
                console.log('epic error --->' + error)
              }))
}

function topicLikeEpic (action$) {
  return action$.ofType(actions.TOPIC_LIKE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                token => ({token})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(LikeTopicApi({id: action.payload.id, ownerId: action.payload.ownerId, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                console.log(it.return_msg)
                if (it.return_code === 1) {
                  return actions.topicLikeSuccess()
                }
              }).catch((error) => {
                console.log('epic error --->' + error)
              }))
}

export default combineEpics(topicInitEpic, commentsMoreEpic, topicFollowEpic, topicUnfollowEpic, commentLikeEpic, commentUnlikeEpic, topicLikeEpic)
