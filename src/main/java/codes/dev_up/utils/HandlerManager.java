package codes.dev_up.utils;

import codes.dev_up.commands.InfoCmd;
import codes.dev_up.commands.backup.BackupCmd;
import codes.dev_up.commands.backup.LoadCmd;
import codes.dev_up.commands.moderation.ClearCmd;
import codes.dev_up.listener.CommandListener;

public class HandlerManager {

    public static void initListeners() {
        codes.dev_up.DevUpBot.builder.addEventListeners(new CommandListener());
    }

    public static void initCommands() {
        // Generic
        CommandListener.commands.put("info", new InfoCmd());

        // Moderation
        CommandListener.commands.put("clear", new ClearCmd());

        // Backups
        CommandListener.commands.put("bbackup", new BackupCmd());
        CommandListener.commands.put("binfo", new codes.dev_up.commands.backup.InfoCmd());
        CommandListener.commands.put("bload", new LoadCmd());
    }
}
