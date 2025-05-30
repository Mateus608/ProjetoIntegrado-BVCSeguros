const knex = require('../config/data')

class InicioControllers {
    async dash(req, res) {
        knex('formGlobal as fg')
            .join('formAuto as fa', 'fa.formGlobal_idformGlobal', 'fg.idformGlobal')
            .select(
                'fg.idformGlobal',
                'fg.codOrcamento',
                'fg.cliente',
                'fg.dataOrcamento',
                'fg.ramo',
                'fa.descricao',
                'fa.placa',
                'fg.tipoOrcamento'
            )
            .orderBy('fg.idformGlobal', 'desc')
            .then(results => {
                res.json({ dash: results });
            })
            .catch(err => {
                console.error('Erro ao contar os registros [dashboard]:', err);
                res.status(500).send('Erro ao acessar o banco de dados');
            });
    }
}

module.exports = new InicioControllers;