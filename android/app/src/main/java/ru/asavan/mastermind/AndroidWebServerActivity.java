package ru.asavan.mastermind;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

import java.util.LinkedHashMap;
import java.util.Map;


import com.luigivampa92.ndefemulation.NdefEmulation;
import com.luigivampa92.ndefemulation.ndef.UriNdefData;


public class AndroidWebServerActivity extends Activity {
    private static final int STATIC_CONTENT_PORT = 8080;
    private static final int WEB_SOCKET_PORT = 8088;
    private static final String WEB_GAME_URL = "https://asavan.github.io/mastermind/";
    public static final String LOCAL_IP = "127.0.0.1";
    public static final String LOCALHOST = "localhost";
    public static final String MAIN_LOG_TAG = "MASTERMIND_TAG";
    private static final boolean secure = false;

    private BtnUtils btnUtils;

    private NdefEmulation ndefEmulation;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        btnUtils = new BtnUtils(this, STATIC_CONTENT_PORT, WEB_SOCKET_PORT, secure);
        try {
            ndefEmulation = new NdefEmulation(this);
            addButtons(IpUtils.getIPAddressSafe());
        } catch (Exception e) {
            Log.e(MAIN_LOG_TAG, "main", e);
        }
    }

    private void addButtons(String formattedIpAddress) {
        HostUtils hostUtils = new HostUtils(STATIC_CONTENT_PORT, WEB_SOCKET_PORT, secure);
        final String host = hostUtils.getStaticHost(formattedIpAddress);
        final String webSocketHost = hostUtils.getSocketHost(formattedIpAddress);


        {
            Map<String, String> mainParams = new LinkedHashMap<>();
            mainParams.put("mode", "ai");
            btnUtils.addButtonTwa(WEB_GAME_URL, mainParams, R.id.button3);
            btnUtils.addButtonWebView(hostUtils.getStaticHost(LOCAL_IP), mainParams, R.id.button6);
        }
        {
            Map<String, String> b = new LinkedHashMap<>();
            b.put("color", "blue");
            b.put("wh", webSocketHost);
            b.put("sh", host);
            b.put("mode", "net");
            btnUtils.addButtonBrowser(host, b, R.id.button1);
            btnUtils.addButtonTwa(hostUtils.getStaticHost(LOCALHOST), b, R.id.button4, host);
            String netUrl = UrlUtils.getLaunchUrl(host, b);
            ndefEmulation.setCurrentEmulatedNdefData(new UriNdefData(netUrl));
        }
        Map<String, String> mainParams = new LinkedHashMap<>();
        mainParams.put("mode", "ai");
        btnUtils.launchTwa(hostUtils.getStaticHost(LOCALHOST), mainParams);
    }

    @Override
    protected void onDestroy() {
        ndefEmulation.setCurrentEmulatedNdefData(null);
        if (btnUtils != null) {
            btnUtils.onDestroy();
        }
        super.onDestroy();
    }
}
