import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/loginActions'
import {login} from '../utils/NetUtils'
import { combineEpics } from 'redux-observable'
function loginEpic (action$) {
  return action$.ofType(actions.LOGIN)
            .mergeMap((action) =>
                Observable.zip(
                  Observable.of(action.account),
                  Observable.of(action.password),
                  (account, password) => {
                    console.log('epic  --->  username  ' + account)
                    console.log('epic  --->  password  ' + password)
                    return {account, password}
                  }
                ).flatMap(it => {
                  console.log('epic  --->  username  ' + it.account)
                  console.log('epic  --->  password  ' + it.password)
                  return Observable.from(login(it))
                }
                ).map(it => {
                  if (it.success) {
                    return actions.loginSuccess(it.access_token, it.user_slug)
                  } else {
                    console.log('异步有问题')
                  }
                }
                )
        )
}

export default combineEpics(loginEpic)
