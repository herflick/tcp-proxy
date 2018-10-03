const net = require('net');
const port = 5000;
const host = '0.0.0.0';
const listenRetryTimer = 1000

function connection(socket) {
    // connection - listener function
 
    socket.name = socket.remoteAddress + ":" + socket.remotePort;
    console.log('Client connected ' + socket.name);
//    socket.setEncoding('');
    socket.on('data', (rcvData) => {
        console.log('Data from: '+ socket.name + ' received: '+ rcvData.toString());        
    });

    socket.on('end', () => {
        console.log('Client disconnected: '+socket.name);
    });

}

const server = net.createServer(connection);
server.listen({
    port,
    host
}, (listener) => {
    console.log('Listening on ' + host + ':' + port);
});


server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.log('Addres is in use retrying in ' + listenRetryTimer);
        setTimeout(() => {
            server.close();
            server.listen({
                port,
                host
            });
        }, listenRetryTimer)
    }
});