const knex = require('../config/data')

class LogsControllers {
    async logs(req, res) {
        try {
            const results = await knex('logsUser')
                .select('*')
                .orderBy('idlogsUser', 'desc');

            res.status(200).json({ success: true, logs: results });
        } catch (err) {
            res.status(500).json({ success: false, error: 'Erro ao consultar os logs', details: err.message });
        }
    }
    async clearLogs(req, res) {
        try {
            await knex.raw('TRUNCATE TABLE logsUser');

            console.log('Tabela logsUser limpa com sucesso!');
            res.status(200).json({ success: true, message: 'Tabela logsUser limpa com sucesso!' });
        } catch (err) {
            console.error('Erro ao executar o TRUNCATE:', err);
            res.status(500).json({ success: false, error: 'Erro ao limpar os dados', details: err.message });
        }
    }
}

module.exports = new LogsControllers;