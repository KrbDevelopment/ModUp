package com.jankrb.listener;

import com.jankrb.jBot;
import com.jankrb.objects.Command;
import com.jankrb.utils.CommandParser;
import net.dv8tion.jda.api.Permission;
import net.dv8tion.jda.api.entities.ChannelType;
import net.dv8tion.jda.api.entities.TextChannel;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;

public class CommandListener extends ListenerAdapter {

    public static HashMap<String, Command> commands = new HashMap<>();

    private void addToLogfile(MessageReceivedEvent e) throws IOException {
        File logFile = new File("CMDLOG.txt");
        BufferedWriter bw = new BufferedWriter(new FileWriter(logFile, true));

        if (!logFile.exists())
            logFile.createNewFile();

        bw.write(String.format("%s [%s (%s)] [%s (%s)] '%s'\n",
                System.currentTimeMillis(),
                e.getGuild().getName(),
                e.getGuild().getId(),
                e.getAuthor().getName(),
                e.getAuthor().getId(),
                e.getMessage().getContentRaw()));
        bw.close();

    }

    @Override
    public void onMessageReceived(MessageReceivedEvent e) {
        if (e.getChannelType().equals(ChannelType.PRIVATE)) return;

        if (e.getMessage().getContentRaw().startsWith(jBot.config.getPreferences().node("commands").get("PREFIX", "!")) && !e.getMessage().getAuthor().getId().equals(e.getJDA().getSelfUser().getId())) {
            try {
                handleCommand(jBot.parser.parse(e.getMessage().getContentRaw(), e));
                addToLogfile(e);
            } catch (ParseException | IOException e1) {
                e1.printStackTrace();
            }
        }
    }

    public static void handleCommand(CommandParser.CommandContainer cmd) throws ParseException, IOException {

        if (commands.containsKey(cmd.invoke.toLowerCase())) {
            boolean safe = commands.get(cmd.invoke.toLowerCase()).preaction(cmd.args, cmd.event);
            boolean pSafe = true;

            for (Permission permission : commands.get(cmd.invoke.toLowerCase()).requirePermission()) {
                if (!cmd.event.getMember().hasPermission(permission) || !pSafe) {
                    pSafe = false;
                }
            }

            if (!safe || !pSafe) {
                commands.get(cmd.invoke.toLowerCase()).action(cmd.args, cmd.event);
                commands.get(cmd.invoke.toLowerCase()).postaction(safe, cmd.event);
            } else {
                commands.get(cmd.invoke.toLowerCase()).failedaction(safe, pSafe, cmd.event);
            }
        }
    }
}
