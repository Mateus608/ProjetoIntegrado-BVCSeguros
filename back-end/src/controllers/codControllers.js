const knex = require('../config/data')

class CodControllers {
    async codOrc(req, res) {
            let codOrcamento;
            let existe = true;
            let tentativas = 0;
        
            while (existe && tentativas < 50) {
                codOrcamento = Math.floor(Math.random() * 100000000).toString();
        
                const rows = await knex('formGlobal')
                    .select('codOrcamento')
                    .where('codOrcamento', codOrcamento);
        
                if (rows.length === 0) {
                    existe = false;
                }
        
                tentativas++;
            }
        
            if (existe) {
                return res.status(500).json({ error: 'Não foi possível gerar um código único' });
            }
        
            res.json({ codOrcamento });
        
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao conectar no banco de dados' });
        }
}

module.exports = new CodControllers;