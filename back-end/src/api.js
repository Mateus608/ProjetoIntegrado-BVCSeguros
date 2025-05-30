//requerer express
const express = require('express');
//atribuir a uma const o objeto express
const api = express();
//requerer as rotas
const routers = require('./routers/routers');
//requerer cors
const cors = require('cors');

const cookieParser = require('cookie-parser');
api.use(cookieParser());

const path = require('path');
api.use(express.static(path.join(__dirname, './public')));

//indicar para uso da api
api.use(cors({
    origin: 'http://127.0.0.1:3000',
    credentials: true
}));

//informar que API podera utlizar urls 
api.use(express.urlencoded({extended:false, limit: '50mb'}));

//informar que API ira utilizar json
api.use(express.json({ limit: '50mb' }));

//utilizar as rotas
api.use('/',routers);


module.exports = api;