package com.zhy.qianyan.module;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Build;
import android.provider.Settings;
import android.view.View;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.zhy.qianyan.MainActivity;
import com.zhy.qianyan.utils.SplashScreen;

/**
 * Created by allen on 17/4/10.
 */

public class SplashScreenModule extends ReactContextBaseJavaModule {

    public SplashScreenModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SplashScreen";
    }

    @ReactMethod
    public void hide(){
        SplashScreen.hide(getCurrentActivity());
    }
    // 获取 imsi
    @ReactMethod
    public void getDeviceId(Promise promise) {
        try {

            String androidId = Settings.Secure.getString(
                    getCurrentActivity().getContentResolver(), Settings.Secure.ANDROID_ID);
//            Log.i("getIMSI"," androidId ===>  " + androidId);
            promise.resolve(androidId);

        } catch (Exception e) {
            e.printStackTrace();
            promise.reject(e.getMessage(), e);
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }

    @ReactMethod
    public void getNetInfo(Promise promise){
        try {
            ConnectivityManager cm = (ConnectivityManager) getCurrentActivity().getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo networkInfo = cm.getActiveNetworkInfo();
            boolean response = networkInfo != null && networkInfo.isConnected();
            if (response) {
                promise.resolve("1");
            } else {
                promise.resolve("0");
            }

        } catch (Exception e) {
            e.printStackTrace();
            promise.reject(e.getMessage(), e);
        }
    }

    @ReactMethod
    private void hideSystemNavigationBar() {
        if (getCurrentActivity() instanceof MainActivity) {
            if (Build.VERSION.SDK_INT > 11 && Build.VERSION.SDK_INT < 19) {
                getCurrentActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        View view = getCurrentActivity().getWindow().getDecorView();
                        view.setSystemUiVisibility(View.GONE);
                    }
                });

            } else if (Build.VERSION.SDK_INT >= 19) {
                getCurrentActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        View decorView = getCurrentActivity().getWindow().getDecorView();
                        int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_FULLSCREEN;
                        decorView.setSystemUiVisibility(uiOptions);
                    }
                });

            }
        }

    }
    @ReactMethod
    private void showSystemNavigationBar() {
        if (getCurrentActivity() instanceof MainActivity) {
            if (Build.VERSION.SDK_INT > 11 && Build.VERSION.SDK_INT < 19) {
                getCurrentActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        View view = getCurrentActivity().getWindow().getDecorView();
                        view.setSystemUiVisibility(View.VISIBLE);
                    }
                });

            } else if (Build.VERSION.SDK_INT >= 19) {
                getCurrentActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        View decorView = getCurrentActivity().getWindow().getDecorView();
                        int uiOptions = View.SYSTEM_UI_FLAG_VISIBLE;
                        decorView.setSystemUiVisibility(uiOptions);
                    }
                });

            }
        }

    }

//    @ReactMethod
//    public void getBrand(Promise promise) {
////        try {
////
////        }
//    }

}
