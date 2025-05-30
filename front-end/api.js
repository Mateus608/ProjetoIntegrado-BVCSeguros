const express = require('express');
const path = require('path');
const cors = require('cors');  
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Carregar variáveis de ambiente
require('dotenv').config();

// Configuração de CORS
const server = express();
server.use(cors());
server.use(cookieParser());

server.use(express.static(path.join(__dirname, 'public'))); // Servindo arquivos estáticos da pasta 'public'

server.engine('html', require('ejs').renderFile);
server.set('view engine', 'html');
server.set('views', path.join(__dirname, 'models'));
server.use(express.static(path.join(__dirname, 'style')));
server.use(express.static(path.join(__dirname, 'img')));
server.use(express.static(path.join(__dirname, 'fonts')));
server.use(express.static(path.join(__dirname, 'code')));
server.use(express.static(path.join(__dirname, 'public')));

server.get('/', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.render('login');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        return res.render('form-inicio', { usuario: decoded.usuario });
    } catch (err) {
        return res.render('login');
    }
});

server.get('/editar-orcamento', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.render('login');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        return res.render('editar-orcamento', { usuario: decoded.usuario });
    } catch (err) {
        return res.render('login');
    }
});

server.get('/form-automovel', (req, res) => {
    const token = req.cookies.token; 
    if (!token) {
        return res.render('login');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        return res.render('form-automovel', { usuario: decoded.usuario });
    } catch (err) {
        return res.render('login');
    }
});

server.get('/administrativo', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.render('login-admin');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const tipoUsuario = decoded.role;
        if (tipoUsuario === 0) {
            return res.render('painel-admin', { usuario: decoded.usuario });
        } else if (tipoUsuario === 1) {
            return res.render('passwdError', {
                userError: 'Você não tem permissão para acessar o painel administrativo!',
                nameBtn: 'Retornar ao início',
                routerUrl: 'http://127.0.0.1:3000/'
            });
        } else {
            return res.render('login');
        }
    } catch (err) {
        return res.render('login');
    }
});

server.get('/users', (req, res) => {
     const token = req.cookies.token;
    if (!token) {
        return res.render('login-admin');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const tipoUsuario = decoded.role;
        if (tipoUsuario === 0) {
            return res.render('users');
        } else if (tipoUsuario === 1) {
            return res.render('passwdError', {
                userError: 'Você não tem permissão para acessar o painel administrativo!',
                nameBtn: 'Retornar ao início',
                routerUrl: 'http://127.0.0.1:3000/'
            });
        } else {
            return res.render('login');
        }
    } catch (err) {
        return res.render('login');
    }
});

server.get('/addUser', (req, res) => {
     const token = req.cookies.token;
    if (!token) {
        return res.render('login-admin');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const tipoUsuario = decoded.role;
        if (tipoUsuario === 0) {
            return res.render('addUser');
        } else if (tipoUsuario === 1) {
            return res.render('passwdError', {
                userError: 'Você não tem permissão para acessar o painel administrativo!',
                nameBtn: 'Retornar ao início',
                routerUrl: 'http://127.0.0.1:3000/'
            });
        } else {
            return res.render('login');
        }
    } catch (err) {
        return res.render('login');
    }
});

server.get('/logs', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.render('login-admin');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const tipoUsuario = decoded.role;
        if (tipoUsuario === 0) {
            return res.render('logs');
        } else if (tipoUsuario === 1) {
            return res.render('passwdError', {
                userError: 'Você não tem permissão para acessar o painel administrativo!',
                nameBtn: 'Retornar ao início',
                routerUrl: 'http://127.0.0.1:3000/'
            });
        } else {
            return res.render('login');
        }
    } catch (err) {
        return res.render('login');
    }
});

server.listen(process.env.PORT, () => {
    console.log('Servidor iniciado');
});
