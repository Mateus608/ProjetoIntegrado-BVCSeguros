const users = require('../models/Users')
const hashPasswordService = require('../services/hash_password_service')

class UsersControllers{
    async listAll(req,res){
        let result = await users.findAll()
        !result.validated
        ?res.status(404).json({success:false, message: result.error})
        :res.status(200).json({success:true, values: result.values})
    }

    async listOne(req,res){
        
        if(isNaN(req.params.codigo)){
            res.status(400).json({success: false, message: "ID Inválido!"})
        }else{
            let result = await users.findByCodigo(req.params.codigo)
            if(!result.validated){
                res.status(404).json({success:false, message: result.error})
            }else{
                result.values == undefined
                ?res.status(406).json({success: false, message: "Usuário não Encontrado!"})
                :res.status(200).json({success:true, values: result.values})
            }
        
        }
    }

    async new(req,res){
        let {usuario, nome, passwd, codigo, tipo} = req.body
        
        let result = await users.create(usuario, nome, hashPasswordService(passwd), codigo, tipo)

        result.validated
        ? res.status(201).json({success: true, message:'Usuário Cadastrado com Sucesso'})
        : res.status(404).json({success: false, message: result.error})
    }

    async remove(req, res){
        let id = req.params.id
        if(isNaN(id)){
            res.status(404).json({success: false, message: "Parametro Inválido"})
        }else{
            let result = await users.delete(id)
            result.validated
            ? res.status(200).json({success: true, message: result.message})
            : res.status(406).json({success: false, message: result.error}) 
        }
    }
}

module.exports = new UsersControllers()