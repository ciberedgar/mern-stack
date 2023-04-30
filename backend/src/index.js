require('dotenv').config();
require('./database');

const app = require('./app');
const PORT = process.env.PORT || 4000;
async function main() {
    await app.listen(PORT);
    console.log('Server on port ' + PORT);
}

main();