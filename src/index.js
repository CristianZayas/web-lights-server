const { app , serve } = require('./app');
const socket = require('socket.io');
const io  =  socket(serve);
// Send connection sockect 
require('./socket')(io);

/* ==============================*/
const server = async () => {
    await serve.listen(app.get('port'));
    await console.log(`This run in port ${app.get('port')}`)
}

server();
