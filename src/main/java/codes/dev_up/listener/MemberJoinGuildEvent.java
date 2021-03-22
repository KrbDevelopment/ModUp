package codes.dev_up.listener;

import codes.dev_up.utils.methods.GuildMessageUtils;
import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.events.guild.member.GuildMemberJoinEvent;
import net.dv8tion.jda.api.events.guild.member.GuildMemberRemoveEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import org.jetbrains.annotations.NotNull;

import java.util.HashMap;
import java.util.Objects;

public class MemberJoinGuildEvent extends ListenerAdapter {

    @Override
    public void onGuildMemberJoin(@NotNull GuildMemberJoinEvent event) {
        super.onGuildMemberJoin(event);

        System.out.println("Join");
        HashMap<String, Object> join = GuildMessageUtils.getJoinMessage(event.getGuild().getIdLong());

        if (join.size() <= 0) return;

        Objects.requireNonNull(event.getGuild().getTextChannelById((String) join.get("join_channel"))).sendMessage(new EmbedBuilder().setDescription((String) join.get("join_message")).build()).queue();
    }
}
