package codes.dev_up.listener;

import codes.dev_up.utils.methods.GuildMessageUtils;
import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.events.Event;
import net.dv8tion.jda.api.events.guild.GuildLeaveEvent;
import net.dv8tion.jda.api.events.guild.member.GuildMemberLeaveEvent;
import net.dv8tion.jda.api.events.guild.member.GuildMemberRemoveEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import org.jetbrains.annotations.NotNull;

import java.util.HashMap;
import java.util.Objects;

public class MemberLeaveGuildEvent extends ListenerAdapter {

    @Override
    public void onGuildMemberLeave(@NotNull GuildMemberLeaveEvent event) {
        super.onGuildMemberLeave(event);

        System.out.println("Leave");
        HashMap<String, Object> leave = GuildMessageUtils.getLeaveMessage(event.getGuild().getIdLong());

        if (leave.size() <= 0) return;

        Objects.requireNonNull(event.getGuild().getTextChannelById((String) leave.get("leave_channel"))).sendMessage(new EmbedBuilder().setDescription((String) leave.get("leave_message")).build()).queue();
    }
}
