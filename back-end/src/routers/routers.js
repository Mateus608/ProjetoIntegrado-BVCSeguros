//requerer express
const express = require('express')
//utilizar o metodo de rotas do express
const router = express.Router()
//requerer o metodo listar todos
const usersControllers = require('../controllers/usersControllers') 
//requere o controller do login
const loginControllers = require('../controllers/loginControllers')
//requere o controller do pdf
const pdfControllers = require('../controllers/pdfControllers')
//requerer a middleware auth
const auth = require('../middleware/auth_user_middleware')
//requerer a middleware authAdmin
const authAdmin = require('../middleware/auth_admin_middleware')
const codControllers = require('../controllers/codControllers')
const inicioControllers = require('../controllers/inicioControllers')
const editOrcamentoControllers = require('../controllers/editOrcamentoControllers')
const orcControllers = require('../controllers/orcControllers')
const deleteOrcControllers = require('../controllers/deleteOrcControllers')
const logsControllers = require('../controllers/logsControllers')
//rota url 
//rota de listar os usuarios
router.get('/users',authAdmin,usersControllers.listAll)
//rota de listar um unico usuario
router.get('/user/:codigo',authAdmin,usersControllers.listOne)
//rota de inserir um usuario
router.post('/user',authAdmin,usersControllers.new)
//rota para exclusão do usuário
router.delete('/user/:id',authAdmin,usersControllers.remove)
//rota para gerar pdf
router.post('/pdf', pdfControllers.pdf)
//rota para login
router.post('/login', loginControllers.login)
//rota para logout
router.post('/logout', loginControllers.logout)
//rota para gerar codigo
router.get('/codorc', codControllers.codOrc)
//rota para logs
router.get('/logs',authAdmin,logsControllers.logs)
//rota para logs
router.delete('/limparLogs',authAdmin,logsControllers.clearLogs)
//rota /
router.get('/', inicioControllers.dash)
//rota para exclusão do usuário
router.get('/edit/:id', editOrcamentoControllers.editOrcamento)
//rota para salvar orcamento
router.post('/save', orcControllers.saveOrcamento)
//rota para exclusão de orcamento
router.delete('/deleteOrcamento', deleteOrcControllers.deleteOrcamento)


module.exports = router