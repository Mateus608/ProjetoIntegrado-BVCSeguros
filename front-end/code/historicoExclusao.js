import { customSwal } from "./alertasCustom.js";
import { veiculosExcluidos } from "./adicionarVeiculo.js";
import { franquiasExcluidas } from "./adicionarFranquia.js";
import { franquiasExcluidasIndividual } from "./adicionarFranquia.js";

const iconHistoryVeiculos = document.querySelector('.icon-history-veiculo');
const iconHistoryFranquias = document.querySelector('.icon-history-franquias');
const iconHistoryFranquiasIndividual = document.querySelector('.icon-history-franquias-individual');


if (iconHistoryVeiculos) {
    iconHistoryVeiculos.addEventListener('click', () => {
        const listaVeiculosHTML = veiculosExcluidos.map(veiculo => `
            <div>
                <p><strong>Nº Item no momento da exclusão:</strong> ${veiculo.veiculoId}</p>
                <p><strong>Descrição:</strong> ${veiculo.descricaoVeiculo}</p>
                <p><strong>Ano:</strong> ${veiculo.anoVeiculo}</p>
                <p><strong>Placa:</strong> ${veiculo.placaVeiculo}</p>
                <hr>
            </div>
        `).join(''); // Adiciona um <hr> para separar os veículos
    
        customSwal.fire({
            title: 'Veículos excluídos',
            html: listaVeiculosHTML,
            icon: 'info',
            iconColor: '#01458e',
            confirmButtonText: 'Fechar'
        });
    });
} else {
    console.warn('Elemento .icon-history-veiculo não encontrado!');
};

if (iconHistoryFranquias) {
    iconHistoryFranquias.addEventListener('click', () => {
        const listaFranquiasHTML = franquiasExcluidas.map(franquia => {
            // Verifica se os valores são vazios ou undefined e substitui por 'R$ 0,00' quando necessário
            const valorPOuroSegunda = franquia.valorPOuroSegunda ? franquia.valorPOuroSegunda : 'R$ 0,00';
            const valorPPrataSegunda = franquia.valorPPrataSegunuda ? franquia.valorPPrataSegunuda : 'R$ 0,00';

            // Se ambos os valores forem 'R$ 0,00', não os adiciona ao HTML
            const planoOuroSegundaHTML = valorPOuroSegunda !== 'R$ 0,00' ? `<p><strong>Plano Ouro +Cia:</strong> ${valorPOuroSegunda}</p>` : '';
            const planoPrataSegundaHTML = valorPPrataSegunda !== 'R$ 0,00' ? `<p><strong>Plano Prata +Cia:</strong> ${valorPPrataSegunda}</p>` : '';

            return `
                <div>
                    <p><strong>Descrição:</strong> ${franquia.descricaoFranquia}</p>
                    <p><strong>Plano Ouro:</strong> ${franquia.valorPOuro}</p>
                    <p><strong>Plano Prata:</strong> ${franquia.valorPPrata}</p>
                    ${planoOuroSegundaHTML}
                    ${planoPrataSegundaHTML}
                    <hr>
                </div>
            `;
        }).join(''); // Adiciona um <hr> para separar os veículos
    
        customSwal.fire({
            title: 'Franquias excluídas',
            html: listaFranquiasHTML,
            icon: 'info',
            iconColor: '#01458e',
            confirmButtonText: 'Fechar'
        });
    });
} else {
    console.warn('Elemento .icon-history-franquias não encontrado!');
};

if (iconHistoryFranquiasIndividual) {
    iconHistoryFranquiasIndividual.addEventListener('click', () => {
        const listaFranquiasHTML = franquiasExcluidasIndividual.map(franquia => {
            // Verifica se os valores são vazios ou undefined e substitui por 'R$ 0,00' quando necessário
            const valorAdd1 = franquia.valorAdd1 ? franquia.valorAdd1 : 'R$ 0,00';
            const valorAdd2 = franquia.valorAdd2 ? franquia.valorAdd2 : 'R$ 0,00';
            const valorAdd3 = franquia.valorAdd3 ? franquia.valorAdd3 : 'R$ 0,00';

            // Se ambos os valores forem 'R$ 0,00', não os adiciona ao HTML
            const valorAdd1HTML = valorAdd1 !== 'R$ 0,00' ? `<p><strong>Valor +Cia:</strong> ${valorAdd1}</p>` : '';
            const valorAdd2HTML = valorAdd2 !== 'R$ 0,00' ? `<p><strong>Valor +Cia:</strong> ${valorAdd2}</p>` : '';
            const valorAdd3HTML = valorAdd3 !== 'R$ 0,00' ? `<p><strong>Valor +Cia:</strong> ${valorAdd3}</p>` : '';

            return `
                <div>
                    <p><strong>Descrição:</strong> ${franquia.descricaoFranquia}</p>
                    <p><strong>Valor:</strong> ${franquia.valor}</p>
                    ${valorAdd1HTML}
                    ${valorAdd2HTML}
                    ${valorAdd3HTML}
                    <hr>
                </div>
            `;
        }).join(''); // Adiciona um <hr> para separar os veículos
    
        customSwal.fire({
            title: 'Franquias excluídas',
            html: listaFranquiasHTML,
            icon: 'info',
            iconColor: '#01458e',
            confirmButtonText: 'Fechar'
        });
    });
} else {
    console.warn('Elemento .icon-history-franquias-individual não encontrado!');
};