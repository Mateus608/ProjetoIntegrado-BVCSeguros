import { seguradoraStatus } from "./adicionarSeguradora.js";
import { customSwal } from "./alertasCustom.js";

export const btnAdicionarVeiculo = document.getElementById('btn-add-veiculo');
const containerVeiculo = document.getElementById('container-veiculo');
const containerFranquias = document.getElementById('container-franquias');
const iconHistory = document.querySelector('.icon-history-veiculo');

let veiculoCounter = 0;
export const veiculosExcluidos = [];

btnAdicionarVeiculo.addEventListener('click', () => {
    veiculoCounter++;

    const newVeiculoDiv = document.createElement('div');
    newVeiculoDiv.className = 'div-container-veiculo';
    newVeiculoDiv.setAttribute('data-id', veiculoCounter);
    newVeiculoDiv.innerHTML = `
        <div class="container-top">
            <div class="container-item-fab-mod">
                <div>
                    <label for="nome" style="color: #8e0101;">Nº Item</label>
                    <input class="input-n-item" type="text" id="id-veiculo" name="veiculo" value="${String(veiculoCounter+1).padStart(3,'0')}" placeholder="001">
                </div>
                <div>
                    <label for="nome">Fab.</label>
                    <input class="input-fab" type="text" id="ano-veiculo" name="veiculo" placeholder="YYYY">
                </div>
                <div>
                    <label for="nome">Mod.</label>
                    <input class="input-mod" type="text" id="modelo-veiculo" name="veiculo" placeholder="YYYY">
                </div>
            </div>
            <div>
                <label for="checkbox">
                    <input id="zero-km-veiculo" class="alinhamento-checkbox-radio" type="checkbox" value="0 KM"> 0 KM
                </label>
            </div>
            <div>
                <label for="nome">Descrição do Veiculo</label>
                <input class="input-veiculo" type="text" id="nome-veiculo" name="veiculo" placeholder="Insira o veiculo">
            </div>
        </div>

        <div class="container-bottom">
            <div>
                <label for="selecionar">Combustível</label>
                <select id="select-combustivel-veiculo">
                    <option value="selecione" disabled selected>Selecione</option>
                    <option value="Gasolina">Gasolina</option>
                    <option value="Álcool">Álcool</option>
                    <option value="Flex">Flex</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Elétrico">Elétrico</option>
                </select>
            </div>
            <div>
                <label for="nome">Placa</label>
                <input class="input-placa" type="text" id="placa-veiculo" name="veiculo" placeholder="XXX-XXXX">
            </div>
            <div>
                <button id="btn-remove-veiculo" style="background-color: #8e0101;" data-id="${veiculoCounter}" title="Remover veículo">Remover Item ${String(veiculoCounter+1).padStart(3,'0')}</button>
            </div>
        </div>
    `;

    containerVeiculo.appendChild(newVeiculoDiv);

    const newFranquiasDiv = document.createElement('div');
    newFranquiasDiv.className = 'div-table-franquias';
    newFranquiasDiv.setAttribute('data-id', veiculoCounter);
    newFranquiasDiv.innerHTML = `
        <table id="id-table-franquias" class="table-franquias">
                <thead>
                    <tr id="tr-th-franquias-veiculo" data-id="${veiculoCounter}">
                        <th>Tipo da Franquia</th>
                        <th>Veículo</th>
                        <th>
                            <p class="p-title-table-seguradora">-</p>Plano Ouro
                        </th>
                        <th>
                            <p class="p-title-table-seguradora">-</p>Plano Prata
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr id="tr-td-franquias-veiculo" data-id="${veiculoCounter}">
                        <td>
                            <select id="select-tipo-franquia">
                                <option value="selecione" disabled selected>Selecione</option>
                                <option value="Reduzida">Reduzida</option>
                                <option value="Obrigatória">Obrigatória</option>
                                <option value="Majorada">Majorada</option>
                                <option value="Não Contratado">Não Contratado</option>
                            </select>
                        </td>
                        <td id="td-veiculo-table-franquias" class="td-table-cliente"><strong>VEÍCULO</strong></td>
                        <td>
                            <input type="text" id="valor-plano-ouro-franquias" name="nome" placeholder="R$ 0,00">
                        </td>
                        <td>
                            <input type="text" id="valor-plano-prata-franquias" name="nome" placeholder="R$ 0,00">
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="div-btn-add-franquia" style="margin-bottom: 20px;">
                <button id="btn-add-franquia">+ Franquia</button>
            </div>
    `;

    containerFranquias.appendChild(newFranquiasDiv);

    // Adicionando o event listener ao botão de remover
    const removeBtn = newVeiculoDiv.querySelector('#btn-remove-veiculo');
    removeBtn.addEventListener('click', (e) => {
        const veiculoId = e.target.getAttribute('data-id');
        const divVeiculo = containerVeiculo.querySelector(`.div-container-veiculo[data-id="${veiculoId}"]`);
        const descricaoVeiculo = divVeiculo.querySelector('.input-veiculo').value.toUpperCase();
        const anoVeiculo = divVeiculo.querySelector('.input-fab').value;
        const placaVeiculo = divVeiculo.querySelector('.input-placa').value.toUpperCase();
        
        customSwal.fire({
            title: 'Atenção',
            text: `Você tem certeza de que deseja excluir o item ${parseInt(veiculoId, 10) + 1} esta operação? Esta ação não pode ser desfeita.`,
            icon: 'warning',
            iconColor: '#01458e',
            showCancelButton: true,  // Mostra o botão de cancelar
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true // Inverte a ordem dos botões (Confirmar à esquerda)
            }).then((result) => {
                if (result.isConfirmed) {
                    eventListenerRemoveVeiculoBtn(veiculoId); // Passando o ID do veículo
                    
                    customSwal.fire({
                        title: `Item Nº ${parseInt(veiculoId, 10) + 1} excluído com sucesso!`,
                        html: `Veículo excluído: <strong>${descricaoVeiculo} ${anoVeiculo} ${placaVeiculo}</strong>`,
                        icon: 'info',
                        iconColor: '#01458e'
                    });

                    iconHistory.style.display = 'block';

                    veiculosExcluidos.push({
                        veiculoId: parseInt(veiculoId, 10) + 1,
                        descricaoVeiculo: descricaoVeiculo,
                        anoVeiculo: anoVeiculo,
                        placaVeiculo: placaVeiculo
                    });
                                            
            } else if (result.isDismissed) {
                return;
            }
        });
    });

    if (seguradoraStatus[1] === 1) {
        addFranquiasColumns(veiculoCounter);
    }
});

export function eventSeguradoraStatusVeiculo(valor) {
    if (valor === 1) {
        let statusCounter = veiculoCounter + 1;
        for (let i=1; i < statusCounter; i++) {
            addFranquiasColumns(i);
        }
    } else if (valor === 0) {
        let statusCounter = veiculoCounter + 1;
        for (let i=1; i < statusCounter; i++) {
            removeFranquiasColumns(i);
        }
    } 
}

function eventListenerRemoveVeiculoBtn(veiculoId) {
    // Remove o div do veículo
    const veiculoDiv = document.querySelector(`div[data-id="${veiculoId}"]`);
    if (veiculoDiv) {
        veiculoDiv.remove();
    }

    // Remove o div das franquias
    const franquiasDiv = document.querySelector(`div[data-id="${veiculoId}"]`);
    if (franquiasDiv) {
        franquiasDiv.remove();
    }

    // Atualiza o contador de veículos
    veiculoCounter--;

     // Reindexa os veículos e franquias para garantir a ordem crescente dos data-id
     reindexarVeiculos();
};

function reindexarVeiculos() {
    // Reindexa os veículos
    const veiculos = containerVeiculo.querySelectorAll('.div-container-veiculo');
    veiculos.forEach((veiculo, index) => {
        const novoId = index + 1;
        veiculo.setAttribute('data-id', novoId);
        
        // Atualiza os campos e o botão de remoção
        const numeroItemInput = veiculo.querySelector('.input-n-item');
        numeroItemInput.value = String(novoId + 1).padStart(3, '0');

        const removeBtn = veiculo.querySelector('#btn-remove-veiculo');
        removeBtn.setAttribute('data-id', novoId);
        removeBtn.innerText = `Remover Item ${String(novoId + 1).padStart(3, '0')}`;
    });

    // Reindexa as franquias em cada div associada ao veículo
    const franquias = containerFranquias.querySelectorAll('.div-table-franquias');
    franquias.forEach((franquia, index) => {
        const novoId = index + 1;
        franquia.setAttribute('data-id', novoId);
    });
}

// Função para capturar as informações dos formulários inseridos dinamicamente
function capturarInformacoesVeiculos() {
    const veiculos = [];
    
    // Seleciona todos os divs que contêm as informações do veículo
    const divsVeiculos = containerVeiculo.querySelectorAll('.div-container-veiculo');
    
    divsVeiculos.forEach(veiculoDiv => {
        // Captura as informações de cada veículo
        const veiculo = {
            id: veiculoDiv.getAttribute('data-id'),
            numeroItem: veiculoDiv.querySelector('.input-n-item').value,
            anoFab: veiculoDiv.querySelector('.input-fab').value,
            anoModelo: veiculoDiv.querySelector('.input-mod').value,
            descricao: veiculoDiv.querySelector('.input-veiculo').value,
            kmZero: veiculoDiv.querySelector('#zero-km-veiculo').checked,
            combustivel: veiculoDiv.querySelector('#select-combustivel-veiculo').value,
            placa: veiculoDiv.querySelector('.input-placa').value,
        };
        
        veiculos.push(veiculo);
    });

    // Agora você pode fazer algo com as informações dos veículos, como enviar para um servidor ou exibir no console
    console.log(veiculos);
}

// Função para capturar as informações das franquias
function capturarInformacoesFranquias() {
    const franquias = [];
    
    // Seleciona todas as divs que contêm as informações de franquias
    const divsFranquias = containerFranquias.querySelectorAll('.table-franquias');
    
    divsFranquias.forEach(franquiaDiv => {
        // Captura as informações de cada franquia
        const franquia = {
            tipoFranquia: franquiaDiv.querySelector('#select-tipo-franquia').value,
            valorPlanoOuro: franquiaDiv.querySelector('#valor-plano-ouro-franquias').value,
            valorPlanoPrata: franquiaDiv.querySelector('#valor-plano-prata-franquias').value,
        };
        
        franquias.push(franquia);
    });

    // Agora você pode fazer algo com as informações das franquias, como enviar para um servidor ou exibir no console
    console.log(franquias);
}

export {capturarInformacoesFranquias}; // Captura as informações das franquias
export {capturarInformacoesVeiculos}; // Captura as informações dos veículos

function addFranquiasColumns(id) {
    // Usar setTimeout para garantir que o DOM seja atualizado antes de buscar os elementos
    setTimeout(() => {
        const tdTableFranquias = document.querySelector(`#tr-td-franquias-veiculo[data-id="${id}"]`);
        const thTableFranquias = document.querySelector(`#tr-th-franquias-veiculo[data-id="${id}"]`);

        // Verifica se os elementos foram encontrados
        if (!tdTableFranquias || !thTableFranquias) {
            console.log('Tabela não encontrada para o id:', id);
            return;
        }

        // Criando a coluna para o Plano Ouro
        const newThPlanoOuroFranquias = document.createElement('th');
        newThPlanoOuroFranquias.className = 'th-color-secundario';
        newThPlanoOuroFranquias.innerHTML = `<p class="p-title-table-seguradora2" data-id="${id}">-</p> Plano Ouro`;
        thTableFranquias.appendChild(newThPlanoOuroFranquias);

        const newTdPlanoOuroFranquias = document.createElement('td');
        newTdPlanoOuroFranquias.innerHTML = `<input type="text" data-id="${id}" id="pOuro-${id}" placeholder="R$ 0,00">`;
        tdTableFranquias.appendChild(newTdPlanoOuroFranquias);

        // Criando a coluna para o Plano Prata
        const newThPlanoPrataFranquias = document.createElement('th');
        newThPlanoPrataFranquias.className = 'th-color-secundario';
        newThPlanoPrataFranquias.innerHTML = `<p class="p-title-table-seguradora2" data-id="${id}">-</p> Plano Prata`;
        thTableFranquias.appendChild(newThPlanoPrataFranquias);

        const newTdPlanoPrataFranquias = document.createElement('td');
        newTdPlanoPrataFranquias.innerHTML = `<input type="text" data-id="${id}" id="pPrata-${id}" placeholder="R$ 0,00">`;
        tdTableFranquias.appendChild(newTdPlanoPrataFranquias);
    }, 0); // Usamos 0 para adiar a execução e permitir que o DOM seja atualizado
}

function removeFranquiasColumns(id) {
    // Usar setTimeout para garantir que o DOM seja atualizado antes de buscar os elementos
    setTimeout(() => {
        const tdTableFranquias = document.querySelector(`#tr-td-franquias-veiculo[data-id="${id}"]`);
        const thTableFranquias = document.querySelector(`#tr-th-franquias-veiculo[data-id="${id}"]`);

        // Verifica se os elementos foram encontrados
        if (!tdTableFranquias || !thTableFranquias) {
            console.log('Tabela não encontrada para o id:', id);
            return;
        }

        const thColumns = document.querySelectorAll(`.p-title-table-seguradora2[data-id="${id}"]`);
    thColumns.forEach((th) => {
        th.parentElement.remove(); // Remove a célula da tabela
    });

    const tdColumns = document.querySelectorAll(`td input[data-id="${id}"]`);
    tdColumns.forEach((td) => {
        td.parentElement.remove(); // Remove a célula da tabela
    });
    }, 0); // Usamos 0 para adiar a execução e permitir que o DOM seja atualizado
}