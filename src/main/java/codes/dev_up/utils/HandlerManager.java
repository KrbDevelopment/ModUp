package codes.dev_up.utils;

import codes.dev_up.DevUpBot;
import codes.dev_up.commands.InfoCmd;
import codes.dev_up.commands.administration.SetJoinMessageCmd;
import codes.dev_up.commands.backup.BackupCmd;
import codes.dev_up.commands.backup.LoadCmd;
import codes.dev_up.commands.moderation.ClearCmd;
import codes.dev_up.commands.administration.SetLeaveMessageCmd;
import codes.dev_up.listener.*;

public class HandlerManager {

    public static void initPreListeners() {
        DevUpBot.builder.addEventListeners(new CommandListener());
        DevUpBot.builder.addEventListeners(new BotReadyEvent());
        DevUpBot.builder.addEventListeners(new MemberLeaveGuildEvent());
        DevUpBot.builder.addEventListeners(new MemberJoinGuildEvent());
        DevUpBot.builder.addEventListeners(new Event());
    }

    public static void initPostEventListener() {
        DevUpBot.jda.addEventListener(new MemberLeaveGuildEvent());
        DevUpBot.jda.addEventListener(new MemberJoinGuildEvent());
        DevUpBot.jda.addEventListener(new Event());
    }

    public static void initCommands() {
        // Generic
        CommandListener.commands.put("info", new InfoCmd());

        // Moderation
        CommandListener.commands.put("clear", new ClearCmd());

        // Administration
        CommandListener.commands.put("setleavemessage", new SetLeaveMessageCmd());
        CommandListener.commands.put("setjoinmessage", new SetJoinMessageCmd());

        // Backups
        CommandListener.commands.put("bbackup", new BackupCmd());
        CommandListener.commands.put("binfo", new codes.dev_up.commands.backup.InfoCmd());
        CommandListener.commands.put("bload", new LoadCmd());
    }
}
