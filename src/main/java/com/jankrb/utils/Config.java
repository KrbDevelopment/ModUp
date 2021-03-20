package com.jankrb.utils;

import org.ini4j.Ini;
import org.ini4j.IniPreferences;

import java.io.File;
import java.io.IOException;
import java.util.prefs.Preferences;

public class Config {

    private String fileName;
    private Ini ini;
    private Preferences preferences;

    public Config(String fileName) {
        try {
            this.fileName = fileName;

            File file = new File(fileName);
            if (!file.exists()) {
                file.createNewFile();
            }

            this.ini = new Ini(file);
            this.preferences = new IniPreferences(ini);
        } catch (IOException ignored) {}
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Preferences getPreferences() {
        return this.preferences;
    }
}
