package codes.dev_up.commands.moderation;

import codes.dev_up.objects.Command;
import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.Permission;
import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.entities.MessageHistory;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;

import java.awt.*;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class ClearCmd implements Command {


    @Override
    public boolean preaction(String[] args, MessageReceivedEvent event) {
        return false;
    }

    @Override
    public void action(String[] args, MessageReceivedEvent event) throws ParseException, IOException {
        List<Message> msgs;
        MessageHistory history = new MessageHistory(event.getChannel());

        if (args.length <= 0) {
            try {
                while (true) {
                    msgs = history.retrievePast(1).complete();
                    msgs.get(0).delete().queue();
                }
            } catch (Exception ignored) {}
        } else {
            int count = Integer.parseInt(args[0]);

            if (count >= 100 && count <= 0) {
                Message clearedMsg = event.getTextChannel().sendMessage(":warning: The count of messages has to be between 1 and 99.").complete();

                new Timer().schedule(new TimerTask() {
                    @Override
                    public void run() {
                        clearedMsg.delete().queue();
                    }
                }, 2500);
                return;
            }

            msgs = history.retrievePast(count).complete();

            for (Message message : msgs) {
                message.delete().queue();
            }
        }

        Message clearedMsg = event.getTextChannel().sendMessage(":warning: Text messages have been deleted successfully.").complete();

        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                clearedMsg.delete().queue();
            }
        }, 2500);
    }

    @Override
    public void postaction(boolean success, MessageReceivedEvent event) {

    }

    @Override
    public void failedaction(boolean preFailed, boolean permissionFailed, MessageReceivedEvent event) {
        EmbedBuilder embed = new EmbedBuilder();
        embed.setColor(Color.RED);
        embed.setTitle("An error has incurred");

        if (preFailed) {
            embed.addField("Pre-Action check failed", "Our check before executing the command has failed for a unknown reason. Please try again later.", false);
        }

        if (permissionFailed) {
            embed.addField("Permission check failed", "You seem not to have enough permissions on this guild to execute this command. If you do, please contact the server owner.", false);
        }

        event.getChannel().sendMessage(embed.build()).queue();
    }

    @Override
    public Permission[] requirePermission() {
        return new Permission[]{Permission.MESSAGE_MANAGE};
    }

}
