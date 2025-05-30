const knex = require('../config/data')

class EditOrcamentoControllers {
    async editOrcamento(req, res) {
        const idFormGlobal = req.params.id;

        const formGlobal = await knex('formGlobal')
            .where('idformGlobal', idFormGlobal)
            .first();

        if (!formGlobal) {
            return res.status(404).send('Orçamento não encontrado');
        }

        const formAuto = await knex('formAuto')
            .where('formGlobal_idformGlobal', idFormGlobal)
            .first();

        const coberturasAuto = await knex('coberturasAuto')
            .where('formAuto_formGlobal_idformGlobal', idFormGlobal);

        const coberturasAuto_Adicional = await knex('coberturasAuto_Adicional')
            .where('formAuto_formGlobal_idformGlobal', idFormGlobal);

        const clausulasAuto = await knex('clausulasAuto')
            .where('formAuto_formGlobal_idformGlobal', idFormGlobal);

        const clausulasAuto_Adicional = await knex('clausulasAuto_Adicional')
            .where('formAuto_formGlobal_idformGlobal', idFormGlobal);

        const franquiasAuto = await knex('franquiasAuto')
            .where('formAuto_formGlobal_idformGlobal', idFormGlobal);

        const franquiasAuto_Adicional = await knex('franquiasAuto_Adicional')
            .where('formAuto_formGlobal_idformGlobal', idFormGlobal);

        const formaPagamento = await knex('formaPagamento')
            .where('formAuto_formGlobal_idformGlobal', idFormGlobal)
            .first();

        const formaPagamento_Adicional = await knex('formaPagamento_Adicional')
            .where('formAuto_formGlobal_idformGlobal', idFormGlobal)
            .first();

        const pagamentoAuto = await knex('pagamentoAuto')
            .where('formAuto_formGlobal_idformGlobal', idFormGlobal);

        const pagamentoAuto_Adicional = await knex('pagamentoAuto_Adicional')
            .where('formAuto_formGlobal_idformGlobal', idFormGlobal);

        const observacoes = await knex('observacoes')
            .where('formAuto_formGlobal_idformGlobal', idFormGlobal)
            .first();

        res.json({
            formGlobal,
            formAuto,
            coberturasAuto,
            coberturasAuto_Adicional,
            clausulasAuto,
            clausulasAuto_Adicional,
            franquiasAuto,
            franquiasAuto_Adicional,
            formaPagamento,
            formaPagamento_Adicional,
            pagamentoAuto,
            pagamentoAuto_Adicional,
            observacoes
        });

    } catch(err) {
        console.error('Erro no servidor:', err);
        res.status(500).send('Erro no servidor');
    }
}

module.exports = new EditOrcamentoControllers;