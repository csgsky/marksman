import 'rxjs'
import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/registerAction'
import { combineEpics } from 'redux-observable'
import {getVertiCodeApi, RegisterApi} from '../api/apis'
import {AsyncStorage} from 'react-native'
function vertiCodeEpic (action$) {
  return action$.ofType(actions.REGISTER_GET_CODE)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.account),
                (token, account) => {
                  return {token, account}
                }
              ).flatMap(
                it => {
                  if (it.account) {
                    return Observable.from(getVertiCodeApi(it.token, it.account))
                  } else {
                    return Observable.of(2)
                  }
                }
              ).map(it => {
                console.warn('it return code ==> ' + it)
                if (it.return_code === 2) {
                } else {
                  return actions.codeSuccess()
                }
              }
            ).catch(error => {
              console.warn('epic error --> ' + error)
            })
       )
}

function registerEpic (action$) {
  return action$.ofType(actions.REGISTER)
            .mergeMap((action) =>
              Observable.zip(
                Observable.from(AsyncStorage.getItem('token')),
                Observable.of(action.account),
                Observable.of(action.password),
                Observable.of(action.message),
                Observable.of(action.sex),
                Observable.of(action.sign),
                Observable.of(action.nickname),
                Observable.of(action.tags),
                (token, account, password, message, sex, sign, nickname, tags) => {
                  return {token, data: {account, password, message, sex, sign, nickname, tags}}
                }
              ).flatMap(
                it => {
                  if (it.token) {
                    console.log('flatMap REGISTER token ===> ' + it.token)
                    console.log('flatMap REGISTER account ===> ' + it.account)
                    console.log('flatMap REGISTER password ===> ' + it.password)
                    console.log('flatMap REGISTER message ===> ' + it.message)
                    console.log('flatMap REGISTER sex ===> ' + it.sex)
                    console.log('flatMap REGISTER sign ===> ' + it.sign)
                    console.log('flatMap REGISTER nickname ===> ' + it.nickname)
                    console.log('flatMap REGISTER tags ===> ' + it.tags)
                    return Observable.from(RegisterApi(it.token, it.data))
                  } else {
                    return Observable.of(2)
                  }
                }
              ).map(it => {
                console.warn('it return code ==> ' + it)
                if (it.return_code === 1) {
                  return actions.registerSuccess(it.user_id)
                } else {
                  return actions.registerError(it.return_msg)
                }
              }
            ).catch(error => {
              console.warn('epic error --> ' + error)
            })
       )
}
export default combineEpics(vertiCodeEpic, registerEpic)
