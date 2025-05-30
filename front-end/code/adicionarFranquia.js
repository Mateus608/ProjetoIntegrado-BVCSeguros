import { customSwal } from "./alertasCustom.js";
import { seguradoraStatus } from "./adicionarSeguradora.js";
import { setupInputEventDelegation } from "./functionCliente.js";
import { seguradoraStatusGrMn } from "./GesRiscoMenPreco.js";
import { removerRS } from "./functionCliente.js";

const btnAdicionarFranquia = document.getElementById('btn-add-franquia');
const tbodyContainer = document.getElementById('tbody-frnaquias');
const iconHistory = document.querySelector('.icon-history-franquias');

const btnAdicionarFranquiaIndividual = document.getElementById('btn-add-franquia-individual');
const tbodyContainerIndividual = document.getElementById('tbody-frnaquias-individual');
const iconHistoryIndividual = document.querySelector('.icon-history-franquias-individual');

export let franquiaCounter = 0;
export const franquiasExcluidas = [];
export const franquiasExcluidasIndividual = [];

export let franquiaCounterIndividual = 0;

btnAdicionarFranquia.addEventListener('click', () => {
    franquiaCounter++;

    // Chama a função de delegação passando o container (tbodyContainer)
    setupInputEventDelegation(tbodyContainer);

    const newFranquiasTr = document.createElement('tr');
    newFranquiasTr.className = 'tr-container-franquias';
    newFranquiasTr.setAttribute('data-id', franquiaCounter);
    newFranquiasTr.innerHTML = `
        <td>
                            <select id="select-tipo-franquia">
                                <option value="Selecione" disabled selected>Selecione</option>
                                <option value="Faróis Auxiliares Convencionais">Faróis Auxiliares Convencionais</option>
                                <option value="Faróis Auxiliares Led">Faróis Auxiliares Led</option>
                                <option value="Faróis Auxiliares Xenon">Faróis Auxiliares Xenon</option>
                                <option value="Faróis Convencionais">Faróis Convencionais</option>
                                <option value="Faróis Convencionais, Milha e Neblina">Faróis Convencionais, Milha e Neblina</option>
                                <option value="Faróis Led">Faróis Led</option>
                                <option value="Faróis Xenon">Faróis Xenon</option>
                                <option value="Lanternas Auxiliares">Lanternas Auxiliares</option>
                                <option value="Lanternas Convencionais">Lanternas Convencionais</option>
                                <option value="Lanternas Led">Lanternas Led</option>
                                <option value="Para-brisa">Para-brisa</option>
                                <option value="Retrovisores">Retrovisores</option>
                                <option value="Retrovisores Convencionais">Retrovisores Convencionais</option>
                                <option value="Reparo de Lataria e Pintura/Para-choque">Reparo de Lataria e Pintura/Para-choque</option>
                                <option value="Reparo Rápido">Reparo Rápido</option>
                                <option value="SRA - Reparo em arranhões - 1a peça">SRA - Reparo em arranhões - 1a peça</option>
                                <option value="SRA - Reparo em arranhões demais peças">SRA - Reparo em arranhões demais peças</option>
                                <option value="Supermartelinho">Supermartelinho</option>
                                <option value="Traseiro (Vigia)">Traseiro (Vigia)</option>
                                <option value="Vidros Laterais">Vidros Laterais</option>
                                <option value="Vidros Para-Brisa, Teto Solar ou Panorâmico">Vidros Para-Brisa, Teto Solar ou Panorâmico</option>
                                <option value="Vidros Traseiros">Vidros Traseiros</option>
                            </select>
                        </td>
                        <td id="td-veiculo-table-franquias" class="td-table-cliente"><button id="remove-franquia" style="background-color:#8e0101;" title="Remover Franquia">- Franquia</button></td>
                        <td>
                            <input type="text" id="valor-plano-ouro-franquias" name="nome" placeholder="R$ 0,00" title="Insira o valor da franquia">
                        </td>
                        <td>
                            <input type="text" id="valor-plano-prata-franquias" name="nome" placeholder="R$ 0,00" title="Insira o valor da franquia">
                        </td>
    `;

    tbodyContainer.appendChild(newFranquiasTr);

    // Adicionando o event listener ao botão de remover
    const removeBtn = newFranquiasTr.querySelector('#remove-franquia');
    removeBtn.addEventListener('click', (e) => {
        const franquiaTr = e.target.closest('tr');  // Obtém a tr que contém o botão de remover
        const franquiaId = franquiaTr.getAttribute('data-id');
        const descricaoFranquia = franquiaTr.querySelector('#select-tipo-franquia').value.toUpperCase();
        const valorPOuro = franquiaTr.querySelector('#valor-plano-ouro-franquias').value;
        const valorPPrata = franquiaTr.querySelector("#valor-plano-prata-franquias").value;

        customSwal.fire({
            title: 'Atenção',
            text: `Você tem certeza de que deseja excluir a franquia ${descricaoFranquia}? Esta ação não pode ser desfeita.`,
            icon: 'warning',
            iconColor: '#01458e',
            showCancelButton: true,  // Mostra o botão de cancelar
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true // Inverte a ordem dos botões (Confirmar à esquerda)
        }).then((result) => {
            if (result.isConfirmed) {
                eventListenerRemoveFranquiaBtn(franquiaId); // Passando o ID do veículo

                customSwal.fire({
                    title: `Franquia excluída com sucesso!`,
                    html: `Franquia excluída: <strong>${descricaoFranquia}</strong>`,
                    icon: 'success',
                    iconColor: '#068e01'
                });

                iconHistory.style.display = 'block';

                if (seguradoraStatus[1] === 1) {
                    const planoOuroInput = franquiaTr.querySelector(`#pOuro-franquia-${franquiaTr.getAttribute('data-id')}`);
                    const planoPrataInput = franquiaTr.querySelector(`#pPrata-franquia-${franquiaTr.getAttribute('data-id')}`);

                    franquiasExcluidas.push({
                        descricaoFranquia: descricaoFranquia,
                        valorPOuro: valorPOuro,
                        valorPPrata: valorPPrata,
                        valorPOuroSegunda: planoOuroInput.value,
                        valorPPrataSegunuda: planoPrataInput.value
                    });
                } else {
                    franquiasExcluidas.push({
                        descricaoFranquia: descricaoFranquia,
                        valorPOuro: valorPOuro,
                        valorPPrata: valorPPrata
                    });
                };

            } else if (result.isDismissed) {
                return;
            }
        });
    });

    if (seguradoraStatus[1] === 1) {
        addFranquiasColumns(franquiaCounter);
    }
});

btnAdicionarFranquiaIndividual.addEventListener('click', () => {
    franquiaCounterIndividual++;

    // Chama a função de delegação passando o container (tbodyContainer)
    setupInputEventDelegation(tbodyContainerIndividual);

    const newFranquiasTr = document.createElement('tr');
    newFranquiasTr.className = 'tr-container-franquias-individual';
    newFranquiasTr.setAttribute('data-id', franquiaCounterIndividual);
    newFranquiasTr.innerHTML = `
        <td>
                            <select id="select-tipo-franquia-individual">
                                <option value="Selecione" disabled selected>Selecione</option>
                                <option value="Faróis Auxiliares Convencionais">Faróis Auxiliares Convencionais</option>
                                <option value="Faróis Auxiliares Led">Faróis Auxiliares Led</option>
                                <option value="Faróis Auxiliares Xenon">Faróis Auxiliares Xenon</option>
                                <option value="Faróis Convencionais">Faróis Convencionais</option>
                                <option value="Faróis Convencionais, Milha e Neblina">Faróis Convencionais, Milha e Neblina</option>
                                <option value="Faróis Led">Faróis Led</option>
                                <option value="Faróis Xenon">Faróis Xenon</option>
                                <option value="Lanternas Auxiliares">Lanternas Auxiliares</option>
                                <option value="Lanternas Convencionais">Lanternas Convencionais</option>
                                <option value="Lanternas Led">Lanternas Led</option>
                                <option value="Para-brisa">Para-brisa</option>
                                <option value="Retrovisores">Retrovisores</option>
                                <option value="Retrovisores Convencionais">Retrovisores Convencionais</option>
                                <option value="Reparo de Lataria e Pintura/Para-choque">Reparo de Lataria e Pintura/Para-choque</option>
                                <option value="Reparo Rápido">Reparo Rápido</option>
                                <option value="SRA - Reparo em arranhões - 1a peça">SRA - Reparo em arranhões - 1a peça</option>
                                <option value="SRA - Reparo em arranhões demais peças">SRA - Reparo em arranhões demais peças</option>
                                <option value="Supermartelinho">Supermartelinho</option>
                                <option value="Traseiro (Vigia)">Traseiro (Vigia)</option>
                                <option value="Vidros Laterais">Vidros Laterais</option>
                                <option value="Vidros Para-Brisa, Teto Solar ou Panorâmico">Vidros Para-Brisa, Teto Solar ou Panorâmico</option>
                                <option value="Vidros Traseiros">Vidros Traseiros</option>
                            </select>
                        </td>
                        <td id="td-veiculo-table-franquias" class="td-table-cliente"><button id="remove-franquia-individual" style="background-color:#8e0101;" title="Remover Franquia">- Franquia</button></td>
                        <td>
                            <input type="text" id="valor-individual-franquias" name="nome" placeholder="R$ 0,00" title="Insira o valor da franquia">
                        </td>
    `;

    tbodyContainerIndividual.appendChild(newFranquiasTr);

    // Adicionando o event listener ao botão de remover
    const removeBtn = newFranquiasTr.querySelector('#remove-franquia-individual');
    removeBtn.addEventListener('click', (e) => {
        const franquiaTr = e.target.closest('tr');  // Obtém a tr que contém o botão de remover
        const franquiaId = franquiaTr.getAttribute('data-id');
        const descricaoFranquia = franquiaTr.querySelector('#select-tipo-franquia-individual').value.toUpperCase();
        const valor = franquiaTr.querySelector('#valor-individual-franquias').value;
        const valor1 = franquiaTr.querySelectorAll('input[id^="v-individual-add-franquia1"]');
        const valor2 = franquiaTr.querySelectorAll('input[id^="v-individual-add-franquia2"]');
        const valor3 = franquiaTr.querySelectorAll('input[id^="v-individual-add-franquia3"]');

        customSwal.fire({
            title: 'Atenção',
            text: `Você tem certeza de que deseja excluir a franquia ${descricaoFranquia}? Esta ação não pode ser desfeita.`,
            icon: 'warning',
            iconColor: '#01458e',
            showCancelButton: true,  // Mostra o botão de cancelar
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true // Inverte a ordem dos botões (Confirmar à esquerda)
        }).then((result) => {
            if (result.isConfirmed) {
                eventListenerRemoveFranquiaBtnIndividual(franquiaId); // Passando o ID do veículo

                customSwal.fire({
                    title: `Franquia excluída com sucesso!`,
                    html: `Franquia excluída: <strong>${descricaoFranquia}</strong>`,
                    icon: 'success',
                    iconColor: '#068e01'
                });

                iconHistoryIndividual.style.display = 'block';

                const valor1 = franquiaTr.querySelectorAll('input[id^="v-individual-add-franquia1"]');
                const valor2 = franquiaTr.querySelectorAll('input[id^="v-individual-add-franquia2"]');
                const valor3 = franquiaTr.querySelectorAll('input[id^="v-individual-add-franquia3"]');

                // Função para extrair os valores dos inputs
                const getValuesFromNodeList = (nodeList) => {
                    return Array.from(nodeList).map(input => input.value);  // Extrai o 'value' de cada input
                };

                if (seguradoraStatusGrMn[1] === 1) {
                    franquiasExcluidasIndividual.push({
                        descricaoFranquia: descricaoFranquia,
                        valor: valor,
                        valorAdd1: getValuesFromNodeList(valor1)
                    });
                } else if (seguradoraStatusGrMn[1] === 2) {
                    franquiasExcluidasIndividual.push({
                        descricaoFranquia: descricaoFranquia,
                        valor: valor,
                        valorAdd1: getValuesFromNodeList(valor1),
                        valorAdd2: getValuesFromNodeList(valor2)
                    });
                } else if (seguradoraStatusGrMn[1] === 3) {
                    franquiasExcluidasIndividual.push({
                        descricaoFranquia: descricaoFranquia,
                        valor: valor,
                        valorAdd1: getValuesFromNodeList(valor1),
                        valorAdd2: getValuesFromNodeList(valor2),
                        valorAdd3: getValuesFromNodeList(valor3)
                    });
                }
                else {
                    franquiasExcluidasIndividual.push({
                        descricaoFranquia: descricaoFranquia,
                        valor: valor
                    });
                }

            } else if (result.isDismissed) {
                return;
            }
        });
    });
    console.log(seguradoraStatusGrMn[1])
    if (seguradoraStatusGrMn[1] === 1) {
        addCreateFranquiasColumnsIndividual(1);
    } else if (seguradoraStatusGrMn[1] === 2) {
        addCreateFranquiasColumnsIndividual(2);
        addCreateFranquiasColumnsIndividual(3);
    } else if (seguradoraStatusGrMn[1] === 3) {
        addCreateFranquiasColumnsIndividual(1);
        addCreateFranquiasColumnsIndividual(2);
        addCreateFranquiasColumnsIndividual(3);
    }
});

export function eventSeguradoraStatusFranquia(valor) {
    if (valor === 1) {
        let statusCounter = franquiaCounter + 1;
        for (let i = 0; i < statusCounter; i++) {
            addFranquiasColumns(i);
        }
    } else if (valor === 0) {
        let statusCounter = franquiaCounter + 1;
        for (let i = 0; i < statusCounter; i++) {
            removeFranquiasColumns(i);
        }
    };
};

function eventListenerRemoveFranquiaBtn(franquiaId) {
    // Remove o div do veículo
    const franquiaTr = document.querySelector(`tr[data-id="${franquiaId}"]`);
    if (franquiaTr) {
        franquiaTr.remove();
    }

    // Atualiza o contador de veículos
    franquiaCounter--;

    // Reindexa os veículos e franquias para garantir a ordem crescente dos data-id
    reindexarFraquias(tbodyContainer, '.tr-container-franquias');
};

export function eventListenerRemoveFranquiaBtnIndividual(franquiaId) {
    // Remove o div do veículo
    const franquiaTr = document.querySelector(`tr[data-id="${franquiaId}"]`);
    if (franquiaTr) {
        franquiaTr.remove();
    }

    // Atualiza o contador de veículos
    franquiaCounterIndividual--;

    // Reindexa os veículos e franquias para garantir a ordem crescente dos data-id
    reindexarFraquias(tbodyContainerIndividual, '.tr-container-franquias-individual');
};

function reindexarFraquias(container, nameClass) {
    // Reindexa as franquias em cada div associada ao veículo
    const franquias = container.querySelectorAll(nameClass);
    franquias.forEach((franquia, index) => {
        const novoId = index + 1;
        franquia.setAttribute('data-id', novoId);
    });
};

export const franquiasAdicionadas = [];
// Função para capturar as informações das franquias
function capturarInformacoesFranquiasTr() {
    // Seleciona todas as tr que contêm as informações de franquias
    const trFranquias = tbodyContainer.querySelectorAll('.tr-container-franquias');

    trFranquias.forEach(franquiaTr => {
        // Captura as informações de cada franquia
        const franquia = {
            tipoFranquia: franquiaTr.querySelector('#select-tipo-franquia').value.toUpperCase(),
            valorPlanoOuro: removerRS(franquiaTr.querySelector('#valor-plano-ouro-franquias').value),
            valorPlanoPrata: removerRS(franquiaTr.querySelector("#valor-plano-prata-franquias").value),
        };

        // Captura os valores dos novos campos criados pelo addFranquiasColumns
        const planoOuroInput = franquiaTr.querySelector(`#pOuro-franquia-${franquiaTr.getAttribute('data-id')}`);
        const planoPrataInput = franquiaTr.querySelector(`#pPrata-franquia-${franquiaTr.getAttribute('data-id')}`);

        // Verifica se os elementos existem antes de tentar acessar suas propriedades
        franquia.valorPlanoOuroExtra = planoOuroInput ? removerRS(planoOuroInput.value) : '';
        franquia.valorPlanoPrataExtra = planoPrataInput ? removerRS(planoPrataInput.value) : '';

        franquiasAdicionadas.push(franquia);
    });

    // Agora você pode fazer algo com as informações das franquias, como enviar para um servidor ou exibir no console
    console.log(franquiasAdicionadas);
}

export { capturarInformacoesFranquiasTr };

function addFranquiasColumns(id) {
    // Usar setTimeout para garantir que o DOM seja atualizado antes de buscar os elementos
    setTimeout(() => {
        const tdTableFranquias = document.querySelector(`.tr-container-franquias[data-id="${id}"]`);

        // Verifica se os elementos foram encontrados
        if (!tdTableFranquias) {
            console.log('Tabela não encontrada para o id:', id);
            return;
        }

        const newTdPlanoOuroFranquias = document.createElement('td');
        newTdPlanoOuroFranquias.innerHTML = `<input type="text" data-id="${id}" id="pOuro-franquia-${id}" placeholder="R$ 0,00" title="Insira o valor da franquia">`;
        tdTableFranquias.appendChild(newTdPlanoOuroFranquias);

        const newTdPlanoPrataFranquias = document.createElement('td');
        newTdPlanoPrataFranquias.innerHTML = `<input type="text" data-id="${id}" id="pPrata-franquia-${id}" placeholder="R$ 0,00" title="Insira o valor da franquia">`;
        tdTableFranquias.appendChild(newTdPlanoPrataFranquias);

        setupInputEventDelegation(tdTableFranquias);
    }, 0); // Usamos 0 para adiar a execução e permitir que o DOM seja atualizado
}

export function addFranquiasColumnsIndividual(id) {
    // Usar setTimeout para garantir que o DOM seja atualizado antes de buscar os elementos
    setTimeout(() => {
        // Loop para percorrer todas as linhas
        for (let i = 0; i < franquiaCounterIndividual + 1; i++) {
            const tdTableFranquias = document.querySelector(`.tr-container-franquias-individual[data-id="${i}"]`);

            // Verifica se a linha foi encontrada
            if (!tdTableFranquias) {
                console.log('Tabela não encontrada para o id:', i);
                continue;  // Se a linha não for encontrada, continua com a próxima iteração
            }

            // Criação da nova <td> com o input
            const newTdFranquias = document.createElement('td');
            newTdFranquias.innerHTML = `<input type="text" data-id="${id}" id="v-individual-add-franquia${id}" placeholder="R$ 0,00" title="Insira o valor da franquia">`;
            tdTableFranquias.appendChild(newTdFranquias);

            // Chama a função para configurar o evento de delegação do input
            setupInputEventDelegation(tdTableFranquias);
        }
    }, 0); // Usamos 0 para adiar a execução e permitir que o DOM seja atualizado
}

function addCreateFranquiasColumnsIndividual(id) {
    setTimeout(() => {
        const tdTableFranquias = document.querySelector(`.tr-container-franquias-individual[data-id="${franquiaCounterIndividual}"]`);

        // Verifica se a linha foi encontrada
        if (!tdTableFranquias) {
            console.log('Tabela não encontrada para o id:', franquiaCounterIndividual);
            return;  // Se a linha não for encontrada, continua com a próxima iteração
        }

        // Criação da nova <td> com o input
        const newTdFranquias = document.createElement('td');
        newTdFranquias.innerHTML = `<input type="text" data-id="${id}" id="v-individual-add-franquia${id}" placeholder="R$ 0,00">`;
        tdTableFranquias.appendChild(newTdFranquias);

        // Chama a função para configurar o evento de delegação do input
        setupInputEventDelegation(tdTableFranquias);
    }, 0); // Usamos 0 para adiar a execução e permitir que o DOM seja atualizado
}


function removeFranquiasColumns(id) {
    // Usar setTimeout para garantir que o DOM seja atualizado antes de buscar os elementos
    setTimeout(() => {
        const tdTableFranquias = document.querySelector(`.tr-container-franquias[data-id="${id}"]`);

        // Verifica se os elementos foram encontrados
        if (!tdTableFranquias) {
            console.log('Tabela não encontrada para o id:', id);
            return;
        }

        const tdColumnsPOuro = document.querySelectorAll(`td input[id="pOuro-franquia-${id}"]`);
        const tdColumnsPPrata = document.querySelectorAll(`td input[id="pPrata-franquia-${id}"]`);
        tdColumnsPOuro.forEach((td) => {
            td.parentElement.remove(); // Remove a célula da tabela
        });

        tdColumnsPPrata.forEach((td) => {
            td.parentElement.remove(); // Remove a célula da tabela
        });
    }, 0); // Usamos 0 para adiar a execução e permitir que o DOM seja atualizado
}

export function removeFranquiasColumnsIndividual(id) {
    setTimeout(() => {
        // Seleciona todas as linhas individuais de franquias
        const rows = document.querySelectorAll('.tr-container-franquias-individual');

        rows.forEach((row) => {
            // Busca o <input> com o id específico na linha
            const inputToRemove = row.querySelector(`td input[id="v-individual-add-franquia${id}"]`);
            if (inputToRemove) {
                // Remove o <td> que contém o input
                const td = inputToRemove.closest('td');
                if (td) {
                    td.remove();
                    console.log('Coluna removida para o id:', id);
                } else {
                    console.log('Não foi possível encontrar o elemento <td> para o input com o id:', id);
                }
            } else {
                console.log('Input não encontrado para o id:', id);
            }

            // Após a remoção, reindexa os inputs restantes nessa linha
            const extraInputs = row.querySelectorAll('td input[id^="v-individual-add-franquia"]');
            extraInputs.forEach((input, index) => {
                const newIndex = index + 1; // Reindexa começando em 1
                input.id = `v-individual-add-franquia${newIndex}`;
                input.setAttribute('data-id', newIndex);
            });
        });
    }, 0);
}
export const franquiasIndividualAdicionadas = [];
export function capturarInformacoesFranquiasIndividual() {
    // Seleciona todas as linhas individuais de franquias
    const linhasFranquiaIndividual = document.querySelectorAll('.tr-container-franquias-individual');

    linhasFranquiaIndividual.forEach(linha => {
        // Captura o tipo da franquia
        const tipoFranquiaElement = linha.querySelector('#select-tipo-franquia-individual');
        const tipoFranquia = tipoFranquiaElement ? tipoFranquiaElement.value : '';

        // Captura o input fixo (valor individual) da linha
        const valorIndividualElement = linha.querySelector('#valor-individual-franquias');
        const valorIndividual = valorIndividualElement ? valorIndividualElement.value : '';

        // Captura os inputs adicionados dinamicamente (se houver)
        const inputsDinamicos = linha.querySelectorAll('input[id^="v-individual-add-franquia"]');
        const valoresInputs = [];
        inputsDinamicos.forEach(input => {
            valoresInputs.push(input.value);
        });

        // Armazena as informações da linha
        franquiasIndividualAdicionadas.push({
            tipoFranquia,
            valorIndividual,
            valoresInputs,
        });
    });

    console.log(franquiasIndividualAdicionadas);
    return franquiasIndividualAdicionadas;
};

export function addFranquiaGr() {
    franquiaCounter++;

    // Chama a função de delegação passando o container (tbodyContainer)
    setupInputEventDelegation(tbodyContainer);

    const newFranquiasTr = document.createElement('tr');
    newFranquiasTr.className = 'tr-container-franquias';
    newFranquiasTr.setAttribute('data-id', franquiaCounter);
    newFranquiasTr.innerHTML = `
        <td>
                            <select id="select-tipo-franquia" meta-id="${franquiaCounter}">
                                <option value="Selecione" disabled selected>Selecione</option>
                                <option value="Faróis Auxiliares Convencionais">Faróis Auxiliares Convencionais</option>
                                <option value="Faróis Auxiliares Led">Faróis Auxiliares Led</option>
                                <option value="Faróis Auxiliares Xenon">Faróis Auxiliares Xenon</option>
                                <option value="Faróis Convencionais">Faróis Convencionais</option>
                                <option value="Faróis Convencionais, Milha e Neblina">Faróis Convencionais, Milha e Neblina</option>
                                <option value="Faróis Led">Faróis Led</option>
                                <option value="Faróis Xenon">Faróis Xenon</option>
                                <option value="Lanternas Auxiliares">Lanternas Auxiliares</option>
                                <option value="Lanternas Convencionais">Lanternas Convencionais</option>
                                <option value="Lanternas Led">Lanternas Led</option>
                                <option value="Para-brisa">Para-brisa</option>
                                <option value="Retrovisores">Retrovisores</option>
                                <option value="Retrovisores Convencionais">Retrovisores Convencionais</option>
                                <option value="Reparo de Lataria e Pintura/Para-choque">Reparo de Lataria e Pintura/Para-choque</option>
                                <option value="Reparo Rápido">Reparo Rápido</option>
                                <option value="SRA - Reparo em arranhões - 1a peça">SRA - Reparo em arranhões - 1a peça</option>
                                <option value="SRA - Reparo em arranhões demais peças">SRA - Reparo em arranhões demais peças</option>
                                <option value="Supermartelinho">Supermartelinho</option>
                                <option value="Traseiro (Vigia)">Traseiro (Vigia)</option>
                                <option value="Vidros Laterais">Vidros Laterais</option>
                                <option value="Vidros Para-Brisa, Teto Solar ou Panorâmico">Vidros Para-Brisa, Teto Solar ou Panorâmico</option>
                                <option value="Vidros Traseiros">Vidros Traseiros</option>
                            </select>
                        </td>
                        <td id="td-veiculo-table-franquias" class="td-table-cliente"><button id="remove-franquia" style="background-color:#8e0101;" title="Remover Franquia">- Franquia</button></td>
                        <td>
                            <input type="text" id="valor-plano-ouro-franquias" meta-id="${franquiaCounter}" name="nome" placeholder="R$ 0,00" title="Insira o valor da franquia">
                        </td>
                        <td>
                            <input type="text" id="valor-plano-prata-franquias" meta-id="${franquiaCounter}" name="nome" placeholder="R$ 0,00" title="Insira o valor da franquia">
                        </td>
    `;

    tbodyContainer.appendChild(newFranquiasTr);

    // Adicionando o event listener ao botão de remover
    const removeBtn = newFranquiasTr.querySelector('#remove-franquia');
    removeBtn.addEventListener('click', (e) => {
        const franquiaTr = e.target.closest('tr');  // Obtém a tr que contém o botão de remover
        const franquiaId = franquiaTr.getAttribute('data-id');
        const descricaoFranquia = franquiaTr.querySelector('#select-tipo-franquia').value.toUpperCase();
        const valorPOuro = franquiaTr.querySelector('#valor-plano-ouro-franquias').value;
        const valorPPrata = franquiaTr.querySelector("#valor-plano-prata-franquias").value;

        customSwal.fire({
            title: 'Atenção',
            text: `Você tem certeza de que deseja excluir a franquia ${descricaoFranquia}? Esta ação não pode ser desfeita.`,
            icon: 'warning',
            iconColor: '#01458e',
            showCancelButton: true,  // Mostra o botão de cancelar
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true // Inverte a ordem dos botões (Confirmar à esquerda)
        }).then((result) => {
            if (result.isConfirmed) {
                eventListenerRemoveFranquiaBtn(franquiaId); // Passando o ID do veículo

                customSwal.fire({
                    title: `Franquia excluída com sucesso!`,
                    html: `Franquia excluída: <strong>${descricaoFranquia}</strong>`,
                    icon: 'success',
                    iconColor: '#068e01'
                });

                iconHistory.style.display = 'block';

                if (seguradoraStatus[1] === 1) {
                    const planoOuroInput = franquiaTr.querySelector(`#pOuro-franquia-${franquiaTr.getAttribute('data-id')}`);
                    const planoPrataInput = franquiaTr.querySelector(`#pPrata-franquia-${franquiaTr.getAttribute('data-id')}`);

                    franquiasExcluidas.push({
                        descricaoFranquia: descricaoFranquia,
                        valorPOuro: valorPOuro,
                        valorPPrata: valorPPrata,
                        valorPOuroSegunda: planoOuroInput.value,
                        valorPPrataSegunuda: planoPrataInput.value
                    });
                } else {
                    franquiasExcluidas.push({
                        descricaoFranquia: descricaoFranquia,
                        valorPOuro: valorPOuro,
                        valorPPrata: valorPPrata
                    });
                };

            } else if (result.isDismissed) {
                return;
            }
        });
    });

    if (seguradoraStatus[1] === 1) {
        addFranquiasColumns(franquiaCounter);
    }
}

export function addFranquiaMn() {
    franquiaCounterIndividual++;

    // Chama a função de delegação passando o container (tbodyContainer)
    setupInputEventDelegation(tbodyContainerIndividual);

    const newFranquiasTr = document.createElement('tr');
    newFranquiasTr.className = 'tr-container-franquias-individual';
    newFranquiasTr.setAttribute('data-id', franquiaCounterIndividual);
    newFranquiasTr.innerHTML = `
        <td>
                            <select id="select-tipo-franquia-individual" meta-id="${franquiaCounterIndividual}">
                                <option value="Selecione" disabled selected>Selecione</option>
                                <option value="Faróis Auxiliares Convencionais">Faróis Auxiliares Convencionais</option>
                                <option value="Faróis Auxiliares Led">Faróis Auxiliares Led</option>
                                <option value="Faróis Auxiliares Xenon">Faróis Auxiliares Xenon</option>
                                <option value="Faróis Convencionais">Faróis Convencionais</option>
                                <option value="Faróis Convencionais, Milha e Neblina">Faróis Convencionais, Milha e Neblina</option>
                                <option value="Faróis Led">Faróis Led</option>
                                <option value="Faróis Xenon">Faróis Xenon</option>
                                <option value="Lanternas Auxiliares">Lanternas Auxiliares</option>
                                <option value="Lanternas Convencionais">Lanternas Convencionais</option>
                                <option value="Lanternas Led">Lanternas Led</option>
                                <option value="Para-brisa">Para-brisa</option>
                                <option value="Retrovisores">Retrovisores</option>
                                <option value="Retrovisores Convencionais">Retrovisores Convencionais</option>
                                <option value="Reparo de Lataria e Pintura/Para-choque">Reparo de Lataria e Pintura/Para-choque</option>
                                <option value="Reparo Rápido">Reparo Rápido</option>
                                <option value="SRA - Reparo em arranhões - 1a peça">SRA - Reparo em arranhões - 1a peça</option>
                                <option value="SRA - Reparo em arranhões demais peças">SRA - Reparo em arranhões demais peças</option>
                                <option value="Supermartelinho">Supermartelinho</option>
                                <option value="Traseiro (Vigia)">Traseiro (Vigia)</option>
                                <option value="Vidros Laterais">Vidros Laterais</option>
                                <option value="Vidros Para-Brisa, Teto Solar ou Panorâmico">Vidros Para-Brisa, Teto Solar ou Panorâmico</option>
                                <option value="Vidros Traseiros">Vidros Traseiros</option>
                            </select>
                        </td>
                        <td id="td-veiculo-table-franquias" class="td-table-cliente"><button id="remove-franquia-individual" style="background-color:#8e0101;" title="Remover Franquia">- Franquia</button></td>
                        <td>
                            <input type="text" id="valor-individual-franquias" meta-id="${franquiaCounterIndividual}" name="nome" placeholder="R$ 0,00" title="Insira o valor da franquia">
                        </td>
    `;

    tbodyContainerIndividual.appendChild(newFranquiasTr);

    // Adicionando o event listener ao botão de remover
    const removeBtn = newFranquiasTr.querySelector('#remove-franquia-individual');
    removeBtn.addEventListener('click', (e) => {
        const franquiaTr = e.target.closest('tr');  // Obtém a tr que contém o botão de remover
        const franquiaId = franquiaTr.getAttribute('data-id');
        const descricaoFranquia = franquiaTr.querySelector('#select-tipo-franquia-individual').value.toUpperCase();
        const valor = franquiaTr.querySelector('#valor-individual-franquias').value;
        const valor1 = franquiaTr.querySelectorAll('input[id^="v-individual-add-franquia1"]');
        const valor2 = franquiaTr.querySelectorAll('input[id^="v-individual-add-franquia2"]');
        const valor3 = franquiaTr.querySelectorAll('input[id^="v-individual-add-franquia3"]');

        customSwal.fire({
            title: 'Atenção',
            text: `Você tem certeza de que deseja excluir a franquia ${descricaoFranquia}? Esta ação não pode ser desfeita.`,
            icon: 'warning',
            iconColor: '#01458e',
            showCancelButton: true,  // Mostra o botão de cancelar
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true // Inverte a ordem dos botões (Confirmar à esquerda)
        }).then((result) => {
            if (result.isConfirmed) {
                eventListenerRemoveFranquiaBtnIndividual(franquiaId); // Passando o ID do veículo

                customSwal.fire({
                    title: `Franquia excluída com sucesso!`,
                    html: `Franquia excluída: <strong>${descricaoFranquia}</strong>`,
                    icon: 'success',
                    iconColor: '#068e01'
                });

                iconHistoryIndividual.style.display = 'block';

                const valor1 = franquiaTr.querySelectorAll('input[id^="v-individual-add-franquia1"]');
                const valor2 = franquiaTr.querySelectorAll('input[id^="v-individual-add-franquia2"]');
                const valor3 = franquiaTr.querySelectorAll('input[id^="v-individual-add-franquia3"]');

                // Função para extrair os valores dos inputs
                const getValuesFromNodeList = (nodeList) => {
                    return Array.from(nodeList).map(input => input.value);  // Extrai o 'value' de cada input
                };

                if (seguradoraStatusGrMn[1] === 1) {
                    franquiasExcluidasIndividual.push({
                        descricaoFranquia: descricaoFranquia,
                        valor: valor,
                        valorAdd1: getValuesFromNodeList(valor1)
                    });
                } else if (seguradoraStatusGrMn[1] === 2) {
                    franquiasExcluidasIndividual.push({
                        descricaoFranquia: descricaoFranquia,
                        valor: valor,
                        valorAdd1: getValuesFromNodeList(valor1),
                        valorAdd2: getValuesFromNodeList(valor2)
                    });
                } else if (seguradoraStatusGrMn[1] === 3) {
                    franquiasExcluidasIndividual.push({
                        descricaoFranquia: descricaoFranquia,
                        valor: valor,
                        valorAdd1: getValuesFromNodeList(valor1),
                        valorAdd2: getValuesFromNodeList(valor2),
                        valorAdd3: getValuesFromNodeList(valor3)
                    });
                }
                else {
                    franquiasExcluidasIndividual.push({
                        descricaoFranquia: descricaoFranquia,
                        valor: valor
                    });
                }

            } else if (result.isDismissed) {
                return;
            }
        });
    });
}