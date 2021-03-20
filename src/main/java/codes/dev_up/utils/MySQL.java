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
            Statement st = getConnection().createStatement();
            rs = st.executeQuery(command);
        } catch (Exception e) {
            System.out.println("[API] SQL Handshake failed");
        }
        return rs;
    }

}

class SQL {

    public static boolean tableExists(String table) {
        try {
            Connection connection = MySQL.getConnection();
            if (connection == null)
                return false;
            DatabaseMetaData metadata = connection.getMetaData();
            if (metadata == null)
                return false;
            ResultSet rs = metadata.getTables(null, null, table, null);
            if (rs.next())
                return true;
        } catch (Exception ignored) {}
        return false;
    }

    public static boolean insertData(String columns, String values, String table) {
        return MySQL.update("INSERT INTO " + table + " (" + columns + ") VALUES (" + values + ");");
    }

    public static boolean deleteData(String column, String logic_gate, String data, String table) {
        if (data != null)
            data = "'" + data + "'";
        return MySQL.update("DELETE FROM " + table + " WHERE " + column + logic_gate + data + ";");
    }

    public static boolean exists(String column, String data, String table) {
        if (data != null)
            data = "'" + data + "'";
        try {
            ResultSet rs = MySQL.query("SELECT * FROM " + table + " WHERE " + column + "=" + data + ";");
            if (rs.next())
                return true;
        } catch (Exception ignored) {}
        return false;
    }

    public static boolean deleteTable(String table) {
        return MySQL.update("DROP TABLE " + table + ";");
    }

    public static boolean truncateTable(String table) {
        return MySQL.update("TRUNCATE TABLE " + table + ";");
    }

    public static boolean createTable(String table, String columns) {
        return MySQL.update("CREATE TABLE IF NOT EXISTS " + table + " (" + columns + ");");
    }

    public static boolean upsert(String selected, Object object, String column, String data, String table) {
        if (object != null)
            object = "'" + object + "'";
        if (data != null)
            data = "'" + data + "'";
        try {
            ResultSet rs = MySQL.query("SELECT * FROM " + table + " WHERE " + column + "=" + data + ";");
            if (rs.next()) {
                MySQL.update("UPDATE " + table + " SET " + selected + "=" + object + " WHERE " + column + "=" + data + ";");
            } else {
                insertData(column + ", " + selected, "'" + data + "', '" + object + "'", table);
            }
        } catch (Exception ignored) {}
        return false;
    }

    public static boolean set(String selected, Object object, String column, String logic_gate, String data, String table) {
        if (object != null)
            object = "'" + object + "'";
        if (data != null)
            data = "'" + data + "'";
        return MySQL.update("UPDATE " + table + " SET " + selected + "=" + object + " WHERE " + column + logic_gate + data + ";");
    }

    public static boolean set(String selected, Object object, String[] where_arguments, String table) {
        String arguments = "";
        for (String argument : where_arguments)
            arguments = arguments + argument + " AND ";
        if (arguments.length() <= 5)
            return false;
        arguments = arguments.substring(0, arguments.length() - 5);
        if (object != null)
            object = "'" + object + "'";
        return MySQL.update("UPDATE " + table + " SET " + selected + "=" + object + " WHERE " + arguments + ";");
    }

    public static Object get(String selected, String[] where_arguments, String table) {
        String arguments = "";
        for (String argument : where_arguments)
            arguments = arguments + argument + " AND ";
        if (arguments.length() <= 5)
            return false;
        arguments = arguments.substring(0, arguments.length() - 5);
        try {
            ResultSet rs = MySQL.query("SELECT * FROM " + table + " WHERE " + arguments + ";");
            if (rs.next())
                return rs.getObject(selected);
        } catch (Exception ignored) {}
        return null;
    }

    public static ArrayList<Object> listGet(String selected, String[] where_arguments, String table) {
        ArrayList<Object> array = new ArrayList<>();
        String arguments = "";
        for (String argument : where_arguments)
            arguments = arguments + argument + " AND ";
        if (arguments.length() <= 5)
            return array;
        arguments = arguments.substring(0, arguments.length() - 5);
        try {
            ResultSet rs = MySQL.query("SELECT * FROM " + table + " WHERE " + arguments + ";");
            while (rs.next())
                array.add(rs.getObject(selected));
        } catch (Exception ignored) {}
        return array;
    }

    public static List<HashMap<String, Object>> listGet(String[] selected, String[] where_arguments, String table) {
        ArrayList<HashMap<String, Object>> array = new ArrayList<>();
        StringBuilder arguments = new StringBuilder();
        for (String argument : where_arguments)
            arguments.append(argument).append(" AND ");
        if (arguments.length() <= 5)
            return array;
        arguments = new StringBuilder(arguments.substring(0, arguments.length() - 5));

        String selection = "";

        for (int i = 0; i < selected.length; i++) {
            if (i != (selected.length - 1))
                selection = selection + selected[i] + ", ";
            else
                selection = selection + selected[i];
        }

        if (selection.equals(""))
            selection = "*";

        try {
            ResultSet rs = MySQL.query("SELECT " + selection + " FROM " + table + " WHERE " + arguments + ";");
            HashMap<String, Object> tHashmap = new HashMap<>();
            while (rs.next()) {
                for (String s : selected) {
                    tHashmap.put(s, rs.getObject(s));
                }

                array.add(tHashmap);
                tHashmap = new HashMap<>();
            }
        } catch (Exception ignored) {}

        return array;
    }

    public static Object get(String selected, String column, String logic_gate, String data, String table) {
        if (data != null)
            data = "'" + data + "'";
        try {
            ResultSet rs = MySQL.query("SELECT * FROM " + table + " WHERE " + column + logic_gate + data + ";");
            if (rs.next())
                return rs.getObject(selected);
        } catch (Exception ignored) {}
        return null;
    }

    public static ArrayList<Object> listGet(String selected, String column, String logic_gate, String data, String table) {
        ArrayList<Object> array = new ArrayList<>();
        if (data != null)
            data = "'" + data + "'";
        try {
            ResultSet rs = MySQL.query("SELECT * FROM " + table + " WHERE " + column + logic_gate + data + ";");
            while (rs.next())
                array.add(rs.getObject(selected));
        } catch (Exception ignored) {}
        return array;
    }

    public static int countRows(String table) {
        int i = 0;
        if (table == null)
            return i;
        ResultSet rs = MySQL.query("SELECT * FROM " + table + ";");
        try {
            while (rs.next())
                i++;
        } catch (Exception ignored) {}
        return i;
    }

    public static Boolean deleteRow(String[] where_arguments, String table) {
        String arguments = "";
        for (String argument : where_arguments)
            arguments = arguments + argument + " AND ";
        arguments = arguments.substring(0, arguments.length() - 5);

        return MySQL.update("DELETE FROM " + table + " WHERE " + arguments + ";");
    }

    public static Boolean executeVoidStatement(String statement) {

        if (!MySQL.isConnected())
            MySQL.connect();

        System.out.println(statement);

        return MySQL.update(statement);
    }
}