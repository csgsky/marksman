import {AsyncStorage, NativeModules} from 'react-native'
import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import { TopicApi, CommentsApi, FollowTopicApi, LikeCommentApi, UnfollowTopicApi, UnlikeCommentApi, LikeTopicApi } from '../api/apis'
import * as actions from '../actions/topic'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function topicInitEpic (action$) {
  return action$.ofType(actions.TOPIC_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.zip(
                    Observable.from(TopicApi(action.topicId, it.token)),
                    Observable.from(CommentsApi({id: action.diaryId, ownerId: action.ownerId, page: 0, userId: it.token})),
                    (topic, {comments}) => ({topic: topic.talk, comments, return_code: topic.return_code}))
                  }
                  return Observable.of(2)
                }).flatMap(data => Observable.of(data))
              .map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.topicData(it)
                }
                return showError(OTHER_ERROR)
              }
            )
            .catch((error) => {
              return Observable.of(showError(NET_WORK_ERROR))
            })
      )
}

function commentsMoreEpic (action$) {
  return action$.ofType(actions.TOPIC_COMMENTS_LOAD_MORE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.page + 1),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, page, net) => ({token, page, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(CommentsApi({id: action.diaryId, ownerId: action.ownerId, page: action.page, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.topicCommentsMoreData(it.comments)
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              return showError(OTHER_ERROR)
            })
       )
}

function topicFollowEpic (action$) {
  return action$.ofType(actions.TOPIC_FOLLOW)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(FollowTopicApi(action.diaryId, it.token))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.topicFollowSuccess()
                }
                return showError(OTHER_ERROR)
              }).catch((error) => {
                return showError(OTHER_ERROR)
              }))
}

function topicUnfollowEpic (action$) {
  return action$.ofType(actions.TOPIC_UNFOLLOW)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(UnfollowTopicApi(action.diaryId, it.token))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.topicUnfollowSuccess()
                }
                return showError(OTHER_ERROR)
              }).catch((error) => {
                return Observable.of(showError(NET_WORK_ERROR))
              }))
}

function commentLikeEpic (action$) {
  return action$.ofType(actions.TOPIC_COMMENT_LIKE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(LikeCommentApi({diaryId: action.diaryId, ownerId: action.ownerId, commentId: action.commentId, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.topicCommentLikeSuccess(action.index)
                }
                return showError(OTHER_ERROR)
              }).catch((error) => {
                return Observable.of(showError(NET_WORK_ERROR))
              }))
}

function commentUnlikeEpic (action$) {
  return action$.ofType(actions.TOPIC_COMMENT_UNLIKE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(UnlikeCommentApi({id: action.diaryId, ownerId: action.ownerId, commentId: action.commentId, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it === 1) {
                  return actions.topicCommentUnlikeSuccess(action.index)
                }
                return showError(OTHER_ERROR)
              }).catch((error) => {
                return Observable.of(showError(NET_WORK_ERROR))
              }))
}

function topicLikeEpic (action$) {
  return action$.ofType(actions.TOPIC_LIKE)
            .debounceTime(1000)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(LikeTopicApi({id: action.payload.diaryId, ownerId: action.payload.ownerId, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.topicLikeSuccess()
                }
                return showError(OTHER_ERROR)
              }).catch((error) => {
                return Observable.of(showError(NET_WORK_ERROR))
              }))
}

export default combineEpics(topicInitEpic, commentsMoreEpic, topicFollowEpic, topicUnfollowEpic, commentLikeEpic, commentUnlikeEpic, topicLikeEpic)
