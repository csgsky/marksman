package com.zhy.qianyan.module;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.tendcloud.tenddata.TCAgent;
import com.zhy.qianyan.MainActivity;

/**
 * Created by allen on 17/8/4.
 */

public class SensorModule extends ReactContextBaseJavaModule {
    public SensorModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "TCAgent";
    }

    @ReactMethod
    public void track(String eventName, String label) {
        if (getCurrentActivity() instanceof MainActivity) {
            TCAgent.onEvent(getCurrentActivity(), eventName, label);
        }
    }

    @ReactMethod
    public void trackWithParams(String eventName,ReadableMap map) {

    }
}
