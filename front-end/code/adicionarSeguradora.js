import { customSwal } from "./alertasCustom.js";
import { arrayFranquias, arraysClausulas, arraysCoberturas, arraysPagamento } from "./functionCliente.js";
import { setTablePagamentoPOuro } from "./functionCliente.js";
import { setTablePagamentoPPrata } from "./functionCliente.js";
import { displayBlockNone } from "./functionCliente.js";
import { inputSeguradoraSecundaria } from "./functionCliente.js";
import { setupInputEventDelegation } from "./functionCliente.js";
import { limparArraysDinamicos } from "./functionCliente.js";
import { eventSeguradoraStatusVeiculo } from "./adicionarVeiculo.js";
import { eventSeguradoraStatusFranquia } from "./adicionarFranquia.js";

const container = document.getElementById('container-seguradoras');
const containerRecomendado = document.getElementById('container-recomendado');
const addSeguradoraBtn = document.querySelector('.add-seguradora');
const removeSeguradoraBtn = document.querySelector('.remove-seguradora-btn');

// Contador para acompanhar o número de seguradoras adicionadas
let seguradoraCounter = 0;
function setSeguradoraCounter(valor) {
    seguradoraCounter = valor;
};

export { setSeguradoraCounter };

// Objeto para rastrear o status de cada seguradora
export let seguradoraStatus = {};
seguradoraStatus[1] = 0;

let selectedValueSeguradoraSecundaria = ''; // Variavel utilizada para exportar o value do select inserido dinamicamente

// Adiciona um novo campo de seguradora e colunas na tabela
addSeguradoraBtn.addEventListener('click', () => {
    seguradoraCounter++; // Incrementa o contador de seguradoras

    // Limpa o objeto seguradoraStatus
    for (let key in seguradoraStatus) {
        delete seguradoraStatus[key];
    }
    seguradoraStatus[seguradoraCounter] = 1;

    eventSeguradoraStatusFranquia(seguradoraStatus[1]);
    eventSeguradoraStatusVeiculo(seguradoraStatus[1]);

    if (seguradoraCounter >= 2) {
        customSwal.fire({
            title: 'Limite de Seguradoras',
            text: 'Você só pode adicionar até 2 seguradoras por orçamento. Remova uma para adicionar outra.',
            icon: 'info',
            iconColor: '#01458e'
        });

        return;
    }

    // Alterna a visibilidade dos botões
    displayBlockNone(addSeguradoraBtn, 'none', removeSeguradoraBtn, 'block');

    // Cria uma div para a seguradora com um id exclusivo
    const newSeguradoraDiv = document.createElement('div');
    newSeguradoraDiv.setAttribute('data-id', seguradoraCounter);
    newSeguradoraDiv.innerHTML = `
        <label for="selecionar">Cia</label>
        <select class="select-seguradora" data-id="${seguradoraCounter}">
            <option value="selecione" disabled selected>Selecione</option>
            <option value="Allianz">Allianz</option>
            <option value="Allianz Trade">Allianz Trade</option>
            <option value="American Life">American Life</option>
            <option value="AXA">AXA</option>
            <option value="Azul">Azul</option>
            <option value="Bradesco">Bradesco</option>
            <option value="HDI">HDI</option>
            <option value="Itau">Itaú</option>
            <option value="Liberty">Liberty</option>
            <option value="Mapfre">Mapfre</option>
            <option value="Mitsui">Mitsui</option>
            <option value="Porto">Porto</option>
            <option value="Pottencial">Pottencial</option>
            <option value="SulAmerica">SulAmérica</option>
            <option value="Sompo">Sompo</option>
            <option value="Suhai">Suhai</option>
            <option value="Tokio">Tokio</option>
            <option value="Zurich">Zurich</option>
        </select>
    `;

    // Adiciona o novo elemento ao container
    container.appendChild(newSeguradoraDiv);

    containerRecomendado.style.display = 'block';

    // Adiciona novas colunas
    addCoberturaColumns(seguradoraCounter);
    addClausulaColumns(seguradoraCounter);
    addFranquiasColumns(seguradoraCounter);
    addPagamentoColumns(seguradoraCounter);
    addPagamentoTable(seguradoraCounter);

    // Captura o novo select e ouve mudanças nele
    const selectElement = document.querySelector(`.select-seguradora[data-id="${seguradoraCounter}"]`);

    // Adiciona um listener para capturar o valor do select dinamicamente
    selectElement.addEventListener('change', () => {
        selectedValueSeguradoraSecundaria = selectElement.value; // Atualiza a variável global com o valor selecionado
    });
});

// Exportando o value do select
export { selectedValueSeguradoraSecundaria };

// Delegação de eventos para selects dentro do container
container.addEventListener('change', (event) => {
    if (event.target.classList.contains('select-seguradora')) {
        const seguradoraId = event.target.getAttribute('data-id');
        const seguradoraSelecionada = event.target.value;

        const titles = document.querySelectorAll(`.p-title-table-seguradora2[data-id="${seguradoraId}"]`);
        titles.forEach((title) => {
            title.textContent = seguradoraSelecionada;
        });
    }
});

// Função para restaurar o botão de adicionar seguradora
function restoreAddSeguradoraButton() {
    displayBlockNone(removeSeguradoraBtn, 'none', addSeguradoraBtn, 'block');

    if (seguradoraStatus[0] === 0) {
        seguradoraStatus[0] = 1;
    }
}

// Delegação de eventos para o botão de remover
removeSeguradoraBtn.addEventListener('click', (e) => {

    function showConfirmationSwal(message) {
        customSwal.fire({
            title: 'Atenção',
            html: message,
            icon: 'warning',
            iconColor: '#01458e',
            showCancelButton: true,  // Mostra o botão de cancelar
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true // Inverte a ordem dos botões (Confirmar à esquerda)
        }).then((result) => {
            if (result.isConfirmed) {
                // Chama a função para remover a seguradora e suas colunas associadas
                customSwal.fire({
                    title: `Seguradora excluída com sucesso!`,
                    html: `Seguradora excluída: <strong>${selectedValueSeguradoraSecundaria}</strong>`,
                    icon: 'success',
                    iconColor: '#068e01'
                });
            eventListenerRemoveSeguradoraBtn();
            } else if (result.isDismissed) {
                return;
            }
        });
    }
    
    // Verifique se a seguradora secundária foi selecionada
    if (selectedValueSeguradoraSecundaria === '') {
        showConfirmationSwal('Você tem certeza de que deseja excluir esta seguradora deste orçamento? Esta ação não pode ser desfeita.');
    } else {
        showConfirmationSwal(`Você tem certeza de que deseja excluir a seguradora <strong>${selectedValueSeguradoraSecundaria}</strong> deste orçamento? Esta ação não pode ser desfeita.`);
    }    
});

function eventListenerRemoveSeguradoraBtn() {
    const idToRemove = seguradoraCounter;  // removendo a seguradora mais recente
    selectedValueSeguradoraSecundaria = '';
    // Remove o elemento da seguradora
    const seguradoraDiv = document.querySelector(`div[data-id="${idToRemove}"]`);
    if (seguradoraDiv) {
        seguradoraDiv.remove();
    };

    containerRecomendado.style.display = 'none';
    const radioNenhuma = containerRecomendado.querySelector('input[type="radio"][value="0"]');
    radioNenhuma.checked = true;

    // Remove os selects associados
    const selectsToRemove = document.querySelectorAll(`select[data-id="${idToRemove}"]`);
    selectsToRemove.forEach((select) => {
        select.parentElement.remove();
    });

    // Remove a tabela de pagamento associada
    removePagamentoTable(idToRemove);

    // Remove as colunas associadas na tabela
    removeColumnsFromTable(idToRemove);

    // Marca a seguradora como removida
    seguradoraStatus[idToRemove] = 0;

    // Atualiza o contador
    seguradoraCounter--;

    eventSeguradoraStatusFranquia(seguradoraStatus[1]);
    eventSeguradoraStatusVeiculo(seguradoraStatus[1]);

    // Restaura o botão de adicionar seguradora, se necessário
    if (seguradoraCounter === 0) {
        restoreAddSeguradoraButton();
    };
}

export { eventListenerRemoveSeguradoraBtn };

// Função para remover as colunas da tabela
function removeColumnsFromTable(id) {
    const thColumns = document.querySelectorAll(`.p-title-table-seguradora2[data-id="${id}"]`);
    thColumns.forEach((th) => {
        th.parentElement.remove(); // Remove a célula da tabela
    });

    const tdColumns = document.querySelectorAll(`td input[data-id="${id}"]`);
    tdColumns.forEach((td) => {
        td.parentElement.remove(); // Remove a célula da tabela
    });

    limparArraysDinamicos(arraysCoberturas);
    limparArraysDinamicos(arraysClausulas);
    limparArraysDinamicos(arrayFranquias);
    limparArraysDinamicos(arraysPagamento);

    setTablePagamentoPOuro('R$ 0,00');
    setTablePagamentoPPrata('R$ 0,00');
}

// Função para remover a tabela de pagamento associada a um ID
function removePagamentoTable(id) {
    const tablePagamento = document.querySelector(`table[data-id="${id}"]`);
    if (tablePagamento) {
        tablePagamento.remove(); // Remove a tabela do DOM
    }
}

const thTableCoberturas = document.getElementById('tr-th-coberturas');
const tdTableCoberturas1 = document.getElementById('tr-td-coberturas1');
const tdTableCoberturas2 = document.getElementById('tr-td-coberturas2');
const tdTableCoberturas3 = document.getElementById('tr-td-coberturas3');
const tdTableCoberturas4 = document.getElementById('tr-td-coberturas4');
const tdTableCoberturas5 = document.getElementById('tr-td-coberturas5');
const tdTableCoberturas6 = document.getElementById('tr-td-coberturas6');
const thTableClausulas = document.getElementById('tr-th-clausulas');
const tdTableClausulas1 = document.getElementById('tr-td-clausulas1');
const tdTableClausulas2 = document.getElementById('tr-td-clausulas2');
const tdTableClausulas3 = document.getElementById('tr-td-clausulas3');
const tdTableClausulas4 = document.getElementById('tr-td-clausulas4');
const tdTableClausulas5 = document.getElementById('tr-td-clausulas5');
const thTableFranquias = document.getElementById('tr-th-franquias');
const tdTableFranquias = document.getElementById('tr-td-franquias');
const valoresTablePagamento = document.getElementById('container-pagamento-segunda-seguradora');
const thTablePagamento = document.getElementById('tr-th-pagamento');
export const tdTablePagamentoAvista = document.getElementById('tr-td-pagamento-avista');
const tdTablePagamento1 = document.getElementById('tr-td-pagamento-1');
const tdTablePagamento2 = document.getElementById('tr-td-pagamento-2');
const tdTablePagamento3 = document.getElementById('tr-td-pagamento-3');
const tdTablePagamento4 = document.getElementById('tr-td-pagamento-4');
const tdTablePagamento5 = document.getElementById('tr-td-pagamento-5');
const tdTablePagamento6 = document.getElementById('tr-td-pagamento-6');
const tdTablePagamento7 = document.getElementById('tr-td-pagamento-7');
const tdTablePagamento8 = document.getElementById('tr-td-pagamento-8');
const tdTablePagamento9 = document.getElementById('tr-td-pagamento-9');
const tdTablePagamento10 = document.getElementById('tr-td-pagamento-10');
const tdTablePagamento11 = document.getElementById('tr-td-pagamento-11');
const tdTablePagamento12 = document.getElementById('tr-td-pagamento-12');

// Função para adicionar as colunas de Coberturas
function addCoberturaColumns(id) {
    const newThPlanoOuroCoberturas = document.createElement('th');
    newThPlanoOuroCoberturas.className = 'th-color-secundario';
    newThPlanoOuroCoberturas.innerHTML = `<p class="p-title-table-seguradora2" data-id="${id}">-</p> Plano Ouro`;
    thTableCoberturas.appendChild(newThPlanoOuroCoberturas);

    const newTdPlanoOuroCoberturas1 = document.createElement('td');
    newTdPlanoOuroCoberturas1.innerHTML = `
                        <select data-id="${id}" id="pOuro-cobertura1">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="100% TAB. FIPE">100% TAB. FIPE</option>
                        </select>
    `;
    tdTableCoberturas1.appendChild(newTdPlanoOuroCoberturas1);

    const newTdPlanoOuroCoberturas2 = document.createElement('td');
    newTdPlanoOuroCoberturas2.innerHTML = `<input type="text" data-id="${id}" id="pOuro-cobertura2" placeholder="R$ 0,00" title="Insira o valor da cobertura">`;
    tdTableCoberturas2.appendChild(newTdPlanoOuroCoberturas2);

    const newTdPlanoOuroCoberturas3 = document.createElement('td');
    newTdPlanoOuroCoberturas3.innerHTML = `<input type="text" data-id="${id}" id="pOuro-cobertura3" placeholder="R$ 0,00" title="Insira o valor da cobertura">`;
    tdTableCoberturas3.appendChild(newTdPlanoOuroCoberturas3);

    const newTdPlanoOuroCoberturas4 = document.createElement('td');
    newTdPlanoOuroCoberturas4.innerHTML = `<input type="text" data-id="${id}" id="pOuro-cobertura4" placeholder="R$ 0,00" title="Insira o valor da cobertura">`;
    tdTableCoberturas4.appendChild(newTdPlanoOuroCoberturas4);

    const newTdPlanoOuroCoberturas5 = document.createElement('td');
    newTdPlanoOuroCoberturas5.innerHTML = `<input type="text" data-id="${id}" id="pOuro-cobertura5" placeholder="R$ 0,00" title="Insira o valor da cobertura">`;
    tdTableCoberturas5.appendChild(newTdPlanoOuroCoberturas5);

    const newTdPlanoOuroCoberturas6 = document.createElement('td');
    newTdPlanoOuroCoberturas6.innerHTML = `<input type="text" data-id="${id}" id="pOuro-cobertura6" placeholder="R$ 0,00" title="Insira o valor da cobertura">`;
    tdTableCoberturas6.appendChild(newTdPlanoOuroCoberturas6);

    const newThPlanoPrataCoberturas = document.createElement('th');
    newThPlanoPrataCoberturas.className = 'th-color-secundario';
    newThPlanoPrataCoberturas.innerHTML = `<p class="p-title-table-seguradora2" data-id="${id}">-</p> Plano Prata`;
    thTableCoberturas.appendChild(newThPlanoPrataCoberturas);

    const newTdPlanoPrataCoberturas1 = document.createElement('td');
    newTdPlanoPrataCoberturas1.innerHTML = `
                        <select data-id="${id}" id="pPrata-cobertura1">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="100% TAB. FIPE">100% TAB. FIPE</option>
                        </select>
    `;
    tdTableCoberturas1.appendChild(newTdPlanoPrataCoberturas1);

    const newTdPlanoPrataCoberturas2 = document.createElement('td');
    newTdPlanoPrataCoberturas2.innerHTML = `<input type="text" data-id="${id}" id="pPrata-cobertura2" placeholder="R$ 0,00" title="Insira o valor da cobertura">`;
    tdTableCoberturas2.appendChild(newTdPlanoPrataCoberturas2);

    const newTdPlanoPrataCoberturas3 = document.createElement('td');
    newTdPlanoPrataCoberturas3.innerHTML = `<input type="text" data-id="${id}" id="pPrata-cobertura3" placeholder="R$ 0,00" title="Insira o valor da cobertura">`;
    tdTableCoberturas3.appendChild(newTdPlanoPrataCoberturas3);

    const newTdPlanoPrataCoberturas4 = document.createElement('td');
    newTdPlanoPrataCoberturas4.innerHTML = `<input type="text" data-id="${id}" id="pPrata-cobertura4" placeholder="R$ 0,00" title="Insira o valor da cobertura">`;
    tdTableCoberturas4.appendChild(newTdPlanoPrataCoberturas4);

    const newTdPlanoPrataCoberturas5 = document.createElement('td');
    newTdPlanoPrataCoberturas5.innerHTML = `<input type="text" data-id="${id}" id="pPrata-cobertura5" placeholder="R$ 0,00" title="Insira o valor da cobertura">`;
    tdTableCoberturas5.appendChild(newTdPlanoPrataCoberturas5);

    const newTdPlanoPrataCoberturas6 = document.createElement('td');
    newTdPlanoPrataCoberturas6.innerHTML = `<input type="text" data-id="${id}" id="pPrata-cobertura6" placeholder="R$ 0,00" title="Insira o valor da cobertura">`;
    tdTableCoberturas6.appendChild(newTdPlanoPrataCoberturas6);
}

inputSeguradoraSecundaria(tdTableCoberturas1, 0, 1)
inputSeguradoraSecundaria(tdTableCoberturas2, 1, 2);
inputSeguradoraSecundaria(tdTableCoberturas3, 1, 3);
inputSeguradoraSecundaria(tdTableCoberturas4, 1, 4);
inputSeguradoraSecundaria(tdTableCoberturas5, 1, 5);
inputSeguradoraSecundaria(tdTableCoberturas6, 1, 6);
setupInputEventDelegation(tdTableCoberturas2);
setupInputEventDelegation(tdTableCoberturas3);
setupInputEventDelegation(tdTableCoberturas4);
setupInputEventDelegation(tdTableCoberturas5);
setupInputEventDelegation(tdTableCoberturas6);

// Função para adicionar as colunas de Clausulas
function addClausulaColumns(id) {
    const newThPlanoOuroClausulas = document.createElement('th');
    newThPlanoOuroClausulas.className = 'th-color-secundario';
    newThPlanoOuroClausulas.innerHTML = `<p class="p-title-table-seguradora2" data-id="${id}">-</p> Plano Ouro`;
    thTableClausulas.appendChild(newThPlanoOuroClausulas);

    const newTdPlanoOuroClausulas1 = document.createElement('td');
    newTdPlanoOuroClausulas1.innerHTML = `
                         <select data-id="${id}" id="pOuro-clausula1">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                        </select>
    `;
    tdTableClausulas1.appendChild(newTdPlanoOuroClausulas1);

    const newTdPlanoOuroClausulas2 = document.createElement('td');
    newTdPlanoOuroClausulas2.innerHTML = `
                        <select data-id="${id}" id="pOuro-clausula2">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="Ilimitado">Ilimitado</option>
                            <option value="15 Dias">15 Dias</option>
                            <option value="30 Dias">30 Dias</option>
                            <option value="Não possui">Não possui</option>
                        </select>
    
    `;
    tdTableClausulas2.appendChild(newTdPlanoOuroClausulas2);

    const newTdPlanoOuroClausulas3 = document.createElement('td');
    newTdPlanoOuroClausulas3.innerHTML = `
                         <select data-id="${id}" id="pOuro-clausula3">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                        </select>
    `;
    tdTableClausulas3.appendChild(newTdPlanoOuroClausulas3);

    const newTdPlanoOuroClausulas4 = document.createElement('td');
    newTdPlanoOuroClausulas4.innerHTML = `
                         <select data-id="${id}" id="pOuro-clausula4">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                        </select>
    `;
    tdTableClausulas4.appendChild(newTdPlanoOuroClausulas4);

    const newTdPlanoOuroClausulas5 = document.createElement('td');
    newTdPlanoOuroClausulas5.innerHTML = `
                         <select data-id="${id}" id="pOuro-clausula5">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                        </select>
    `;
    tdTableClausulas5.appendChild(newTdPlanoOuroClausulas5);

    const newThPlanoPrataClausulas = document.createElement('th');
    newThPlanoPrataClausulas.className = 'th-color-secundario';
    newThPlanoPrataClausulas.innerHTML = `<p class="p-title-table-seguradora2" data-id="${id}">-</p> Plano Prata`;
    thTableClausulas.appendChild(newThPlanoPrataClausulas);

    const newTdPlanoPrataClausulas1 = document.createElement('td');
    newTdPlanoPrataClausulas1.innerHTML = `
                         <select data-id="${id}" id="pPrata-clausula1">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                        </select>
    `;
    tdTableClausulas1.appendChild(newTdPlanoPrataClausulas1);

    const newTdPlanoPrataClausulas2 = document.createElement('td');
    newTdPlanoPrataClausulas2.innerHTML = `
                        <select data-id="${id}" id="pPrata-clausula2">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="Ilimitado">Ilimitado</option>
                            <option value="15 Dias">15 Dias</option>
                            <option value="30 Dias">30 Dias</option>
                            <option value="Não possui">Não possui</option>
                        </select>
    
    `;
    tdTableClausulas2.appendChild(newTdPlanoPrataClausulas2);

    const newTdPlanoPrataClausulas3 = document.createElement('td');
    newTdPlanoPrataClausulas3.innerHTML = `
                         <select data-id="${id}" id="pPrata-clausula3">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                        </select>
    `;
    tdTableClausulas3.appendChild(newTdPlanoPrataClausulas3);

    const newTdPlanoPrataClausulas4 = document.createElement('td');
    newTdPlanoPrataClausulas4.innerHTML = `
                         <select data-id="${id}" id="pPrata-clausula4">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                        </select>
    `;
    tdTableClausulas4.appendChild(newTdPlanoPrataClausulas4);

    const newTdPlanoPrataClausulas5 = document.createElement('td');
    newTdPlanoPrataClausulas5.innerHTML = `
                         <select data-id="${id}" id="pPrata-clausula5">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                        </select>
    `;
    tdTableClausulas5.appendChild(newTdPlanoPrataClausulas5);

};

inputSeguradoraSecundaria(tdTableClausulas1, 2, 1);
inputSeguradoraSecundaria(tdTableClausulas2, 2, 2);
inputSeguradoraSecundaria(tdTableClausulas3, 2, 3);
inputSeguradoraSecundaria(tdTableClausulas4, 2, 4);
inputSeguradoraSecundaria(tdTableClausulas5, 2, 5);

// Função para adicionar as colunas de Franquias
function addFranquiasColumns(id) {
    // Criando a coluna para o Plano Ouro
    const newThPlanoOuroFranquias = document.createElement('th');
    newThPlanoOuroFranquias.className = 'th-color-secundario';
    newThPlanoOuroFranquias.innerHTML = `<p class="p-title-table-seguradora2" data-id="${id}">-</p> Plano Ouro`;
    thTableFranquias.appendChild(newThPlanoOuroFranquias);

    const newTdPlanoOuroFranquias = document.createElement('td');
    newTdPlanoOuroFranquias.innerHTML = `<input type="text" data-id="${id}" id="pOuro-franquia" placeholder="R$ 0,00" title="Insira o valor da franquia">`;
    tdTableFranquias.appendChild(newTdPlanoOuroFranquias);

    // Criando a coluna para o Plano Prata
    const newThPlanoPrataFranquias = document.createElement('th');
    newThPlanoPrataFranquias.className = 'th-color-secundario';
    newThPlanoPrataFranquias.innerHTML = `<p class="p-title-table-seguradora2" data-id="${id}">-</p> Plano Prata`;
    thTableFranquias.appendChild(newThPlanoPrataFranquias);

    const newTdPlanoPrataFranquias = document.createElement('td');
    newTdPlanoPrataFranquias.innerHTML = `<input type="text" data-id="${id}" id="pPrata-franquia" placeholder="R$ 0,00" title="Insira o valor da franquia">`;
    tdTableFranquias.appendChild(newTdPlanoPrataFranquias);
}

inputSeguradoraSecundaria(tdTableFranquias, 3, 1);
setupInputEventDelegation(tdTableFranquias);



function addPagamentoTable(id) {
    const newTablePagamento = document.createElement('table');
    newTablePagamento.className = 'new-table-pagamento';
    newTablePagamento.setAttribute('data-id', id); // Adiciona o atributo data-id para identificação
    newTablePagamento.innerHTML = `
        <thead>
            <tr>
                <th id="th-segura-valor-pagamento" class="th-color-secundario"><p class="p-title-table-seguradora2" data-id="${id}">-</p></th>
                <th id="th-nome-table-cliente" class="th-color-secundario">Plano Ouro</th>
                <th id="th-nome-table-cliente" class="th-color-secundario">Plano Prata</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td id="td-nome-table-cliente" class="td-table-cliente">VALOR À VISTA</td>
                <td><input type="text" id="pOuro-${id}" class="pOuro-table-pagamento" name="nome" placeholder="R$ 0,00" title="Insira o valor do prêmio"></td>
                <td><input type="text" id="pPrata-${id}" class="pPrata-table-pagamento" name="nome" placeholder="R$ 0,00" title="Insira o valor do prêmio"></td>
            </tr>
        </tbody>
    `;
    valoresTablePagamento.appendChild(newTablePagamento);
}

inputSeguradoraSecundaria(valoresTablePagamento, 5, null);
setupInputEventDelegation(valoresTablePagamento);


// Função para adicionar as colunas de Pagamento
function addPagamentoColumns(id) {
    const newThPlanoOuroPagamento = document.createElement('th');
    newThPlanoOuroPagamento.className = 'th-color-secundario';
    newThPlanoOuroPagamento.innerHTML = `<p class="p-title-table-seguradora2" data-id="${id}">-</p> Plano Ouro`;
    thTablePagamento.appendChild(newThPlanoOuroPagamento);

    const newTdPlanoOuroPagamentoAvista = document.createElement('td');
    newTdPlanoOuroPagamentoAvista.innerHTML = `<input type="text" data-id="${id}" id="pOuroAVista" placeholder="R$ 0,00">`;
    tdTablePagamentoAvista.appendChild(newTdPlanoOuroPagamentoAvista);

    const newTdPlanoOuroPagamento1 = document.createElement('td');
    newTdPlanoOuroPagamento1.innerHTML = `<input type="text" data-id="${id}" id="pOuro1" placeholder="R$ 0,00">`;
    tdTablePagamento1.appendChild(newTdPlanoOuroPagamento1);

    const newTdPlanoOuroPagamento2 = document.createElement('td');
    newTdPlanoOuroPagamento2.innerHTML = `<input type="text" data-id="${id}" id="pOuro2" placeholder="R$ 0,00">`;
    tdTablePagamento2.appendChild(newTdPlanoOuroPagamento2);

    const newTdPlanoOuroPagamento3 = document.createElement('td');
    newTdPlanoOuroPagamento3.innerHTML = `<input type="text" data-id="${id}" id="pOuro3" placeholder="R$ 0,00">`;
    tdTablePagamento3.appendChild(newTdPlanoOuroPagamento3);

    const newTdPlanoOuroPagamento4 = document.createElement('td');
    newTdPlanoOuroPagamento4.innerHTML = `<input type="text" data-id="${id}" id="pOuro4" placeholder="R$ 0,00">`;
    tdTablePagamento4.appendChild(newTdPlanoOuroPagamento4);

    const newTdPlanoOuroPagamento5 = document.createElement('td');
    newTdPlanoOuroPagamento5.innerHTML = `<input type="text" data-id="${id}" id="pOuro5" placeholder="R$ 0,00">`;
    tdTablePagamento5.appendChild(newTdPlanoOuroPagamento5);

    const newTdPlanoOuroPagamento6 = document.createElement('td');
    newTdPlanoOuroPagamento6.innerHTML = `<input type="text" data-id="${id}" id="pOuro6" placeholder="R$ 0,00">`;
    tdTablePagamento6.appendChild(newTdPlanoOuroPagamento6);

    const newTdPlanoOuroPagamento7 = document.createElement('td');
    newTdPlanoOuroPagamento7.innerHTML = `<input type="text" data-id="${id}" id="pOuro7" placeholder="R$ 0,00">`;
    tdTablePagamento7.appendChild(newTdPlanoOuroPagamento7);

    const newTdPlanoOuroPagamento8 = document.createElement('td');
    newTdPlanoOuroPagamento8.innerHTML = `<input type="text" data-id="${id}" id="pOuro8" placeholder="R$ 0,00">`;
    tdTablePagamento8.appendChild(newTdPlanoOuroPagamento8);

    const newTdPlanoOuroPagamento9 = document.createElement('td');
    newTdPlanoOuroPagamento9.innerHTML = `<input type="text" data-id="${id}" id="pOuro9" placeholder="R$ 0,00">`;
    tdTablePagamento9.appendChild(newTdPlanoOuroPagamento9);

    const newTdPlanoOuroPagamento10 = document.createElement('td');
    newTdPlanoOuroPagamento10.innerHTML = `<input type="text" data-id="${id}" id="pOuro10" placeholder="R$ 0,00">`;
    tdTablePagamento10.appendChild(newTdPlanoOuroPagamento10);

    const newTdPlanoOuroPagamento11 = document.createElement('td');
    newTdPlanoOuroPagamento11.innerHTML = `<input type="text" data-id="${id}" id="pOuro11" placeholder="R$ 0,00">`;
    tdTablePagamento11.appendChild(newTdPlanoOuroPagamento11);

    const newTdPlanoOuroPagamento12 = document.createElement('td');
    newTdPlanoOuroPagamento12.innerHTML = `<input type="text" data-id="${id}" id="pOuro12" placeholder="R$ 0,00">`;
    tdTablePagamento12.appendChild(newTdPlanoOuroPagamento12);

    const newThPlanoPrataPagamento = document.createElement('th');
    newThPlanoPrataPagamento.className = 'th-color-secundario';
    newThPlanoPrataPagamento.innerHTML = `<p class="p-title-table-seguradora2" data-id="${id}">-</p> Plano Prata`;
    thTablePagamento.appendChild(newThPlanoPrataPagamento);

    const newTdPlanoPrataPagamentoAvista = document.createElement('td');
    newTdPlanoPrataPagamentoAvista.innerHTML = `<input type="text" data-id="${id}" id="pPrataAVista" placeholder="R$ 0,00">`;
    tdTablePagamentoAvista.appendChild(newTdPlanoPrataPagamentoAvista);

    const newTdPlanoPrataPagamento1 = document.createElement('td');
    newTdPlanoPrataPagamento1.innerHTML = `<input type="text" data-id="${id}" id="pPrata1" placeholder="R$ 0,00">`;
    tdTablePagamento1.appendChild(newTdPlanoPrataPagamento1);

    const newTdPlanoPrataPagamento2 = document.createElement('td');
    newTdPlanoPrataPagamento2.innerHTML = `<input type="text" data-id="${id}" id="pPrata2" placeholder="R$ 0,00">`;
    tdTablePagamento2.appendChild(newTdPlanoPrataPagamento2);

    const newTdPlanoPrataPagamento3 = document.createElement('td');
    newTdPlanoPrataPagamento3.innerHTML = `<input type="text" data-id="${id}" id="pPrata3" placeholder="R$ 0,00">`;
    tdTablePagamento3.appendChild(newTdPlanoPrataPagamento3);

    const newTdPlanoPrataPagamento4 = document.createElement('td');
    newTdPlanoPrataPagamento4.innerHTML = `<input type="text" data-id="${id}" id="pPrata4" placeholder="R$ 0,00">`;
    tdTablePagamento4.appendChild(newTdPlanoPrataPagamento4);

    const newTdPlanoPrataPagamento5 = document.createElement('td');
    newTdPlanoPrataPagamento5.innerHTML = `<input type="text" data-id="${id}" id="pPrata5" placeholder="R$ 0,00">`;
    tdTablePagamento5.appendChild(newTdPlanoPrataPagamento5);

    const newTdPlanoPrataPagamento6 = document.createElement('td');
    newTdPlanoPrataPagamento6.innerHTML = `<input type="text" data-id="${id}" id="pPrata6" placeholder="R$ 0,00">`;
    tdTablePagamento6.appendChild(newTdPlanoPrataPagamento6);

    const newTdPlanoPrataPagamento7 = document.createElement('td');
    newTdPlanoPrataPagamento7.innerHTML = `<input type="text" data-id="${id}" id="pPrata7" placeholder="R$ 0,00">`;
    tdTablePagamento7.appendChild(newTdPlanoPrataPagamento7);

    const newTdPlanoPrataPagamento8 = document.createElement('td');
    newTdPlanoPrataPagamento8.innerHTML = `<input type="text" data-id="${id}" id="pPrata8" placeholder="R$ 0,00">`;
    tdTablePagamento8.appendChild(newTdPlanoPrataPagamento8);

    const newTdPlanoPrataPagamento9 = document.createElement('td');
    newTdPlanoPrataPagamento9.innerHTML = `<input type="text" data-id="${id}" id="pPrata9" placeholder="R$ 0,00">`;
    tdTablePagamento9.appendChild(newTdPlanoPrataPagamento9);

    const newTdPlanoPrataPagamento10 = document.createElement('td');
    newTdPlanoPrataPagamento10.innerHTML = `<input type="text" data-id="${id}" id="pPrata10" placeholder="R$ 0,00">`;
    tdTablePagamento10.appendChild(newTdPlanoPrataPagamento10);

    const newTdPlanoPrataPagamento11 = document.createElement('td');
    newTdPlanoPrataPagamento11.innerHTML = `<input type="text" data-id="${id}" id="pPrata11" placeholder="R$ 0,00">`;
    tdTablePagamento11.appendChild(newTdPlanoPrataPagamento11);

    const newTdPlanoPrataPagamento12 = document.createElement('td');
    newTdPlanoPrataPagamento12.innerHTML = `<input type="text" data-id="${id}" id="pPrata12" placeholder="R$ 0,00">`;
    tdTablePagamento12.appendChild(newTdPlanoPrataPagamento12);
}

inputSeguradoraSecundaria(tdTablePagamentoAvista, 4, 1);
inputSeguradoraSecundaria(tdTablePagamento1, 4, 2);
inputSeguradoraSecundaria(tdTablePagamento2, 4, 3);
inputSeguradoraSecundaria(tdTablePagamento3, 4, 4);
inputSeguradoraSecundaria(tdTablePagamento4, 4, 5);
inputSeguradoraSecundaria(tdTablePagamento5, 4, 6);
inputSeguradoraSecundaria(tdTablePagamento6, 4, 7);
inputSeguradoraSecundaria(tdTablePagamento7, 4, 8);
inputSeguradoraSecundaria(tdTablePagamento8, 4, 9);
inputSeguradoraSecundaria(tdTablePagamento9, 4, 10);
inputSeguradoraSecundaria(tdTablePagamento10, 4, 11);
inputSeguradoraSecundaria(tdTablePagamento11, 4, 12);
inputSeguradoraSecundaria(tdTablePagamento12, 4, 13);

setupInputEventDelegation(tdTablePagamentoAvista);
setupInputEventDelegation(tdTablePagamento1);
setupInputEventDelegation(tdTablePagamento2);
setupInputEventDelegation(tdTablePagamento3);
setupInputEventDelegation(tdTablePagamento4);
setupInputEventDelegation(tdTablePagamento5);
setupInputEventDelegation(tdTablePagamento6);
setupInputEventDelegation(tdTablePagamento7);
setupInputEventDelegation(tdTablePagamento8);
setupInputEventDelegation(tdTablePagamento9);
setupInputEventDelegation(tdTablePagamento10);
setupInputEventDelegation(tdTablePagamento11);
setupInputEventDelegation(tdTablePagamento12);

function addSeguradoraExport() {
    seguradoraCounter++; // Incrementa o contador de seguradoras

    // Limpa o objeto seguradoraStatus
    for (let key in seguradoraStatus) {
        delete seguradoraStatus[key];
    }
    seguradoraStatus[seguradoraCounter] = 1;

    eventSeguradoraStatusFranquia(seguradoraStatus[1]);
    eventSeguradoraStatusVeiculo(seguradoraStatus[1]);

    if (seguradoraCounter >= 2) {
        customSwal.fire({
            title: 'Limite de Seguradoras',
            text: 'Você só pode adicionar até 2 seguradoras por orçamento. Remova uma para adicionar outra.',
            icon: 'info',
            iconColor: '#01458e'
        });

        return;
    }

    // Alterna a visibilidade dos botões
    displayBlockNone(addSeguradoraBtn, 'none', removeSeguradoraBtn, 'block');

    // Cria uma div para a seguradora com um id exclusivo
    const newSeguradoraDiv = document.createElement('div');
    newSeguradoraDiv.setAttribute('data-id', seguradoraCounter);
    newSeguradoraDiv.innerHTML = `
        <label for="selecionar">Cia</label>
        <select class="select-seguradora" data-id="${seguradoraCounter}">
            <option value="selecione" disabled selected>Selecione</option>
            <option value="Allianz">Allianz</option>
            <option value="Allianz Trade">Allianz Trade</option>
            <option value="American Life">American Life</option>
            <option value="AXA">AXA</option>
            <option value="Azul">Azul</option>
            <option value="Bradesco">Bradesco</option>
            <option value="HDI">HDI</option>
            <option value="Itau">Itaú</option>
            <option value="Liberty">Liberty</option>
            <option value="Mapfre">Mapfre</option>
            <option value="Mitsui">Mitsui</option>
            <option value="Porto">Porto</option>
            <option value="Pottencial">Pottencial</option>
            <option value="SulAmerica">SulAmérica</option>
            <option value="Sompo">Sompo</option>
            <option value="Suhai">Suhai</option>
            <option value="Tokio">Tokio</option>
            <option value="Zurich">Zurich</option>
        </select>
    `;

    // Adiciona o novo elemento ao container
    container.appendChild(newSeguradoraDiv);

    containerRecomendado.style.display = 'block';

    // Adiciona novas colunas
    addCoberturaColumns(seguradoraCounter);
    addClausulaColumns(seguradoraCounter);
    addFranquiasColumns(seguradoraCounter);
    addPagamentoColumns(seguradoraCounter);
    addPagamentoTable(seguradoraCounter);

    // Captura o novo select e ouve mudanças nele
    const selectElement = document.querySelector(`.select-seguradora[data-id="${seguradoraCounter}"]`);

    // Adiciona um listener para capturar o valor do select dinamicamente
    selectElement.addEventListener('change', () => {
        selectedValueSeguradoraSecundaria = selectElement.value; // Atualiza a variável global com o valor selecionado
    });
};

export { addSeguradoraExport };