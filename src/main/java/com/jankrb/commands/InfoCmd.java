package com.jankrb.commands;

import com.jankrb.jBot;
import com.jankrb.objects.Command;
import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.Permission;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;

import java.awt.*;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.time.temporal.TemporalAccessor;
import java.util.Date;

public class InfoCmd implements Command {

    @Override
    public boolean preaction(String[] args, MessageReceivedEvent event) {
        return false;
    }

    @Override
    public void action(String[] args, MessageReceivedEvent event) throws ParseException, IOException {
        String version = jBot.config.getPreferences().node("infocmd").get("VERSION", "v0.0.0");
        String github = jBot.config.getPreferences().node("infocmd").get("GITHUB", "v0.0.0");
        String author = jBot.config.getPreferences().node("infocmd").get("AUTHOR", "Creative Tim");
        String prefix = jBot.config.getPreferences().node("commands").get("PREFIX", "!");
        String clientid = jBot.config.getPreferences().node("discord").get("CLIENTID", "0");

        EmbedBuilder embed = new EmbedBuilder();
        embed.setTitle("Info");
        embed.setAuthor("jBot");
        embed.setColor(Color.CYAN);
        embed.addField("Running Version:", version, false);
        embed.addField("Sourcecode:", github, false);
        embed.addField("Author:", author, false);
        embed.addField("Prefix:", prefix, false);
        embed.addField("ClientID:", clientid, false);
        event.getChannel().sendMessage(embed.build()).queue();
    }

    @Override
    public void postaction(boolean success, MessageReceivedEvent event) {

    }

    @Override
    public void failedaction(boolean preFailed, boolean permissionFailed, MessageReceivedEvent event) {

    }

    @Override
    public Permission[] requirePermission() {
        return null;
    }

}
