package com.zhy.qianyan.utils;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.support.annotation.Nullable;

import com.facebook.common.executors.UiThreadImmediateExecutorService;
import com.facebook.common.references.CloseableReference;
import com.facebook.datasource.DataSource;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.imagepipeline.core.ImagePipeline;
import com.facebook.imagepipeline.datasource.BaseBitmapDataSubscriber;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.imagepipeline.request.ImageRequestBuilder;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * Created by allen on 17/9/8.
 */

public class BitmapUtils {
    public interface BitmapLoadListener {

        void onLoaded(Bitmap bitmap);

        void onLoadFail();
    }

    public static void getBitmapFromUrl(Context callerContext, String uri, BitmapLoadListener listener) {
        if (listener == null || uri == null) {
            return;
        }
        ImagePipeline imagePipeline = Fresco.getImagePipeline();
        ImageRequestBuilder builder = ImageRequestBuilder.newBuilderWithSource(Uri.parse(uri));
        DataSource<CloseableReference<CloseableImage>> dataSource = imagePipeline.fetchDecodedImage(builder.build(), callerContext);
        dataSource.subscribe(new BaseBitmapDataSubscriber() {
            @Override
            protected void onNewResultImpl(@Nullable Bitmap bitmap) {
                if (bitmap != null) {
                    listener.onLoaded(bitmap);
                } else {
                    listener.onLoadFail();
                }
            }

            @Override
            protected void onFailureImpl(DataSource<CloseableReference<CloseableImage>> dataSource) {
                listener.onLoadFail();
            }
        }, UiThreadImmediateExecutorService.getInstance());
    }

    public static void saveImage(Context context,Bitmap bmp) {
        String orFileName = System.currentTimeMillis() + ".jpg";
        File file = new File("/sdcard/浅言");
        if (!file.exists())
            file.mkdir();
        file = new File("/sdcard/" + orFileName.trim());
        String fileName = file.getName();
        String mName = fileName.substring(0, fileName.lastIndexOf("."));
        String sName = fileName.substring(fileName.lastIndexOf("."));
        String newFilePath = "/sdcard/浅言" + "/" + mName + "_cropped" + sName;
        file = new File(newFilePath);
        try {
            file.createNewFile();
            FileOutputStream fos = new FileOutputStream(file);
            bmp.compress(Bitmap.CompressFormat.JPEG, 50, fos);
            fos.flush();
            fos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.parse("file://" + file.getAbsolutePath())));
    }
}
