import { Observable } from 'rxjs/Rx'
import * as actions from '../actions/homeActions'
import {getArticles} from '../utils/NetUtils'
import { combineEpics } from 'redux-observable'

function homeInitEpic (action$) {
  return action$.ofType(actions.HOME_INIT)
            .mergeMap((action) =>
              Observable.zip(
                Observable.of(action.token),
                Observable.of(action.token),
                (token1, token2) => {
                  return {token1, token2}
                }
              ).flatMap(it => {
                console.log('epic  --->  token  ' + it.token1)
                return Observable.from(getArticles(it.token1))
              }).map(it => {
                if (it.success) {
                  return actions.homeData(it.day_articles)
                } else {
                  console.log('异步有问题')
                }
              }
              )
            )
}

export default combineEpics(homeInitEpic)
