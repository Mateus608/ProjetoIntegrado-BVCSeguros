//requerer as variaveis de ambiente
require('dotenv').config()
//requerer o jwt para o desenvolvimento
const jwt = require('jsonwebtoken')
const sendError = require('../utils/sendErrorResponse')

//iniciar a middleware
module.exports = function(req,res,next){
    const auth = req.headers['authorization']
    if(auth != undefined){
        try {
            const bearer = auth.split(' ')
            let token = bearer[1]
            jwt.verify(token,process.env.SECRET)
            return next()
        } catch (error) {
            return sendError(res, 401, 'Token inválido!')
            }
        
    }else{
        return sendError(res, 403, 'Usuário não possui acesso!')
    }
}