import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/loginActions'
import {login} from '../utils/NetUtils'
import { combineEpics } from 'redux-observable'
function loginEpic (action$) {
  return action$.ofType(actions.LOGIN)
            .mergeMap((action) =>
                Observable.zip(
                  Observable.of(action.sex),
                  Observable.of(action.sign),
                  Observable.of(action.nickname),
                  Observable.of(action.tags),
                  (sex, sign, nickname, tags) => {
                    console.log('epic  --->  username  ' + sex)
                    console.log('epic  --->  password  ' + sign)
                    console.log('epic  --->  password  ' + nickname)
                    console.log('epic  --->  password  ' + tags)
                    return {sex, sign, nickname, tags}
                  }
                ).flatMap(it => {
                  return Observable.from(login(it))
                }
                ).map(it => {
                  if (it != null) {
                    return actions.loginSuccess(it)
                  } else {
                    console.log('epic 异步有问题')
                  }
                }
                )
        )
}

export default combineEpics(loginEpic)
