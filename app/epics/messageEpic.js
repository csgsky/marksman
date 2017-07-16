import { Observable } from 'rxjs/Rx'
import {AsyncStorage} from 'react-native'
import { combineEpics } from 'redux-observable'
import {SystemMessagesApi,
  MineMessageModeApi,
  MineMessageNotifApi,
  MineMessageCommentApi} from '../api/apis'
import * as actions from '../actions/message'

function systemMessageInitEpic (action$) {
  return action$.ofType(actions.MESSAGE_SYSTEM_NOTIFY_INIT)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.payload),
                (token, payload) => ({token, payload})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(SystemMessagesApi(it.token, it.payload.page))
                  }
                }
              ).map((it) => {
                if (it.return_code === 1) {
                  return actions.profileMessageReminderData(it.sysmsgs)
                }
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function systemMessageMoreEpic (action$) {
  return action$.ofType(actions.MESSAGE_SYSTEM_NOTIFY_MORE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.payload),
                (token, payload) => ({token, payload})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(SystemMessagesApi(it.token, it.payload.page))
                  }
                }
              ).map((it) => {
                if (it.return_code === 1) {
                  return actions.profileMessageReminderMoreData(it.sysmsgs)
                }
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function mineMessageModeEpic (action$) {
  return action$.ofType(actions.MINE_MESSAGE_MODE_INIT)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                token => ({token})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(MineMessageModeApi(it.token))
                  }
                }
              ).map((it) => {
                if (it.return_code === 1) {
                  return actions.mineMessageModeData(it.modes)
                }
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function mineMessageNotifInitEpic (action$) {
  return action$.ofType(actions.MINE_MESSAGE_NOTIF_INIT)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.payload),
                (token, payload) => ({token, payload})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(MineMessageNotifApi(it.token, it.payload.page))
                  }
                }
              ).map((it) => {
                if (it.return_code === 1) {
                  return actions.mineMessageNotifData(it.mymsgs)
                }
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function mineMessageCommentInitEpic (action$) {
  return action$.ofType(actions.MINE_MESSAGE_COMMENT_INIT)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.payload),
                (token, payload) => ({token, payload})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    return Observable.from(MineMessageCommentApi(it.token, it.payload.page))
                  }
                }
              ).map((it) => {
                if (it.return_code === 1) {
                  return actions.mineMessageCommentData(it.mymsgs)
                }
              }
            ).catch((error) => {
              console.log('epic error --> ' + error)
            })
       )
}

function mineMessageCommentMoreEpic (action$) {
  return action$.ofType(actions.MINE_MESSAGE_COMMENT_MORE)
            .mergeMap(action =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.payload),
                (token, payload) => ({token, payload})
              ).flatMap(
                (it) => {
                  if (it.token) {
                    console.log('mineMessageCommentMoreEpic page --> ', it.payload.page)
                    return Observable.from(MineMessageCommentApi(it.token, it.payload.page))
                  }
                }
              ).map((it) => {
                if (it.return_code === 1) {
                  return actions.mineMessageCommentMoreData(it.mymsgs)
                }
              }
            ).catch((error) => {
              console.log('mineMessageCommentMoreEpic error --> ' + error)
            })
       )
}

export default combineEpics(systemMessageInitEpic,
  systemMessageMoreEpic,
  mineMessageModeEpic,
  mineMessageNotifInitEpic,
  mineMessageCommentInitEpic,
  mineMessageCommentMoreEpic)
