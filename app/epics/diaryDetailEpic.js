import {AsyncStorage, NativeModules} from 'react-native'
import PubSub from 'pubsub-js'
import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/diaryDetailAction'
import {trashDeleteSuccess} from '../actions/trashActions'
import { CommentsApi, LikeTopicApi, LikeCommentApi, deleteDiary } from '../api/apis'
import {showError} from '../actions/common'
import {NET_WORK_ERROR, OTHER_ERROR} from '../constant/errors'

function diaryCommentInitEpic (action$) {
  return action$.ofType(actions.DIARY_COMMENT_INIT)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(CommentsApi({id: action.id, ownerId: action.ownerId, page: 0, userId: it.token}))
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
                // console.log('epic  ---> topic ' + it.topic)
                return actions.diaryCommentData(it)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}
function commentsMoreEpic (action$) {
  return action$.ofType(actions.DIARY_COMMENTS_LOAD_MORE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(CommentsApi({id: action.id, ownerId: action.ownerId, page: action.page + 1, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  return actions.diaryCommentsMoreData(it.comments)
                }
                return showError(OTHER_ERROR)
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
              return showError(OTHER_ERROR)
            })
       )
}


function diaryLikeEpic (action$) {
  return action$.ofType(actions.DIARY_LIKE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(LikeTopicApi({id: action.payload.id, ownerId: action.payload.ownerId, userId: it.token}))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                if (it.return_code === 1) {
                  PubSub.publish('refreshDiaryList')
                  return actions.diaryLikeSuccess()
                }
                return null
              }).catch((error) => {
                console.log('epic error --->' + error)
                return showError(OTHER_ERROR)
              }))
}

function diaryCommentLikeEpic (action$) {
  return action$.ofType(actions.DIARY_COMMENT_LIKE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, net) => ({token, net})
              ).flatMap(
                (it) => {
                  console.log({token: it.token})
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
                console.log(it.return_msg)
                if (it.return_code === 1) {
                  return actions.diaryCommentLikeSuccess({index: action.payload.index})
                }
                return null
              }).catch((error) => {
                console.log('epic error --->' + error)
                return showError(OTHER_ERROR)
              }))
}

function deleteDiaryEpic (action$) {
  return action$.ofType(actions.DIARY_DETAIL_DELETE_DIARY)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.payload),
                Observable.from(NativeModules.SplashScreen.getNetInfo()),
                (token, payload, net) => ({token, payload, net})
              ).flatMap(
                (it) => {
                  if (it.token && it.net === '1') {
                    return Observable.from(deleteDiary(it.token, it.payload))
                  }
                  return Observable.of(2)
                }
              ).map((it) => {
                if (it === 2) {
                  return showError(NET_WORK_ERROR)
                }
                console.warn(it.return_msg)
                if (it.return_code === 1) {
                  if (action.payload.mode === 0) {
                    return actions.deleteDiarySuccess()
                  } else {
                    PubSub.publish('refreshTrashList')
                    return trashDeleteSuccess()
                  }
                }
                return null
              }).catch((error) => {
                console.log('epic error --->' + error)
                return showError(OTHER_ERROR)
              }))
}

export default combineEpics(diaryCommentInitEpic, diaryLikeEpic, diaryCommentLikeEpic, deleteDiaryEpic, commentsMoreEpic)
