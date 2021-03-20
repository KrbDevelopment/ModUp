package codes.dev_up.commands.moderation;

import codes.dev_up.objects.Command;
import net.dv8tion.jda.api.Permission;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;

import java.io.IOException;
import java.text.ParseException;

public class SetJoinMessageCmd implements Command {

    @Override
    public boolean preaction(String[] args, MessageReceivedEvent event) {
        return false;
    }

    @Override
    public void action(String[] args, MessageReceivedEvent event) throws ParseException, IOException {

    }

    @Override
    public void postaction(boolean success, MessageReceivedEvent event) {

    }

    @Override
    public void failedaction(boolean preFailed, boolean permissionFailed, MessageReceivedEvent event) {

    }

    @Override
    public Permission[] requirePermission() {
        return new Permission[0];
    }

}
