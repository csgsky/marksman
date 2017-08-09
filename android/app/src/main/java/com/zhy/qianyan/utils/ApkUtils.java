package com.zhy.qianyan.utils;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

/**
 * Created by allen on 17/8/9.
 */

public class ApkUtils {

    public static PackageInfo getVersion(Context context) {
        PackageInfo info = null;
        try {
            info = context.getPackageManager().getPackageInfo(context.getPackageName(), 0);
            // 当前应用的版本名称
//            String versionName = info.versionName;
            // 当前版本的版本号
//            int versionCode = info.versionCode;
            // 当前版本的包名
//            String packageNames = info.packageName;
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        } finally {
            return info;
        }
    }

    public static String getVersionName(Context context) {
        PackageInfo info = getVersion(context);
        if (info != null) {
            return info.versionName;
        } else {
            return "彩蛋版本";
        }
    }
}
