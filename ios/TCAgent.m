//
//  Track.m
//  marksman
//
//  Created by liu ting on 2017/8/4.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "Track.h"
#import "TalkingData.h"

@implementation Track

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(track: (NSString*)name)
{
  [TalkingData trackEvent:name];
}

RCT_EXPORT_METHOD(trackWithParams: (NSString*)name
                  params: (NSDictionary*)params)
{
  [TalkingData trackEvent:name label:name parameters:params];
}

@end
