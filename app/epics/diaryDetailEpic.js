import {AsyncStorage} from 'react-native'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/diaryDetailAction'
import { CommentsApi, LikeTopicApi, LikeCommentApi } from '../api/apis'

function diaryCommentInitEpic (action$) {
  return action$.ofType(actions.DIARY_COMMENT_INIT)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                token => ({token})
              ).flatMap(
                it => Observable.from(CommentsApi({id: action.id, ownerId: action.ownerId, page: 0, userId: it.token}))
              ).map((it) => {
                if (it.return_code === 2) {
                  return null
                }
                // console.log('epic  ---> topic ' + it.topic)
                return actions.diaryCommentData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function diaryLikeEpic (action$) {
  return action$.ofType(actions.DIARY_LIKE)
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
                  return actions.diaryLikeSuccess()
                }
              }).catch((error) => {
                console.log('epic error --->' + error)
              }))
}

function commentLikeEpic (action$) {
  return action$.ofType(actions.DIARY_COMMENT_LIKE)
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
                  return actions.diaryCommentLikeSuccess({index: action.payload.index})
                }
              }).catch((error) => {
                console.log('epic error --->' + error)
              }))
}

export default combineEpics(diaryCommentInitEpic, diaryLikeEpic, commentLikeEpic)
