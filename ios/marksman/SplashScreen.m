//
//  SplashScreen.m
//  marksman
//
//  Created by liu ting on 2017/6/19.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "SplashScreen.h"
@implementation SplashScreen

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(getDeviceId,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *deviceUUID = [[[UIDevice currentDevice] identifierForVendor] UUIDString];
  if (deviceUUID) {
    resolve(deviceUUID);
  } else {
    reject(@"001", @"get device failed", nil);
  }
}

@end