//
//  SplashScreen.m
//  marksman
//
//  Created by liu ting on 2017/6/19.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "SplashScreen.h"
#import "Reachability.h"
#import "Toast.h"

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
  if (conn == NULL) {
    reject(@"002", @"get net failed", nil);
  }
  if ([conn currentReachabilityStatus] != NotReachable) {
    netInfo = @"1";
  } else {
    netInfo = @"0";
  }
  resolve(netInfo);
}


RCT_EXPORT_METHOD(saveImg: (NSString*)url)
{
  NSData *data = [NSData dataWithContentsOfURL:[NSURL  URLWithString:url]];
  UIImage * currentImage = [UIImage imageWithData:data];
  NSLog(@"%@", url);
  UIImageWriteToSavedPhotosAlbum(currentImage, self, @selector(image:didFinishSavingWithError:contextInfo:), nil);
}

- (void)image:(UIImage *)image didFinishSavingWithError:(NSError *)error contextInfo:(void *)contextInfo{
  UIWindow *keyWindow = [UIApplication sharedApplication].keyWindow;
  UIViewController *rootViewController = keyWindow.rootViewController;
  if (error == nil) {
    
    [rootViewController.view makeToast:@"已保存至相册"
                              duration:3.0
                              position:CSToastPositionCenter];
    // UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"提示" message:@"已保存至相册" delegate:self cancelButtonTitle:nil otherButtonTitles:@"确定", nil];
    // [alert show];
    
  }else{
    [rootViewController.view makeToast:@"保存失败"
                              duration:3.0
                              position:CSToastPositionCenter];
    // UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"提示" message:@"保存失败" delegate:self cancelButtonTitle:nil otherButtonTitles:@"确定", nil];
    // [alert show];
  }
  
}

@end
