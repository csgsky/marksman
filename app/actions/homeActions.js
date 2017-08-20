import {Alert, NativeModules} from 'react-native'
import Rx from 'rxjs'

export const HOME_INIT = 'HOME_INIT'
export const HOME_DATA = 'HOME_DATA'
export const HOME_LOADING_MORE = 'HOME_LOADING_MORE'
export const HOME_LOADING_MORE_DATA = 'HOME_LOADING_MORE_DATA'
export const HOME_VISITOR = 'HOME_VISITOR'
export const HOME_CHECK_VERSION = 'HOME_CHECK_VERSION'
export const HOME_CHECK_VERSION_DATA = 'HOME_CHECK_VERSION_DATA'

export function visitor () {
  return {
    type: HOME_VISITOR
  }
}
export function homeInit (page) {
  return {
    type: HOME_INIT,
    isRefreshing: true,
    page
  }
}

export function homeData (data) {
  return {
    type: HOME_DATA,
    isRefreshing: false,
    diarys: data.diarys,
    hasMoreData: data.diarys.length >= 10,
    isLoadingMore: false
  }
}
export function homeLoadingMore (page) {
  return {
    type: HOME_LOADING_MORE,
    isLoadingMore: true,
    page
  }
}

export function homeLoadingMoreData (data) {
  return {
    type: HOME_LOADING_MORE_DATA,
    isLoadingMore: false,
    diarys: data.diarys,
    hasMoreData: data.diarys.length >= 10
  }
}

export function checkVersion () {
  return {
    type: HOME_CHECK_VERSION
  }
}

export function checkVersionData (data) {
  // NativeModules.SplashScreen.toChrome(data.download_url)
  // alert(data.current_ver)
  // Rx.Observable.from(NativeModules.SplashScreen.getCurrentVersion()).subscribe(it => {
  //   if (it < data.current_ver) {
  //     Alert.alert(data.title,
  //       data.content,
  //       [
  //         {text: '取消'},
  //         {text: '确定', onPress: () => NativeModules.SplashScreen.toChrome(data.download_url)}
  //       ],
  //       { cancelable: true })
  //   }
  // })
  return {
    type: HOME_CHECK_VERSION_DATA
  }
}
