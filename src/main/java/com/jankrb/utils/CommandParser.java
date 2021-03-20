package com.jankrb.utils;

import com.jankrb.jBot;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;

import java.util.ArrayList;
import java.util.Arrays;

public class CommandParser {
    public CommandContainer parse(String rw, MessageReceivedEvent e) {

        String beheaded = rw.substring(jBot.config.getPreferences().node("commands").get("PREFIX", "!").length());
        String[] splitBeheaded = beheaded.split(" ");

        ArrayList<String> split = new ArrayList<>(Arrays.asList(splitBeheaded));

        String invoke = split.get(0);
        String[] args = new String[split.size()-1];
        split.subList(1, split.size()).toArray(args);

        return new CommandContainer(rw, beheaded, splitBeheaded, invoke, args, e);
    }

    public class CommandContainer {

        public final String raw;
        public final String beheaded;
        public final String[] splitBeheaded;
        public final String invoke;
        public final String[] args;
        public final MessageReceivedEvent event;

        public CommandContainer(String rw, String beheaded, String[] splitBeheaded, String invoke, String[] args, MessageReceivedEvent e) {
            this.raw = rw;
            this.beheaded = beheaded;
            this.splitBeheaded = splitBeheaded;
            this.invoke = invoke;
            this.args = args;
            this.event = e;
        }
    }

}
