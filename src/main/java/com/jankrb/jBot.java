package com.jankrb;

import com.jankrb.utils.CommandParser;
import com.jankrb.utils.Config;
import com.jankrb.utils.HandlerManager;
import com.jankrb.utils.MySQL;
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.utils.Compression;
import net.dv8tion.jda.api.utils.cache.CacheFlag;

import javax.security.auth.login.LoginException;

public class jBot {

    public static JDABuilder builder;
    public static JDA jda;
    public static Config config;
    public static final CommandParser parser = new CommandParser();

    public static void main(String[] args) {
        boolean foundCustomConfig = false;

        if (args.length >= 1) {
            if (args[0] != null) {
                foundCustomConfig = true;
            }
        }

        if (foundCustomConfig) {
            config = new Config(args[0]);
        } else {
            config = new Config("config.ini");
        }

        try {
            builder = JDABuilder.createDefault(config.getPreferences().node("discord").get("TOKEN", "TOKEN"));
            builder.disableCache(CacheFlag.MEMBER_OVERRIDES, CacheFlag.VOICE_STATE);
            builder.setBulkDeleteSplittingEnabled(false);
            builder.setCompression(Compression.NONE);

            MySQL.connect();

            HandlerManager.initListeners();
            HandlerManager.initCommands();

            jda = builder.build();
        } catch (LoginException ignored) {}
    }
}
