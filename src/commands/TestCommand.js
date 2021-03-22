console.log("=> Initing discord command: TestCommand")

const name = "testcommand"

function run(message, args) {
    message.channel.send("Test success").catch(console.error)
}

module.exports = {
    name: name,
    run: run,
}