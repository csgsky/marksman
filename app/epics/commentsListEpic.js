import { Observable } from 'rxjs/Rx'
import { combineEpics } from 'redux-observable'
import {AsyncStorage} from 'react-native'
import { CommentCommentsApi, LikeCommentApi } from '../api/apis'
import * as actions from '../actions/commentListActions'
import PubSub from 'pubsub-js'

function commentsListInitEpic (action$) {
  return action$.ofType(actions.COMMENTS_LIST_INIT)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                token => ({token})
              ).flatMap(
                (it) => {
                  const {diaryId, ownerId, commentId} = action.payload
                  if (it.token) {
                    return Observable.from(CommentCommentsApi({diaryId, ownerId, commentId, page: 0, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                console.log(it)
                return actions.commentsListInitSuccess(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function commentsListMoreEpic (action$) {
  return action$.ofType(actions.COMMENTS_LIST_MORE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.payload.page),
                (token, page) => ({token, page})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    const {diaryId, ownerId, commentId} = action.payload
                    return Observable.from(CommentCommentsApi({diaryId, ownerId, commentId, page: it.page, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                console.log(it)
                return actions.commentsListMoreSuccess(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function commentsListLikeEpic (action$) {
  return action$.ofType(actions.COMMENTS_LIST_LIKE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                token => ({token})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    const {diaryId, ownerId, commentId} = action.payload
                    return Observable.from(LikeCommentApi({diaryId, ownerId, commentId, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                console.log(it.return_msg)
                if (it.return_code === 1) {
                  if (action.payload.index === 0) {
                    PubSub.publish('commentsLikeRefresh')
                  }
                  return actions.commentsListLikeSuccess({index: action.payload.index})
                }
              }).catch((error) => {
                console.log('epic error --->' + error)
              }))
}

export default combineEpics(commentsListInitEpic, commentsListMoreEpic, commentsListLikeEpic)
