const common = require("../../common");
const ranking = require("../utils/rankingFunctions");
console.log("=> Initing discord command: Userinfo")

const name = "userinfo"

function run(message, args) { //message = event | args = args
    const discord = common.data['discord'].discord

    if (args.length === 0) {
        const author = message.member
        var options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' };

        var nickname = author.user.username
        var usertag = nickname + "#" + author.user.discriminator
        var role = author.roles.highest

        var join_date = author.joinedAt.toLocaleDateString("en-US", options) + " " + author.joinedAt.toTimeString("it-IT").slice(0, 5)
        var create_date = author.user.createdAt.toLocaleDateString("en-US", options) + " " + author.user.createdAt.toTimeString("it-IT").slice(0, 5)

        if (author.premiumSince === null) {
            var status = "Member"
        } else {
            var status = "Server Booster"
        }

        ranking.getMemberLevel(message.guild.id, author.user.id).then((level)=>{
            console.log(level)
        })


        const UserinfoEmbed = new discord.MessageEmbed()
            .setColor('#825EE4')
            .setAuthor('modup.pro', 'https://i.imgur.com/VXk9cY8.png', 'https://modup.pro')
            .setDescription("Userinfo about <@!"+ author.user.id +">")

            .addFields(
                { name: "Nickname", value: nickname, inline: true },
                    { name: "Usertag", value: usertag, inline: true },
                    { name: "Server Role", value: role, inline: true },

                    { name: "Level", value: "Level ", inline: true },
                    { name: "Points", value: "8 Points", inline: true },
                    { name: "Rank", value: "#1", inline: true },

                    { name: "Joined Server", value: join_date, inline: true },
                    { name: "Created Account", value: create_date, inline: true },
                    { name: "Boost Status", value: status, inline: true },
            )

            .setTimestamp()
            .setFooter('modup.pro', 'https://i.imgur.com/VXk9cY8.png')

        message.channel.send(UserinfoEmbed);
    }
}

module.exports = {
    name: name,
    run: run,
    permissions: ['MANAGE_MESSAGES']
}