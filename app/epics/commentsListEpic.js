import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import {AsyncStorage, NativeModules} from 'react-native'
import { CommentCommentsApi, LikeCommentApi, PostCommentCommentApi } from '../api/apis'
import * as actions from '../actions/commentListActions'
import PubSub from 'pubsub-js'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function commentsListInitEpic (action$) {
  return action$.ofType(actions.COMMENTS_LIST_INIT)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  const {diaryId, ownerId, commentId} = action.payload
                  if (it.token && it.net === '1') {
                    return Observable.from(CommentCommentsApi({diaryId, ownerId, commentId, page: 0, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 2) {
                  return null
                }
                console.log(it)
                return actions.commentsListInitSuccess(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}

function commentsListMoreEpic (action$) {
  return action$.ofType(actions.COMMENTS_LIST_MORE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.payload.page),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, page, net) => ({token, page, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    const {diaryId, ownerId, commentId} = action.payload
                    return Observable.from(CommentCommentsApi({diaryId, ownerId, commentId, page: it.page, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 2) {
                  return null
                }
                console.log(it)
                return actions.commentsListMoreSuccess(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}

function commentsListLikeEpic (action$) {
  return action$.ofType(actions.COMMENTS_LIST_LIKE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    const {diaryId, ownerId, commentId} = action.payload
                    return Observable.from(LikeCommentApi({diaryId, ownerId, commentId, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  if (action.payload.index === 0) {
                    PubSub.publish('commentsLikeRefresh')
                  }
                  return actions.commentsListLikeSuccess({index: action.payload.index})
                }
              }).catch((error) => {
                // console.log('epic error --->' + error)
                return Observable.of(showError(NET_WORK_ERROR))
              }))
}

function commentsCommentPostEpic (action$) {
  return action$.ofType(actions.COMMENTS_LIST_COMMENT_POST)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => {
                  return {token, net}
                }
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    const {diaryId, commentId, ownerId, data} = action.payload
                    return Observable.from(PostCommentCommentApi({diaryId, ownerId, commentId, data, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 2) {
                } else {
                  console.log('epic  ---> commentsCommentpostsuccess ')
                  console.log(it)
                  PubSub.publish('commentsListRefresh')
                  return actions.commentsListCommentPostSuccess()
                }
              }
            ).catch((error) => {
              // console.log('epic error --> ' + error)
              return Observable.of(showError(NET_WORK_ERROR))
            })
       )
}
export default combineEpics(commentsListInitEpic, commentsListMoreEpic, commentsListLikeEpic, commentsCommentPostEpic)
