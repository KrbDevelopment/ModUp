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

    public static void initDatabases() {
        DevUpBot.jda.getGuilds().forEach(guild -> {
            String[] guilds_where_args = {String.format("guild_id = %s", guild.getId())};
            String[] guilds_select_args = {"guild_id", "owner_id", "join_message", "leave_message"};
            List<HashMap<String, Object>> guilds = SQL.listGet(guilds_select_args, guilds_where_args, "guilds");

            if (guilds.size() <= 0) return;

            Set<String> guildKey = guilds.get(0).keySet();
            HashMap<String, Object> content = new HashMap<>();
            guildKey.forEach(key -> {
                content.put(key, guilds.get(0).get(key));
            });

            System.out.println(content);
        });
    }
}
