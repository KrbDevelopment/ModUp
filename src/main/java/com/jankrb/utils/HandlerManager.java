package com.jankrb.utils;

import com.jankrb.commands.InfoCmd;
import com.jankrb.commands.backup.BackupCmd;
import com.jankrb.commands.backup.LoadCmd;
import com.jankrb.commands.moderation.ClearCmd;
import com.jankrb.jBot;
import com.jankrb.listener.CommandListener;
import net.dv8tion.jda.api.JDABuilder;

public class HandlerManager {

    public static void initListeners() {
        jBot.builder.addEventListeners(new CommandListener());
    }

    public static void initCommands() {
        // Generic
        CommandListener.commands.put("info", new InfoCmd());

        // Moderation
        CommandListener.commands.put("clear", new ClearCmd());

        // Backups
        CommandListener.commands.put("bbackup", new BackupCmd());
        CommandListener.commands.put("binfo", new com.jankrb.commands.backup.InfoCmd());
        CommandListener.commands.put("bload", new LoadCmd());
    }
}
