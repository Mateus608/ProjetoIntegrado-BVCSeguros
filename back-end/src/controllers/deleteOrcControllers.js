const knex = require('../config/data')

class DeleteOrcControllers {
    async deleteOrcamento(req, res) {
      const { orcamentoId } = req.body;
  
      if (!orcamentoId) {
        return res.status(400).json({
          success: false,
          error: 'orcamentoId é obrigatório.'
        });
      }
  
      try {
        await knex.transaction(async trx => {
          await trx('observacoes')
            .where('formAuto_formGlobal_idformGlobal', orcamentoId)
            .del();
  
          await trx('pagamentoAuto_Adicional')
            .where('formAuto_formGlobal_idformGlobal', orcamentoId)
            .del();
  
          await trx('pagamentoAuto')
            .where('formAuto_formGlobal_idformGlobal', orcamentoId)
            .del();
  
          await trx('formaPagamento_Adicional')
            .where('formAuto_formGlobal_idformGlobal', orcamentoId)
            .del();
  
          await trx('formaPagamento')
            .where('formAuto_formGlobal_idformGlobal', orcamentoId)
            .del();
  
          await trx('franquiasAuto_Adicional')
            .where('formAuto_formGlobal_idformGlobal', orcamentoId)
            .del();
  
          await trx('franquiasAuto')
            .where('formAuto_formGlobal_idformGlobal', orcamentoId)
            .del();
  
          await trx('clausulasAuto_Adicional')
            .where('formAuto_formGlobal_idformGlobal', orcamentoId)
            .del();
  
          await trx('clausulasAuto')
            .where('formAuto_formGlobal_idformGlobal', orcamentoId)
            .del();
  
          await trx('coberturasAuto_Adicional')
            .where('formAuto_formGlobal_idformGlobal', orcamentoId)
            .del();
  
          await trx('coberturasAuto')
            .where('formAuto_formGlobal_idformGlobal', orcamentoId)
            .del();
  
          await trx('formAuto')
            .where('formGlobal_idformGlobal', orcamentoId)
            .del();
  
          const deletedCount = await trx('formGlobal')
            .where('idformGlobal', orcamentoId)
            .del();
  
          if (deletedCount === 0) {
            throw new Error('Orçamento não encontrado.');
          }
        });
  
        // Se chegou aqui, deu tudo certo
        return res.json({ success: true });
  
      } catch (err) {
        console.error('Erro ao excluir orçamento:', err);
  
        if (err.message === 'Orçamento não encontrado.') {
          return res.status(404).json({
            success: false,
            error: err.message
          });
        }
  
        return res.status(500).json({
          success: false,
          error: 'Erro ao excluir orçamento no banco de dados. Tente novamente mais tarde.'
        });
      }
    }
  }

module.exports = new DeleteOrcControllers;  