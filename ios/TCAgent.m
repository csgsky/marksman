//
//  Track.m
//  marksman
//
//  Created by liu ting on 2017/8/4.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "TCAgent.h"
#import "TalkingData.h"

@implementation TCAgent

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(track: (NSString*)name
                  label: (NSString*)label)
{
  [TalkingData trackEvent:name label:label];
}

RCT_EXPORT_METHOD(trackWithParams: (NSString*)name
                  label: (NSString*)label
                  params: (NSDictionary*)params)
{
  [TalkingData trackEvent:name label:label parameters:params];
}

@end
