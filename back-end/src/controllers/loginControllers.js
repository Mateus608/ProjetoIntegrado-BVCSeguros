// Requerer as variáveis de ambiente
require('dotenv').config();

// Requerer dependências
const users = require('../models/Users');
const comparePasswordService = require('../services/compare_password_service');
const jwt = require('jsonwebtoken');

class LoginController{
    async login(req, res){
        let {usuario, password} = req.body
        let user = await users.findByUsuario(usuario)
        if(user.values != undefined){
            let passValiated = comparePasswordService(password, user.values.passwd)
            if(!passValiated){
               res.status(406).json({success: false, message:"Senha Invalida"})
            }else{
               let token = jwt.sign({usuario: user.values.usuario, role: user.values.tipo},process.env.SECRET,{expiresIn: '1h'})
               // Define o cookie 'token' com o JWT
                res.cookie('token', token, {
                    httpOnly: true,   // evita acesso via JavaScript no cliente (mais seguro)
                    secure: false,    // no ambiente dev deixe false, em produção com HTTPS coloque true
                    maxAge: 3600000   // 1 hora em milissegundos (deve ser igual ao tempo do token)
                });
               // Envia resposta JSON com sucesso
               res.status(200).json({ success: true });
            }
        } else {
            user.values == undefined
            ? res.status(406).json({success: false, message:'Usuário não encontrado'})
            : res.status(404).json({success: false, message: user.error})
        }
    }

    async logout(req, res) {
        res.clearCookie('token');
        res.json({ success: true, message: 'Logout realizado com sucesso' });
    }
}

module.exports = new LoginController;