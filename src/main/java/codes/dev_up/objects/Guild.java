package codes.dev_up.objects;

import java.util.List;

class Guilds {
    public static List<Guild> guilds;
}

public class Guild {
    long guild_id;
    long owner_id;
    String join_message;
    String leave_message;


    public Guild(long guild_id, long owner_id, String joinMessage, String leaveMessage) {
        this.guild_id = guild_id;
        this.owner_id = owner_id;
        this.join_message = joinMessage;
        this.leave_message = leaveMessage;
    }

    public long getGuildId() {
        return guild_id;
    }

    public void setGuildId(long guild_id) {
        this.guild_id = guild_id;
    }

    public long getOwnerId() {
        return owner_id;
    }

    public void setOwnerId(long owner_id) {
        this.owner_id = owner_id;
    }

    public String getJoinMessage() {
        return join_message;
    }

    public void setJoinMessage(String joinMessage) {
        this.join_message = joinMessage;
    }

    public String getLeaveMessage() {
        return leave_message;
    }

    public void setLeaveMessage(String leaveMessage) {
        this.leave_message = leaveMessage;
    }
}
