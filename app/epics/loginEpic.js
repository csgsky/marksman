import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/loginActions'
import { combineEpics } from 'redux-observable'
import {AsyncStorage} from 'react-native'
import {LoginApi} from '../api/apis'
function loginEpic (action$) {
  return action$.ofType(actions.LOGIN)
            .mergeMap((action) =>
                Observable.zip(
                  Observable.from(AsyncStorage.getItem('token')),
                  Observable.of(action.account),
                  Observable.of(action.password),
                  (token, account, password) => {
                    return {token, data: {account, password}}
                  }
                ).flatMap(it => {
                  return Observable.from(LoginApi(it.token, it.data))
                }
                ).map(it => {
                  if (it.return_code === 1) {
                    return actions.loginSuccess(it, it.user_id)
                  } else {
                    return actions.loginError(it.return_msg)
                  }
                }
              ).catch(error => {
                console.warn('epic error --> ' + error)
              })
        )
}

export default combineEpics(loginEpic)
