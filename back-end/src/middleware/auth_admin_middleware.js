//requerer dotenv
require('dotenv').config();
//requerer jwt
const jwt = require('jsonwebtoken');
//requerer função de saída de erro.
const sendError = require('../utils/sendErrorResponse');

//Inicializa middleware
module.exports = function(req, res, next) {
    // 1. Busca o token do header ou do cookie
    const authHeader = req.headers['authorization'];
    const cookieToken = req.cookies?.token;

    // Usa o token do header, se existir, senão do cookie
    let token;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else if (cookieToken) {
        token = cookieToken;
    }

    // 2. Verifica se o token foi encontrado
    if (!token) {
        return sendError(res, 401, 'Usuário não autenticado');
    }

    // 3. Tenta validar o token
    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        // 4. Verifica permissão (admin)
        if (decoded.role === 0) {
            return next();
        } else {
            return sendError(res, 403, 'Usuário sem permissão');
        }

    } catch (error) {
        return sendError(res, 401, 'Token inválido');
    }
};
