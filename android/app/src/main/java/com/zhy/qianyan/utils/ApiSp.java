package com.zhy.qianyan.utils;

import android.content.Context;
import android.content.SharedPreferences;

import javax.inject.Inject;

/**
 * Created by allen on 17/8/16.
 */

public class ApiSp {

    public Context getContext() {
        return context;
    }

    private Context context;
    private SharedPreferences sp;

    private SharedPreferences getSp() {
        if (sp == null) {
            sp = context.getSharedPreferences("config", Context.MODE_PRIVATE);
        }
        return sp;
    }

    @Inject
    public ApiSp(Context context) {
        this.context = context;
    }

    // --------------------------------------------------------------
    // 记录当前 RN 页面, 主要是配合前端隐藏状态栏和虚拟键盘，在 app 从后台进程到主进程，会显示状态栏，这个时候在
    // onResume 的方法里面，再次隐藏状态栏
    public void setCurrentPage(String value) {
        getSp().edit().putString("0X000001", value).apply();
    }

    public String getCurrentPage() {
        return getSp().getString("0X000001", null);
    }


}

