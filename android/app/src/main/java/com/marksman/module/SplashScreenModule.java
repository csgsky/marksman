package com.marksman.module;

import android.provider.Settings;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.marksman.utils.SplashScreen;

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
            Log.i("getIMSI"," androidId ===>  " + androidId);
            promise.resolve(androidId);

        } catch (Exception e) {
            e.printStackTrace();
            promise.reject(e.getMessage(), e);
        } catch (Throwable throwable) {
            throwable.printStackTrace();
        }
    }

//    @ReactMethod
//    public void getBrand(Promise promise) {
////        try {
////
////        }
//    }

}
