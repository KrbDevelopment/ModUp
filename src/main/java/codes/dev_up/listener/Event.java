package codes.dev_up.listener;

import net.dv8tion.jda.api.events.GenericEvent;
import net.dv8tion.jda.api.events.guild.member.GuildMemberLeaveEvent;
import net.dv8tion.jda.api.events.guild.member.GuildMemberRemoveEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import org.jetbrains.annotations.NotNull;

public class Event extends ListenerAdapter {

    @Override
    public void onGenericEvent(@NotNull GenericEvent event) {
        System.out.println(event);

        if (event instanceof MemberJoinGuildEvent) {
            System.out.println("Join");
        } else if (event instanceof GuildMemberRemoveEvent) {
            System.out.println("Leave");
        }
    }
}
