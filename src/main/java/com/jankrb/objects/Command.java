package com.jankrb.objects;

import net.dv8tion.jda.api.Permission;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;

import java.io.IOException;
import java.text.ParseException;

public interface Command {

    boolean preaction(String[] args, MessageReceivedEvent event);
    void action(String[] args, MessageReceivedEvent event) throws ParseException, IOException;
    void postaction(boolean success, MessageReceivedEvent event);
    void failedaction(boolean preFailed, boolean permissionFailed, MessageReceivedEvent event);
    Permission[] requirePermission();

}
