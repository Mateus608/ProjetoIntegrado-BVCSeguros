import { displayBlockNone } from "./functionCliente.js";
import { customSwal } from "./alertasCustom.js";
import { setSeguradoraCounter, eventListenerRemoveSeguradoraBtn } from "./adicionarSeguradora.js";
import { setupInputEventDelegation } from "./functionCliente.js";
import { inputSeguradoraSecundaria } from "./functionCliente.js";
import { addFranquiasColumnsIndividual, removeFranquiasColumnsIndividual } from "./adicionarFranquia.js";

const thTableCoberturas = document.querySelector('#tr-th-coberturas-individual');
const tdTableCoberturas1 = document.querySelector('#tr-td-coberturas-individual1');
const tdTableCoberturas2 = document.querySelector('#tr-td-coberturas-individual2');
const tdTableCoberturas3 = document.querySelector('#tr-td-coberturas-individual3');
const tdTableCoberturas4 = document.querySelector('#tr-td-coberturas-individual4');
const tdTableCoberturas5 = document.querySelector('#tr-td-coberturas-individual5');
const tdTableCoberturas6 = document.querySelector('#tr-td-coberturas-individual6');
const thTableClausulas = document.querySelector('#tr-th-clausulas-individual');
const tdTableClausulas1 = document.querySelector('#tr-td-clausulas-individual1');
const tdTableClausulas2 = document.querySelector('#tr-td-clausulas-individual2');
const tdTableClausulas3 = document.querySelector('#tr-td-clausulas-individual3');
const tdTableClausulas4 = document.querySelector('#tr-td-clausulas-individual4');
const tdTableClausulas5 = document.querySelector('#tr-td-clausulas-individual5');
const thTableFranquias = document.querySelector('#tr-th-franquias-individual');
const tdTableFranquias = document.querySelector('#tr-td-franquias-individual');

const containerSeguradoraRecomendadaIndividual = document.querySelector('#container-recomendado-individual');
const seguradoraRecomendadaIndividual3 = document.querySelector('#seguradora-recomendada3');
const seguradoraRecomendadaIndividual4 = document.querySelector('#seguradora-recomendada4');

const valoresTablePagamento = document.querySelector('#container-pagamento-segunda-seguradora-individual');
const thTablePagamento = document.querySelector('#tr-th-pagamento-individual');
export const tdTablePagamentoAvista = document.querySelector('#tr-td-pagamento-avista-individual');
const tdTablePagamento1 = document.querySelector('#tr-td-pagamento-individual1');
const tdTablePagamento2 = document.querySelector('#tr-td-pagamento-individual2');
const tdTablePagamento3 = document.querySelector('#tr-td-pagamento-individual3');
const tdTablePagamento4 = document.querySelector('#tr-td-pagamento-individual4');
const tdTablePagamento5 = document.querySelector('#tr-td-pagamento-individual5');
const tdTablePagamento6 = document.querySelector('#tr-td-pagamento-individual6');
const tdTablePagamento7 = document.querySelector('#tr-td-pagamento-individual7');
const tdTablePagamento8 = document.querySelector('#tr-td-pagamento-individual8');
const tdTablePagamento9 = document.querySelector('#tr-td-pagamento-individual9');
const tdTablePagamento10 = document.querySelector('#tr-td-pagamento-individual10');
const tdTablePagamento11 = document.querySelector('#tr-td-pagamento-individual11');
const tdTablePagamento12 = document.querySelector('#tr-td-pagamento-individual12');

// Objeto para rastrear o status de cada seguradora
export let seguradoraStatusGrMn = {};
seguradoraStatusGrMn[1] = 0;

let selectedValuesSeguradorasGrMr = [];

export let seguradoraIndice = [];

let seguradoraCounterGm = 0; // Contador de seguradoras adicionadas
const container = document.getElementById('container-seguradoras'); // Container onde o botão será inserido

document.addEventListener('DOMContentLoaded', function () {
    const newButtonAdd = document.getElementById('add-cia-menor-preco');
    const addCia = document.querySelector('.add-seguradora');
    const removeSeguradoraBtn = document.querySelector('.remove-seguradora-btn');
    const sectionIndividual = document.querySelector('.section-individual');
    const serata = document.querySelector('.section-pop');

    // Adiciona evento para mudança no tipo de orçamento
    const tipoOrcamentoInputs = document.querySelectorAll('input[name="tipo-orcamento"]');
    if (tipoOrcamentoInputs) {
        tipoOrcamentoInputs.forEach(input => {
            input.addEventListener('change', function () {
                const tipoSelecionado = document.querySelector('input[name="tipo-orcamento"]:checked').value;
                if (tipoSelecionado === 'Gestor') {
                    customSwal.fire({
                        title: 'Atenção',
                        html: `Você tem certeza de que deseja alterar a modalidade do orçamento para 'Gestor de Risco'? Os dados preenchidos na modalidade 'Menor Preço' poderão ser perdidos.`,
                        icon: 'warning',
                        iconColor: '#01458e',
                        showCancelButton: true,  // Mostra o botão de cancelar
                        confirmButtonText: 'Confirmar',
                        cancelButtonText: 'Cancelar',
                        reverseButtons: true // Inverte a ordem dos botões (Confirmar à esquerda)
                    }).then((result) => {
                        if (result.isConfirmed) {
                            gestorRisco();
                            displayBlockNone(newButtonAdd, 'none', addCia, 'block');
                            containerSeguradoraRecomendadaIndividual.style.display = 'none';
                            seguradoraRecomendadaIndividual3.style.display = 'none';
                            seguradoraRecomendadaIndividual4.style.display = 'none';
                        } else if (result.isDismissed) {
                            document.querySelector('input[value="Menor"]').checked = true;
                            return;
                        }
                    });
                } else if (tipoSelecionado === 'Menor') {
                    customSwal.fire({
                        title: 'Atenção',
                        html: `Você tem certeza de que deseja alterar a modalidade do orçamento para 'Menor Preço'? Os dados preenchidos na modalidade 'Gestor de Risco' poderão ser perdidos.`,
                        icon: 'warning',
                        iconColor: '#01458e',
                        showCancelButton: true,  // Mostra o botão de cancelar
                        confirmButtonText: 'Confirmar',
                        cancelButtonText: 'Cancelar',
                        reverseButtons: true // Inverte a ordem dos botões (Confirmar à esquerda)
                    }).then((result) => {
                        if (result.isConfirmed) {
                            menorPreco();
                            displayBlockNone(addCia, 'none', newButtonAdd, 'block');
                            removeSeguradoraBtn.style.display = 'none';
                            setSeguradoraCounter(0);
                        } else if (result.isDismissed) {
                            document.querySelector('input[value="Gestor"]').checked = true;
                            return;
                        }
                    });
                }
            });
        });
    } else {
        console.error('Elementos "input[name=tipo-orcamento]" não encontrados.');
    }

    // Função para menor preço
    function menorPreco() {
        // Limpa as seguradoras adicionadas dinamicamente
        const seguradoras = document.querySelectorAll('#container-seguradoras > div[data-id]');
        seguradoras.forEach(seguradora => seguradora.remove());
        eventListenerRemoveSeguradoraBtn();
        // Oculta as tabelas Plano Ouro e Prata e deixa visível a tabela individual
        displayBlockNone(serata, 'none', sectionIndividual, 'block');
    }

    // Função para restaurar conteúdo original (Gestor de Risco)
    function gestorRisco() {
        // Limpa as seguradoras adicionadas dinamicamente
        const seguradoras = document.querySelectorAll('#container-seguradoras > div[data-id]');
        seguradoras.forEach(seguradora => seguradora.remove());

        // Remove apenas as colunas de seguradoras adicionadas dinamicamente, com data-id
        removeTh(thTableCoberturas);
        removeTh(thTableClausulas);
        removeTh(thTableFranquias);
        removeTh(thTablePagamento);

        removeParentForInput(tdTableCoberturas1);
        removeParentForInput(tdTableCoberturas2);
        removeParentForInput(tdTableCoberturas3);
        removeParentForInput(tdTableCoberturas4);
        removeParentForInput(tdTableCoberturas5);
        removeParentForInput(tdTableCoberturas6);
        removeParentForInput(tdTableClausulas1);
        removeParentForInput(tdTableClausulas2);
        removeParentForInput(tdTableClausulas3);
        removeParentForInput(tdTableClausulas4);
        removeParentForInput(tdTableClausulas5);
        removeParentForInput(tdTableFranquias);
        removeParentForInput(tdTablePagamentoAvista);
        removeParentForInput(tdTablePagamento1);
        removeParentForInput(tdTablePagamento2);
        removeParentForInput(tdTablePagamento3);
        removeParentForInput(tdTablePagamento4);
        removeParentForInput(tdTablePagamento5);
        removeParentForInput(tdTablePagamento6);
        removeParentForInput(tdTablePagamento7);
        removeParentForInput(tdTablePagamento8);
        removeParentForInput(tdTablePagamento9);
        removeParentForInput(tdTablePagamento10);
        removeParentForInput(tdTablePagamento11);
        removeParentForInput(tdTablePagamento12);

        for (let i = 1; i <= seguradoraCounterGm; i++) {
            removePagamentoTable(i);
        }

        seguradoraCounterGm = 0;

        // Restaura o conteúdo original da tabela
        // Oculta as tabelas Plano Ouro e Prata e deixa visível a tabela individual
        displayBlockNone(sectionIndividual, 'none', serata, 'block');
    }

    // Função para adicionar seguradoras
    newButtonAdd.addEventListener('click', addSeguradoraIndividualExport);

    // Função para remover seguradora e suas colunas associadas
    function removeSeguradora(id) {

        // Atualiza o índice antes de qualquer operação
        seguradoraIndice.push(parseInt(id));
        console.log('removido ', seguradoraIndice);

        switch (seguradoraCounterGm) {
            case 3:
                seguradoraRecomendadaIndividual4.style.display = 'none';
                break;

            case 2:
                seguradoraRecomendadaIndividual3.style.display = 'none';
                break;

            case 1:
                containerSeguradoraRecomendadaIndividual.style.display = 'none';
                break;

            default:
                console.warn("indice [seguradoraCounterGm] não atendido");
        };

        // Atualiza o status da seguradora
        seguradoraStatusGrMn[1]--;

        removeFranquiasColumnsIndividual(id)

        // Remove o div da seguradora
        const seguradoraDiv = document.querySelector(`div[data-id="${id}"]`);
        if (seguradoraDiv) {
            seguradoraDiv.remove();
        }

        // Remove as colunas associadas à seguradora da tabela
        removeForIndex(thTableCoberturas, [tdTableCoberturas1, tdTableCoberturas2, tdTableCoberturas3, tdTableCoberturas4, tdTableCoberturas5, tdTableCoberturas6], id);
        removeForIndex(thTableClausulas, [tdTableClausulas1, tdTableClausulas2, tdTableClausulas3, tdTableClausulas4, tdTableClausulas5], id);
        removeForIndex(thTableFranquias, [tdTableFranquias], id);
        removeForIndex(thTablePagamento, [tdTablePagamentoAvista, tdTablePagamento1, tdTablePagamento2, tdTablePagamento3, tdTablePagamento4, tdTablePagamento5, tdTablePagamento6, tdTablePagamento7, tdTablePagamento8, tdTablePagamento9, tdTablePagamento10, tdTablePagamento11, tdTablePagamento12], id);
        removePagamentoTable(id);

        // Atualiza o contador de seguradoras
        seguradoraCounterGm--;

        const indexToRemove = id - 1; // id é baseado em 1, então subtraímos 1 para usar no índice do array
        if (indexToRemove >= 0 && indexToRemove < selectedValuesSeguradorasGrMr.length) {
            selectedValuesSeguradorasGrMr.splice(indexToRemove, 1); // Remove o valor da posição
        }

        // Reindexa os selects e as colunas
        reindexSeguradoras();
    };

    // Função para reindexar as seguradoras
    function reindexSeguradoras() {
        const seguradorasDiv = document.querySelectorAll('#container-seguradoras > div[data-id]');

        seguradorasDiv.forEach((div, index) => {
            const newId = index + 1; // Novo ID baseado no índice
            div.setAttribute('data-id', newId);

            // Atualiza o select dentro do div
            const select = div.querySelector('.select-seguradora');
            if (select) {
                select.setAttribute('data-id', newId);
            }

            // Atualiza o botão de remoção dentro do div
            const removeButton = div.querySelector('.remove-seguradora');
            if (removeButton) {
                removeButton.setAttribute('data-id', newId);
            }

            // Atualiza os inputs associados ao div
            const inputs = div.querySelectorAll('input[id^="v-individual"]');
            inputs.forEach((input, inputIndex) => {
                input.id = `v-individual${newId}-${inputIndex + 1}`; // IDs exclusivos para cada input
            });
        });

        // Atualiza os selects e inputs na tabela
        updateTableIds(thTableCoberturas);
        updateTableIds(thTableClausulas);
        updateTableIds(thTableFranquias);
        updateTableIds(thTablePagamento);
        updateTableIds(valoresTablePagamento);
    }

    // Atualiza os IDs dos elementos na tabela
    function updateTableIds(thNameTable) {
        const thColumns = thNameTable.querySelectorAll('.p-title-table-seguradora2[data-id]');
        thColumns.forEach((th, index) => {
            th.setAttribute('data-id', index + 1);
        });

        reindexTdColumns([tdTableCoberturas1, tdTableCoberturas2, tdTableCoberturas3, tdTableCoberturas4, tdTableCoberturas5, tdTableCoberturas6]);
        reindexTdColumns([tdTableClausulas1, tdTableClausulas2, tdTableClausulas3, tdTableClausulas4, tdTableClausulas5]);
        reindexTdColumns([tdTableFranquias]);
        reindexTdColumns([tdTablePagamentoAvista, tdTablePagamento1, tdTablePagamento2, tdTablePagamento3, tdTablePagamento4, tdTablePagamento5, tdTablePagamento6, tdTablePagamento7, tdTablePagamento8, tdTablePagamento9, tdTablePagamento10, tdTablePagamento11, tdTablePagamento12]);
        reindexTdColumns([valoresTablePagamento])
    };

    // Adiciona evento de clique no ícone de remoção
    container.addEventListener('click', function (event) {
        if (event.target && event.target.closest('.remove-seguradora')) {
            const seguradoraDiv = event.target.closest('.remove-seguradora');
            const id = seguradoraDiv ? seguradoraDiv.getAttribute('data-id') : null;

            if (id) {
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
                                html: `Seguradora excluída: <strong>${selectedValuesSeguradorasGrMr[id - 1]}</strong>`,
                                icon: 'success',
                                iconColor: '#068e01'
                            });
                            removeSeguradora(id);
                        } else if (result.isDismissed) {
                            return;
                        }
                    });
                }

                // Verifique se a seguradora secundária foi selecionada
                if (selectedValuesSeguradorasGrMr[id - 1] === undefined) {
                    showConfirmationSwal('Você tem certeza de que deseja excluir esta seguradora deste orçamento? Esta ação não pode ser desfeita.');
                } else {
                    showConfirmationSwal(`Você tem certeza de que deseja excluir a seguradora <strong>${selectedValuesSeguradorasGrMr[id - 1]}</strong> deste orçamento? Esta ação não pode ser desfeita.`);
                }
            }
        }
    });
});

export { selectedValuesSeguradorasGrMr };

// Função para adicionar colunas à tabela
function addCoberturaColumns(id) {
    const newThCoberturas = document.createElement('th');
    newThCoberturas.className = 'th-color-secundario';
    newThCoberturas.innerHTML = `<p class="p-title-table-seguradora2" data-id="${id}">-</p>`;
    thTableCoberturas.appendChild(newThCoberturas);

    const newTdCoberturas1 = document.createElement('td');
    newTdCoberturas1.innerHTML = ` 
                        <select data-id="${id}" id="v-individual-cobertura-fipe${id}" class="cobertura-individual1${id}">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="100% TAB. FIPE">100% TAB. FIPE</option>
                        </select>
    `;
    tdTableCoberturas1.appendChild(newTdCoberturas1);

    const newTdCoberturas2 = document.createElement('td');
    newTdCoberturas2.innerHTML = `<input type="text" data-id="${id}"  id="v-individual-cobertura-danos-materiais${id}" class="cobertura-individual2${id}" placeholder="R$ 0,00" title="Insira o valor da cobertura">`;
    tdTableCoberturas2.appendChild(newTdCoberturas2);

    const newTdCoberturas3 = document.createElement('td');
    newTdCoberturas3.innerHTML = `<input type="text" data-id="${id}" id="v-individual-cobertura-danos-corporais${id}" class="cobertura-individual3${id}" placeholder="R$ 0,00" title="Insira o valor da cobertura">`;
    tdTableCoberturas3.appendChild(newTdCoberturas3);

    const newTdCoberturas4 = document.createElement('td');
    newTdCoberturas4.innerHTML = `<input type="text" data-id="${id}" id="v-individual-cobertura-danos-morais${id}" class="cobertura-individual4${id}" placeholder="R$ 0,00" title="Insira o valor da cobertura">`;
    tdTableCoberturas4.appendChild(newTdCoberturas4);

    const newTdCoberturas5 = document.createElement('td');
    newTdCoberturas5.innerHTML = `<input type="text" data-id="${id}" id="v-individual-app-morte${id}" class="cobertura-individual5${id}" placeholder="R$ 0,00" title="Insira o valor da cobertura">`;
    tdTableCoberturas5.appendChild(newTdCoberturas5);

    const newTdCoberturas6 = document.createElement('td');
    newTdCoberturas6.innerHTML = `<input type="text" data-id="${id}" id="v-individual-app-invalidez${id}" class="cobertura-individual6${id}" placeholder="R$ 0,00" title="Insira o valor da cobertura">`;
    tdTableCoberturas6.appendChild(newTdCoberturas6);
};

setupInputEventDelegation(tdTableCoberturas2);
setupInputEventDelegation(tdTableCoberturas3);
setupInputEventDelegation(tdTableCoberturas4);
setupInputEventDelegation(tdTableCoberturas5);
setupInputEventDelegation(tdTableCoberturas6);

export let arrayCoberturasGr = [];  // Array que armazenará os objetos

function capturarValoresCoberturas() {
    arrayCoberturasGr = [];

    // Captura inputs e selects diretamente, sem depender de <th>
    const coberturas = document.querySelectorAll('select[id^="v-individual-cobertura-fipe"], input[id^="v-individual-cobertura"], input[id^="v-individual-app"]');

    // Agrupar por `data-id`
    let dadosAgrupados = {};

    coberturas.forEach(element => {
        const id = element.getAttribute('data-id');

        if (!dadosAgrupados[id]) {
            dadosAgrupados[id] = { id: id };
        }

        if (element.tagName === 'SELECT') {
            dadosAgrupados[id].fipe = element.value;
        } else {
            dadosAgrupados[id][element.id] = element.value;
        }
    });

    // Converte para array
    arrayCoberturasGr = Object.values(dadosAgrupados);

    console.log(arrayCoberturasGr);
}

export { capturarValoresCoberturas };

// Função para adicionar as colunas de Clausulas
function addClausulaColumns(id) {
    const newThClausulas = document.createElement('th');
    newThClausulas.className = 'th-color-secundario';
    newThClausulas.innerHTML = `<p class="p-title-table-seguradora2" data-id="${id}">-</p>`;
    thTableClausulas.appendChild(newThClausulas);

    const newClausulas1 = document.createElement('td');
    newClausulas1.innerHTML = `
                         <select data-id="${id}" id="v-individual-clausulas-assistencia24h${id}" class="clausula-individual1${id}">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="SIM">Sim</option>
                            <option value="NÃO">Não</option>
                        </select>
    `;
    tdTableClausulas1.appendChild(newClausulas1);

    const newClausulas2 = document.createElement('td');
    newClausulas2.innerHTML = `
                        <select data-id="${id}" id="v-individual-clausulas-carro-reserva${id}" class="clausula-individual2${id}">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="ILIMITADO">Ilimitado</option>
                            <option value="15 DIAS">15 Dias</option>
                            <option value="30 DIAS">30 Dias</option>
                            <option value="NÃO POSSUI">Não possui</option>
                        </select>
    
    `;
    tdTableClausulas2.appendChild(newClausulas2);

    const newClausulas3 = document.createElement('td');
    newClausulas3.innerHTML = `
                         <select data-id="${id}" id="v-individual-clausulas-martelinho-ouro${id}" class="clausula-individual3${id}">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="SIM">Sim</option>
                            <option value="NÃO">Não</option>
                        </select>
    `;
    tdTableClausulas3.appendChild(newClausulas3);

    const newClausulas4 = document.createElement('td');
    newClausulas4.innerHTML = `
                         <select data-id="${id}" id="v-individual-clausulas-vidros-retrovisores${id}" class="clausula-individual4${id}">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="SIM">Sim</option>
                            <option value="NÃO">Não</option>
                        </select>
    `;
    tdTableClausulas4.appendChild(newClausulas4);

    const newClausulas5 = document.createElement('td');
    newClausulas5.innerHTML = `
                         <select data-id="${id}" id="v-individual-clausulas-lanternas-farois${id}" class="clausula-individual5${id}">
                            <option value="selecione" disabled selected>Selecione</option>
                            <option value="SIM">Sim</option>
                            <option value="NÃO">Não</option>
                        </select>
    `;
    tdTableClausulas5.appendChild(newClausulas5);
};

export let arrayClausulasGr = [];  // Array que armazenará os objetos

function capturarValoresClausulas() {
    arrayClausulasGr = [];

    // Captura inputs e selects diretamente, sem depender de <th>
    const clausulas = document.querySelectorAll('select[id^="v-individual-clausulas"]');

    // Agrupar por `data-id`
    let dadosAgrupados = {};

    clausulas.forEach(element => {
        const id = element.getAttribute('data-id');
        const idName = element.id;  // Pega o id completo do select

        if (!dadosAgrupados[id]) {
            dadosAgrupados[id] = { id: id }; // Adiciona um array para armazenar os valores dos selects
        }

        if (element.tagName === 'SELECT') {
            dadosAgrupados[id][idName] = element.value; // Adiciona o nome do id com o valor selecionado
        }
    });

    // Converte para array
    arrayClausulasGr = Object.values(dadosAgrupados);

    console.log(arrayClausulasGr);
};

export { capturarValoresClausulas };

// Função para adicionar as colunas de Franquias
function addFranquiasColumns(id) {
    // Criando a coluna para o Plano Ouro
    const newThFranquias = document.createElement('th');
    newThFranquias.className = 'th-color-secundario';
    newThFranquias.innerHTML = `<p class="p-title-table-seguradora2" data-id="${id}">-</p>`;
    thTableFranquias.appendChild(newThFranquias);

    const newTdFranquias = document.createElement('td');
    newTdFranquias.innerHTML = `<input type="text" data-id="${id}" id="v-individual-franquia${id}" class="franquia-individual${id}" placeholder="R$ 0,00" title="Insira o valor da franquia">`;
    tdTableFranquias.appendChild(newTdFranquias);
};

setupInputEventDelegation(tdTableFranquias);

export let arrayFranquiasGr = [];  // Array que armazenará os objetos

function capturarValoresFranquias() {
    arrayFranquiasGr = [];

    // Captura inputs e selects diretamente, sem depender de <th>
    const franquias = document.querySelectorAll('input[id^="v-individual-franquia"]');

    // Agrupar por `data-id`
    let dadosAgrupados = {};

    franquias.forEach(element => {
        const id = element.getAttribute('data-id');

        if (!dadosAgrupados[id]) {
            dadosAgrupados[id] = { id: id };
        }

        dadosAgrupados[id][element.id] = element.value;
    });

    // Converte para array
    arrayFranquiasGr = Object.values(dadosAgrupados);

    console.log(arrayFranquiasGr);
};

export { capturarValoresFranquias };

// Adiciona a Tabela de valores do pagamento
function addPagamentoTable(id) {
    const newTablePagamento = document.createElement('table');
    newTablePagamento.className = 'new-table-pagamento';
    newTablePagamento.setAttribute('data-id', id); // Adiciona o atributo data-id para identificação
    newTablePagamento.innerHTML = `
        <thead>
            <tr>
                <th colspan="2" class="th-color-secundario"><p class="p-title-table-seguradora2" data-id="${id}">-</p></th>
            </tr>
        </thead>
        <tbody>
        <tr></tr>
            <tr>
                <td>VALOR À VISTA</td>
                <td><input type="text" id="valor-avista-individual${id}" class="table-pagamento-individual${id}" name="nome" placeholder="R$ 0,00" title="Insira o valor do prêmio"></td>
            </tr>
        </tbody>
    `;
    valoresTablePagamento.appendChild(newTablePagamento);
};

inputSeguradoraSecundaria(valoresTablePagamento, 6, null);
setupInputEventDelegation(valoresTablePagamento);


// Função para adicionar as colunas de Pagamento
function addPagamentoColumns(id) {
    const newThPagamento = document.createElement('th');
    newThPagamento.className = 'th-color-secundario';
    newThPagamento.innerHTML = `<p class="p-title-table-seguradora2" data-id="${id}">-</p>`;
    thTablePagamento.appendChild(newThPagamento);

    const newTdPagamentoAvista = document.createElement('td');
    newTdPagamentoAvista.innerHTML = `<input type="text" data-id="${id}" id="v-individual-pagamento-AVista${id}" class="p-individualAVista${id}" placeholder="R$ 0,00">`;
    tdTablePagamentoAvista.appendChild(newTdPagamentoAvista);

    const newTdPagamento1 = document.createElement('td');
    newTdPagamento1.innerHTML = `<input type="text" data-id="${id}" id="v-individual-pagamento-1${id}" class="p-individual1${id}" placeholder="R$ 0,00">`;
    tdTablePagamento1.appendChild(newTdPagamento1);

    const newTdPagamento2 = document.createElement('td');
    newTdPagamento2.innerHTML = `<input type="text" data-id="${id}" id="v-individual-pagamento-2${id}" class="p-individual2${id}" placeholder="R$ 0,00">`;
    tdTablePagamento2.appendChild(newTdPagamento2);

    const newTdPagamento3 = document.createElement('td');
    newTdPagamento3.innerHTML = `<input type="text" data-id="${id}" id="v-individual-pagamento-3${id}" class="p-individual3${id}" placeholder="R$ 0,00">`;
    tdTablePagamento3.appendChild(newTdPagamento3);

    const newTdPagamento4 = document.createElement('td');
    newTdPagamento4.innerHTML = `<input type="text" data-id="${id}" id="v-individual-pagamento-4${id}" class="p-individual4${id}" placeholder="R$ 0,00">`;
    tdTablePagamento4.appendChild(newTdPagamento4);

    const newTdPagamento5 = document.createElement('td');
    newTdPagamento5.innerHTML = `<input type="text" data-id="${id}" id="v-individual-pagamento-5${id}" class="p-individual5${id}" placeholder="R$ 0,00">`;
    tdTablePagamento5.appendChild(newTdPagamento5);

    const newTdPagamento6 = document.createElement('td');
    newTdPagamento6.innerHTML = `<input type="text" data-id="${id}" id="v-individual-pagamento-6${id}" class="p-individual6${id}" placeholder="R$ 0,00">`;
    tdTablePagamento6.appendChild(newTdPagamento6);

    const newTdPagamento7 = document.createElement('td');
    newTdPagamento7.innerHTML = `<input type="text" data-id="${id}" id="v-individual-pagamento-7${id}" class="p-individual7${id}" placeholder="R$ 0,00">`;
    tdTablePagamento7.appendChild(newTdPagamento7);

    const newTdPagamento8 = document.createElement('td');
    newTdPagamento8.innerHTML = `<input type="text" data-id="${id}" id="v-individual-pagamento-8${id}" class="p-individual8${id}" placeholder="R$ 0,00">`;
    tdTablePagamento8.appendChild(newTdPagamento8);

    const newTdPagamento9 = document.createElement('td');
    newTdPagamento9.innerHTML = `<input type="text" data-id="${id}" id="v-individual-pagamento-9${id}" class="p-individual9${id}" placeholder="R$ 0,00">`;
    tdTablePagamento9.appendChild(newTdPagamento9);

    const newTdPagamento10 = document.createElement('td');
    newTdPagamento10.innerHTML = `<input type="text" data-id="${id}" id="v-individual-pagamento-10${id}" class="p-individual10${id}" placeholder="R$ 0,00">`;
    tdTablePagamento10.appendChild(newTdPagamento10);

    const newTdPagamento11 = document.createElement('td');
    newTdPagamento11.innerHTML = `<input type="text" data-id="${id}" id="v-individual-pagamento-11${id}" class="p-individual11${id}" placeholder="R$ 0,00">`;
    tdTablePagamento11.appendChild(newTdPagamento11);

    const newTdPagamento12 = document.createElement('td');
    newTdPagamento12.innerHTML = `<input type="text" data-id="${id}" id="v-individual-pagamento-12${id}" class="p-individual12${id}" placeholder="R$ 0,00">`;
    tdTablePagamento12.appendChild(newTdPagamento12);
};


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

export let arrayPagamentosGr = [];  // Array que armazenará os objetos

function capturarValoresPagamentos() {
    arrayPagamentosGr = [];

    // Captura inputs e selects diretamente, sem depender de <th>
    const pagamentos = document.querySelectorAll('input[id^="v-individual-pagamento"]');

    // Agrupar por `data-id`
    let dadosAgrupados = {};

    pagamentos.forEach(element => {
        const id = element.getAttribute('data-id');

        if (!dadosAgrupados[id]) {
            dadosAgrupados[id] = { id: id };
        }

        dadosAgrupados[id][element.id] = element.value;
    });

    // Converte para array
    arrayPagamentosGr = Object.values(dadosAgrupados);

    console.log(arrayPagamentosGr);
};

export { capturarValoresPagamentos };

// Função para remover a tabela de pagamento associada a um ID
function removePagamentoTable(id) {
    const tablePagamento = document.querySelector(`table[data-id="${id}"]`);
    if (tablePagamento) {
        tablePagamento.remove(); // Remove a tabela do DOM
    }
}

function removeParentForInput(tdTable) {
    const tdColumns = tdTable.querySelectorAll('input[data-id]');
    const tdSelect = tdTable.querySelectorAll('select[data-id]');
    tdColumns.forEach((td) => td.parentElement.remove());
    tdSelect.forEach((select) => {
        select.parentElement.remove();
    });
};

function reindexTdColumns(tdColumns) {
    tdColumns.forEach(tdColumn => {
        const inputs = tdColumn.querySelectorAll('input[data-id]');
        inputs.forEach((input, index) => {
            input.setAttribute('data-id', index + 1);
        });

        const selects = tdColumn.querySelectorAll('select[data-id]');
        selects.forEach((select, index) => {
            select.setAttribute('data-id', index + 1);
        });

        const tables = tdColumn.querySelectorAll('table[data-id]');
        tables.forEach((table, index) => {
            table.setAttribute('data-id', index + 1);
        });
    });
};

function removeForIndex(thNameTable, tdColumns, id) {
    const thSeguradora = thNameTable.querySelector(`.p-title-table-seguradora2[data-id="${id}"]`);
    if (thSeguradora) {
        thSeguradora.parentElement.remove();
    }
    tdColumns.forEach(tdColumn => {
        const input = tdColumn.querySelector(`input[data-id="${id}"]`);
        const select = tdColumn.querySelector(`select[data-id="${id}"]`);
        if (input) input.parentElement.remove();
        if (select) select.parentElement.remove();
    });
};

function removeTh(thNameTable) {
    const thColumns = thNameTable.querySelectorAll('.p-title-table-seguradora2[data-id]');
    thColumns.forEach((th) => th.parentElement.remove()); // Remove as células de cabeçalho da tabela
};

function addSeguradoraIndividualExport() {
    if (seguradoraCounterGm >= 3) { // Limite de seguradoras
        customSwal.fire({
            title: 'Limite de Seguradoras',
            text: 'Limite de seguradoras alcançado! É possível adicionar no máximo 3 seguradoras por orçamento.',
            icon: 'info',
            iconColor: '#01458e'
        });
        return;
    }

    containerSeguradoraRecomendadaIndividual.style.display = 'block';

    if (seguradoraCounterGm > 0) {
        seguradoraRecomendadaIndividual3.style.display = 'block';
    }

    if (seguradoraCounterGm > 1) {
        seguradoraRecomendadaIndividual4.style.display = 'block';
    }

    seguradoraStatusGrMn[1]++;
    seguradoraCounterGm++; // Incrementa o contador
    // Cria um novo select e adiciona abaixo do select existente

    addFranquiasColumnsIndividual(seguradoraStatusGrMn[1]);

    const newSeguradoraDiv = document.createElement('div');
    newSeguradoraDiv.setAttribute('data-id', seguradoraCounterGm);
    newSeguradoraDiv.innerHTML = `
        <div style="display: flex; flex-direction: row; align-items: center; gap: 5px; margin-top: 5px;">
            <div>
                <label for="selecionar">Cia</label>
                <select class="select-seguradora" data-id="${seguradoraCounterGm}">
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
            </div>
            <div class="remove-seguradora" data-id="${seguradoraCounterGm}">
                <i class="fa-solid fa-trash" style="color: #8e0101; cursor: pointer;" title="Remover Seguradora"></i>
            </div>
        </div>
    `;
    container.appendChild(newSeguradoraDiv);

    // Adiciona as colunas na tabela de coberturas
    addCoberturaColumns(seguradoraCounterGm);
    addClausulaColumns(seguradoraCounterGm);
    addFranquiasColumns(seguradoraCounterGm);
    addPagamentoColumns(seguradoraCounterGm);
    addPagamentoTable(seguradoraCounterGm);

    for (let i = 1; i <= 3; i++) {
        const selectElement = document.querySelector(`.select-seguradora[data-id="${i}"]`);

        if (selectElement) {
            selectElement.addEventListener('change', () => {
                selectedValuesSeguradorasGrMr[i - 1] = selectElement.value;
                console.log(`Seguradora ${i}:`, selectedValuesSeguradorasGrMr[i - 1]);
            });
        } else {
            console.log(`Elemento com data-id="${i}" não encontrado.`);
        }
    }
};

export { addSeguradoraIndividualExport };