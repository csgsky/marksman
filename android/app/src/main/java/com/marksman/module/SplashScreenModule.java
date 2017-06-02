package com.marksman.module;

import android.Manifest;
import android.content.Context;
import android.telephony.TelephonyManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.marksman.utils.SplashScreen;
import com.tbruyelle.rxpermissions2.RxPermissions;

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
    public void getIMSI(Promise promise) {
        try {
            RxPermissions rxPermissions = new RxPermissions(getCurrentActivity());
            rxPermissions
                    .request(Manifest.permission.READ_PHONE_STATE)
                    .subscribe(granted -> {
                        if (granted) {
                            TelephonyManager manager = (TelephonyManager) getCurrentActivity().getSystemService(Context.TELEPHONY_SERVICE);
                            String imsi = manager.getSubscriberId();
                            promise.resolve(imsi);
                        } else {
                            promise.resolve("hahahha");
                        }
                    });


        } catch (Exception e) {
            e.printStackTrace();
            promise.reject(e.getMessage(), e);
        }
    }

//    @ReactMethod
//    public void getBrand(Promise promise) {
////        try {
////
////        }
//    }

}
