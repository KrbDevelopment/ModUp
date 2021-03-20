package codes.dev_up.utils;

import codes.dev_up.DevUpBot;
import codes.dev_up.commands.InfoCmd;
import codes.dev_up.commands.backup.BackupCmd;
import codes.dev_up.commands.backup.LoadCmd;
import codes.dev_up.commands.moderation.ClearCmd;
import codes.dev_up.commands.moderation.SetLeaveMessageCmd;
import codes.dev_up.listener.BotReadyEvent;
import codes.dev_up.listener.CommandListener;
import codes.dev_up.listener.MemberLeaveGuildEvent;
import codes.dev_up.objects.Guild;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

public class HandlerManager {

    public static void initListeners() {
        DevUpBot.builder.addEventListeners(new CommandListener());
        DevUpBot.builder.addEventListeners(new MemberLeaveGuildEvent());
        DevUpBot.builder.addEventListeners(new BotReadyEvent());
    }

    public static void initCommands() {
        // Generic
        CommandListener.commands.put("info", new InfoCmd());

        // Moderation
        CommandListener.commands.put("clear", new ClearCmd());

        // Administration
        CommandListener.commands.put("setleavemessage", new SetLeaveMessageCmd());

        // Backups
        CommandListener.commands.put("bbackup", new BackupCmd());
        CommandListener.commands.put("binfo", new codes.dev_up.commands.backup.InfoCmd());
        CommandListener.commands.put("bload", new LoadCmd());
    }
}
