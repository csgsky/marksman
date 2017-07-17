//
//  SplashScreen.m
//  marksman
//
//  Created by liu ting on 2017/6/19.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "SplashScreen.h"
#import "Reachability.h"

@implementation SplashScreen

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(getDeviceId,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *deviceUUID = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
//  NSString *deviceUUID = @"2345689056789fghjvbnm";
  if (deviceUUID) {
    resolve(deviceUUID);
  } else {
    reject(@"001", @"get device failed", nil);
  }
}

RCT_REMAP_METHOD(getNetInfo,
                 res:(RCTPromiseResolveBlock)resolve
                 rej:(RCTPromiseRejectBlock)reject)
{
  Reachability *conn = [Reachability reachabilityForInternetConnection];
  NSString *netInfo;
  if ([conn currentReachabilityStatus] != NotReachable) {
    netInfo = @"1";
  } else {
    netInfo = @"0";
  }
  resolve(netInfo);
}

@end
