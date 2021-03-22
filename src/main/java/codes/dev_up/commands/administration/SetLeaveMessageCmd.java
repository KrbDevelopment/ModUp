package codes.dev_up.commands.administration;

import codes.dev_up.objects.Command;
import codes.dev_up.utils.methods.GuildMessageUtils;
import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.Permission;
import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.entities.TextChannel;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class SetLeaveMessageCmd implements Command {

    @Override
    public boolean preaction(String[] args, MessageReceivedEvent event) {
        return false;
    }

    @Override
    public void action(String[] args, MessageReceivedEvent event) throws ParseException, IOException {
        if (args.length >= 1) {
            String joinMessages = String.join(" ", args);
            List<TextChannel> tc = event.getMessage().getMentionedChannels();
            TextChannel textChannel = null;

            if (tc.size() <= 0) {
                textChannel = event.getGuild().getTextChannels().get(0);
            } else {
                textChannel = tc.get(0);
            }

            // Translate special placeholders
            joinMessages = joinMessages
                    .replace("%server_name%", event.getGuild().getName())
                    .replace("%user_name%", event.getAuthor().getName())
                    .replace("%user_id%", event.getAuthor().getId())
                    .replace(String.format("<#%s>", textChannel.getId().toString()), "");

            GuildMessageUtils.setLeaveMessage(event.getGuild().getIdLong(), textChannel, joinMessages);
            Message clearedMsg = event.getTextChannel().sendMessage(":warning: The leave message has been updated successfully.").complete();
            new Timer().schedule(new TimerTask() {
                @Override
                public void run() {
                    clearedMsg.delete().queue();
                }
            }, 2500);
        } else {
            String leave_message = "--";

            try {
                leave_message = (String) GuildMessageUtils.getLeaveMessage(event.getGuild().getIdLong()).get("leave_message");
            } catch (Exception ignored) {}

            event.getChannel().sendMessage(
                    new EmbedBuilder()
                            .setTitle("Custom Leave Message")
                            .setDescription("In order to create you're custom leave message, simple use this command: ```setleavemessage [leave message]```" +
                                    "\n To choose the channel, simply mention the channel with #channel." +
                                    "\n You can use the special placeholders below to personalize you're message:")
                            .addField("%server_name%", "Use this placeholder to automatically insert you're discord server name", true)
                            .addField("%user_name%", "Use this placeholder to automatically insert the leaving user's name", true)
                            .addField("%user_id%", "Use this placeholder to automatically insert the leaving user's id", true)
                            .addField("Current Leave Message:", leave_message == null ? "--" : leave_message, false)
                    .build()
            ).queue();
        }
    }

    @Override
    public void postaction(boolean success, MessageReceivedEvent event) {

    }

    @Override
    public void failedaction(boolean preFailed, boolean permissionFailed, MessageReceivedEvent event) {

    }

    @Override
    public Permission[] requirePermission() {
        return new Permission[]{Permission.MANAGE_SERVER};
    }

}
