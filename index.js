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
const mysql = require("./src/loginServices/mysql");

Object.keys(common.database).forEach(async (table_name) => {
    logConsole(`Loading table ${table_name}...`, "DATABASE/LOAD", "");
    const data = await mysql.queryAllNoCondi(table_name)
    common.database[table_name] = data;
    logConsole(`Successfully loaded table ${table_name} with ${data.length} entry's`, "DATABASE/LOAD", "");
})

fs.readdir('./src/loginServices/', (err, files) => {
   files.forEach((file) => {
       if (!file.endsWith(".js")) return;
       require('./src/loginServices/' + file);
   })
});