const common = require('./common');
const fs = require('fs')

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



console.log("=> Init configiguration file...");
const config = require("./config.json");
console.log("=> Successfully initted configuration file");

common.data['config'] = config;

fs.readdir('./src/loginServices/', (err, files) => {
   files.forEach((file) => {
       if (!file.endsWith(".js")) return;
       require('./src/loginServices/' + file);
   })
});