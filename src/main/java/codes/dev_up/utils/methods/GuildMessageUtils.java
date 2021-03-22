package codes.dev_up.utils.methods;

import codes.dev_up.utils.MySQL;
import codes.dev_up.utils.SQL;
import net.dv8tion.jda.api.entities.TextChannel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class GuildMessageUtils {

    public static HashMap<String, Object> getJoinMessage(long guild_id) {
        List<HashMap<String, Object>> content;

        content = SQL.listGet(new String[]{"join_channel", "join_message"}, new String[]{"guild_id = " + guild_id}, "guilds_messages");
        return content.get(0);
    }

    public static HashMap<String, Object> getLeaveMessage(long guild_id) {
        List<HashMap<String, Object>> content;

        content = SQL.listGet(new String[]{"leave_channel", "leave_message"}, new String[]{"guild_id = " + guild_id}, "guilds_messages");

        return content.get(0);
    }

    public static void setJoinMessage(long guild_id, TextChannel textChannel, String message) {
        MySQL.update(String.format("INSERT INTO guilds_messages (guild_id, join_channel, join_message) VALUES (%s, %s, '%s') ON DUPLICATE KEY UPDATE join_channel = %s, join_message = '%s'",
                guild_id, textChannel.getIdLong(), message, textChannel.getIdLong(), message));
    }

    public static void setLeaveMessage(long guild_id, TextChannel textChannel, String message) {
        MySQL.update(String.format("INSERT INTO guilds_messages (guild_id, leave_channel, leave_message) VALUES (%s, %s, '%s') ON DUPLICATE KEY UPDATE leave_channel = %s, leave_message = '%s'",
                guild_id, textChannel.getIdLong(), message, textChannel.getIdLong(), message));
    }

}
