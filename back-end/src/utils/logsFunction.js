/*const knex = require('../config/data')

class LogsFunction {
    async addLog (logMessage, tipo) {
        const now = new Date();
        const logMessage = `${logMessage} > [Time ${now.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}]`;

        try {
        // Inserindo o log na tabela logsUser usando knex
        const logResult = await knex('logsUser').insert({
            logMessage: logMessage,
            tipo: tipo
        });

        // logResult normalmente será um array com o id inserido, dependendo do banco
        console.log('Log inserido com sucesso:', logResult);
        } catch (err) {
        console.error('Erro ao inserir log:', err);
        throw new Error('Erro ao salvar log no banco de dados');
        }
   }
}

module.exports = new LogsFunction;*/