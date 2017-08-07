//
//  SaveImage.m
//  marksman
//
//  Created by liu ting on 2017/8/7.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "SaveImage.h"

@implementation SaveImage

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(save: (NSString*)url)
{
  NSData *data = [NSData dataWithContentsOfURL:[NSURL  URLWithString:url]];
  UIImage * currentImage = [UIImage imageWithData:data];
  UIImageWriteToSavedPhotosAlbum(currentImage, self, @selector(image:didFinishSavingWithError:contextInfo:), nil);
}

- (void)image:(UIImage *)image didFinishSavingWithError:(NSError *)error contextInfo:(void *)contextInfo{
  
  if (error == nil) {
    
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"提示" message:@"已存入手机相册" delegate:self cancelButtonTitle:nil otherButtonTitles:@"确定", nil];
    [alert show];
    
  }else{
    
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"提示" message:@"保存失败" delegate:self cancelButtonTitle:nil otherButtonTitles:@"确定", nil];
    [alert show];
  }
  
}

@end
