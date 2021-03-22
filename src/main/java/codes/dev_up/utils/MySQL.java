package codes.dev_up.utils;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.prefs.Preferences;

public class MySQL {

    private static Connection con;

    public static Connection getConnection() {
        return con;
    }

    public static void setConnection(String host, String user, String password, String database, String port, Boolean ssl) {
        if (host == null || user == null || password == null || database == null)
            return;
        disconnect(false);

        try {
            con = DriverManager.getConnection("jdbc:mysql://" + host + ":" + port + "/" + database + "?autoReconnect=true&useSSL=" + ssl, user, password);
            System.out.println("[API] MySQL successfully connected to host");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("[API] MySQL failed to connect to host");
        }
    }

    public static void connect() {
        connect(true);
    }

    private static void connect(boolean message) {
        Preferences mysqlPref = codes.dev_up.DevUpBot.config.getPreferences().node("mysql");
        String host = mysqlPref.get("HOST", "127.0.0.1");
        String user = mysqlPref.get("USER", "root");
        String password = mysqlPref.get("PASS", "");
        String database = mysqlPref.get("BASE", "DevUP");
        String port = mysqlPref.get("PORT", "3306");
        Boolean ssl = mysqlPref.getBoolean("SSL", true);

        if (isConnected()) {
            System.out.println("[API] MySQL Connect Error: Already connected");
        } else {
            setConnection(host, user, password, database, port, ssl);
        }
    }

    public static void disconnect() {
        disconnect(true);
    }

    private static void disconnect(boolean message) {
        try {
            if (isConnected()) {
                con.close();
                System.out.println("[API] SQL disconnected");
            } else if (message) {
                System.out.println("[API] SQL Disconnect Error: No existing connection");
            }
        } catch (Exception e) {
            System.out.println("[API] SQL Disconnect Error: " + e.getMessage());
        }
        con = null;
    }

    public static void reconnect() {
        disconnect();
        connect();
    }

    public static boolean isConnected() {
        if (con != null)
            try {
                return !con.isClosed();
            } catch (Exception e) {
                System.out.println("[API] SQL Handshake failed");
            }
        return false;
    }

    public static boolean update(String command) {
        if (command == null)
            return false;
        boolean result = false;
        connect(false);
        try {
            Statement st = getConnection().createStatement();
            st.executeUpdate(command);
            st.close();
            result = true;
        } catch (Exception e) {
            System.out.println("[API] SQL Handshake failed");
        }
        disconnect(false);
        return result;
    }

    public static ResultSet query(String command) {
        if (command == null)
            return null;

        if (!isConnected())
            connect(false);

        ResultSet rs = null;
        try {
            System.out.println(command);
            Statement st = getConnection().createStatement();
            rs = st.executeQuery(command);
        } catch (Exception e) {
            System.out.println("[API] SQL Handshake failed");
        }
        return rs;
    }

}

