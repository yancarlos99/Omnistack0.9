//Servidor express
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server)

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-mcbzu.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectedUsers = {};

io.on('connection', socket => {

    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;

})

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})


//Rotas da aplicação
// Req => Requisição do que o usuario esta enviando
//Rest => Resultado seria a resposta do servidor para o usuario

// GET, POST, PUT, DELETE
// GET => BUSCA A INFORMAÇÃO PARA O USUARIO NO BANCO 
//POST => CRIA UMA NOVA INFORMAÇÃO
//PUT => EDITAR/ATUALIZAR A INFORMAÇÃO
//DELETE => DELETA A INFORMAÇÃO

//req.query = acessar query params (para filtros)
//req.params = acessar route params (para edição, delete)
//req.body = Acessar corpo da requisição (para criação, edição de registros)

app.use(cors())
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);