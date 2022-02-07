# partybox
A small bot framework for [trollbox.party](https://trollbox.party)
### Install
```
npm install partybox
```
### Example
JavaScript example of this framework (TypeScript is also supported but not tested)
```js
const { Client, Command, User, HelpCommand } = require("partybox");

let client = new Client("!")
    .setUser(new User("testbot", "red"))

client.addCommand(new class TestCommand extends Command {
    cmd = "test";
    description = "Test command";
    usage = "<echoStr: string>"; // usage is used to determine the arguments that are required for the command to run
    aliases = ["t"];
    run(message) {
        //console.log(message.args.get('echoStr'))
        message.reply("Echo: " + message.args.get('echoStr')); // here you can get "echoStr" you defined in usage
    }
})
client.addCommand(new class NoArgsTestCommand extends Command {
    cmd = "testnoargs";
    description = "Test command with no arguments";
    usage = "";
    aliases = ["tna"];
    run(message) {
        message.reply("hello world your home is: "+message.author.home);
    }
})
client.addCommand(new class NoArgsTestCommand extends Command {
    cmd = "ownercheck";
    description = "Check if you are the owner of this bot";
    usage = "";
    aliases = ["oc", "owch"];
    whitelist = ["FJGF7JGFMDSECIA8787CCIAASGGFMIAA"] // put your home here, whitelist is used to determine if you can run this command
    run(message) {
        message.reply("You are the owner of this bot, "+message.author.name);
    }
})

client.addCommand(new HelpCommand())

client.connect();
```
### Documentation
You can read the documentation [here](https://nicejs-is-cool.github.io/partybox/).
