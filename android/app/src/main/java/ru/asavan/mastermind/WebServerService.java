package ru.asavan.mastermind;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

public class WebServerService extends Service {
    private final IBinder binder = new LocalBinder();
    private ScheduledExecutorService serverExecutor;

    public class LocalBinder extends Binder {
        WebServerService getService() {
            return WebServerService.this;
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        // Запускаем сервер в момент привязки (когда открывается TWA)
        startWebServer();
        return binder;
    }

    @Override
    public boolean onUnbind(Intent intent) {
        // Останавливаем сервер, когда TWA закрывается
        stopWebServer();
        return super.onUnbind(intent);
    }

    private void startWebServer() {
        if (serverExecutor == null || serverExecutor.isShutdown()) {
            serverExecutor = Executors.newScheduledThreadPool(2);
            // Логика вашего веб-сервера
        }
    }

    private void stopWebServer() {
        if (serverExecutor != null) {
            serverExecutor.shutdownNow();
        }
    }
}

