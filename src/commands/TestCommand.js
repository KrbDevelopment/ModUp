console.log("=> Initing discord command: Test")

const name = "test"

async function run(message, args) {
    message.channel.send("Test success").catch(console.error)
}

module.exports = {
    name: name,
    run: run,
    permissions: []
}