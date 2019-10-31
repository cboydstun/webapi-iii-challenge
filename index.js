const server = require('./server');
const onServerStart = (message) =>console.log(`${message}`);

server.listen(6000, onServerStart('Server running on port 6000 successfully.'));