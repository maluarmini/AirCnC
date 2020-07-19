const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const path  = require('path');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

mongoose.connect('mongodb+srv://maluarmini:maluarmini@cluster0-78z0t.mongodb.net/AircCnCNovo?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use((req,res,next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
})


app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname,'..', 'uploads')));


server.listen(3333);
