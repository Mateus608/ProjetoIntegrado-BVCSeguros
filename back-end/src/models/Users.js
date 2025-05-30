//importar a conexao BD
const knex = require('../config/data')

class Users {

    //criar um metodo para buscar todos os usuarios do banco
    async findAll() {
        try {
            let users = await knex.select(["idusers", "usuario", "codigo", "tipo"]).table('users')
            return { validated: true, values: users }
        } catch (error) {
            return { validated: false, error: error }
        }
    }

    //criar um metado para buscar um usuario especifico
    async findByUsuario(usuario) {
        try {
            let user = await knex.select(["usuario", "passwd", "tipo"]).where({ usuario: usuario }).table('users')
            return user.length > 0
                ? { validated: true, values: user[0] }
                : { validated: true, values: undefined }
        } catch (error) {
            return { validated: false, error: error }
        }
    }

    async create(usuario, nome, passwd, codigo, tipo) {
        try {
            await knex.insert({
                usuario: usuario,
                nome: nome,
                passwd: passwd,
                codigo: codigo,
                tipo: tipo
            }).table('users')

            return { validated: true }

        } catch (error) {
            return { validated: false, error: error }
        }
    }

    async findById(id) {
    // busca usuário no banco pelo id
    let user = await knex('users').where({ idusers: id }).first();
    if (user) {
      return { values: user };
    } else {
      return { values: undefined };
    }
    }

    async delete(id) {
        //varificar se o usuario existe
        let user = await this.findById(id)
        if (user.values != undefined) {
            //realizar a exclusão do usuário do banco
            try {
                await knex.delete().where({ idusers: id }).table('users')
                return { validated: true, message: "Usuário Excluido com Sucesso!" }

            } catch (error) {
                return { validated: false, error: error }
            }
        } else {
            return { validated: false, error: "Usuário não existente, portanto não pode ser alterado!" }
        }
    }

}

module.exports = new Users()