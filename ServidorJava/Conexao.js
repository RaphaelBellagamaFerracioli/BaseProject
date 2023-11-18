const net = require('net');

const client = new net.Socket();
client.connect(8080, 'localhost', () => {
    console.log('Conectado ao servidor Java');
    client.write('Hello from Node.js!');
});

client.on('data', data => {
    console.log('Mensagem do servidor Java:', data.toString());
});

client.on('close', () => {
    console.log('Conexão encerrada');
});
