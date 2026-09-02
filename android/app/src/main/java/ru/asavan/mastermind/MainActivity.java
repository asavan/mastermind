package ru.asavan.mastermind;

import android.content.ComponentName;
import android.content.ServiceConnection;
import android.os.IBinder;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.net.Uri;
import android.os.Bundle;
import android.os.IBinder;

import com.google.androidbrowserhelper.trusted.TwaLauncher;

public class MainActivity extends Activity { // Используем базовый класс
    private WebServerService webService;
    private boolean isBound = false;

    private final ServiceConnection serviceConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            WebServerService.LocalBinder binder = (WebServerService.LocalBinder) service;
            webService = binder.getService();
            isBound = true;
            launchTwa();
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            isBound = false;
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // setContentView(R.layout.activity_main); // Можно даже не раздувать layout, если интерфейс не нужен

        Intent intent = new Intent(this, WebServerService.class);
        bindService(intent, serviceConnection, Context.BIND_AUTO_CREATE);
    }

    private void launchTwa() {
        // Код запуска TWA остается прежним
        // Код запуска вашего Trusted Web Activity
        TwaLauncher launcher = new TwaLauncher(this);
        // launcher.launch(new TwaLauncher.TwaLaunchOptions.Builder(Uri.parse("https://your-twa-url.com")).build());
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (isBound) {
            unbindService(serviceConnection);
            isBound = false;
        }
    }
}


