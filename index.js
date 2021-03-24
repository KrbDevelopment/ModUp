const common = require('./common');
const fs = require('fs')
const {logConsole} = require("./src/utils/logFunctions");

console.log(`

$$\      $$\                 $$\ $$\   $$\ $$$$$$$\  
$$$\    $$$ |                $$ |$$ |  $$ |$$  __$$\ 
$$$$\  $$$$ | $$$$$$\   $$$$$$$ |$$ |  $$ |$$ |  $$ |
$$\$$\$$ $$ |$$  __$$\ $$  __$$ |$$ |  $$ |$$$$$$$  |
$$ \$$$  $$ |$$ /  $$ |$$ /  $$ |$$ |  $$ |$$  ____/ 
$$ |\$  /$$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |      
$$ | \_/ $$ |\$$$$$$  |\$$$$$$$ |\$$$$$$  |$$ |      
\__|     \__| \______/  \_______| \______/ \__|      
                                                     
                                                     
                                                     
`);



logConsole("Init configiguration file...", "CONFIG/INFO", "");
const config = require("./config.json");
logConsole("Successfully initted configuration file", "CONFIG/INFO", "");

common.data['config'] = config;

fs.readdir('./src/loginServices/', (err, files) => {
   files.forEach((file) => {
       if (!file.endsWith(".js")) return;
       require('./src/loginServices/' + file);
   })
});