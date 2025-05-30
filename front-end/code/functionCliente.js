import { customSwal } from "./alertasCustom.js";
export let coberturas = [];
export let cobertura1 = [];
export let clausulas = [];
export let pagamentos = [];
function adicionarItens(tipo, nome, idItemOuro, idItemPrata) {
    var valorPlanoOuro = document.getElementById(idItemOuro).value;
    var valorPlanoPrata = document.getElementById(idItemPrata).value;
    var sucesso = false; // Variável para indicar sucesso

    if (valorPlanoOuro === '') {
        customSwal.fire({
            title: 'Dados Inválidos',
            text: 'Existem itens marcados neste orçamento com campos em branco. Caso algum valor esteja ausente, preencha com o valor 0 (zero).',
            icon: 'error',
            iconColor: '#cc0000'
        });
        setValoresAcumulados();
        return;
    } else if (valorPlanoOuro === 'selecione') {
        customSwal.fire({
            title: 'Dados Inválidos',
            html: `Existem itens marcados neste orçamento que estão como <strong>"Selecione"</strong>. Selecione o item desejado ou desmarque o item.`,
            icon: 'error',
            iconColor: '#cc0000'
        });
        setValoresAcumulados();
        return;
    };

    if (valorPlanoPrata === '') {
        customSwal.fire({
            title: 'Dados Inválidos',
            text: 'Existem itens selecionados neste orçamento com campos em branco. Caso algum valor esteja ausente, preencha com o valor 0 (zero).',
            icon: 'error',
            iconColor: '#cc0000'
        });
        setValoresAcumulados();
        return;
    } else if (valorPlanoPrata === 'selecione') {
        customSwal.fire({
            title: 'Dados Inválidos',
            html: `Existem itens marcados neste orçamento que estão como <strong>"Selecione"</strong>. Selecione o item desejado ou desmarque o item.`,
            icon: 'error',
            iconColor: '#cc0000'
        });
        setValoresAcumulados();
        return;
    };

    switch (tipo) {
        case 0:
            cobertura1.push({
                nome: nome,
                valorOuro: valorPlanoOuro,
                valorPrata: valorPlanoPrata
            });
            sucesso = true;
            break;

        case 1:
            coberturas.push({
                nome: nome,
                valorOuro: removerRS(valorPlanoOuro),
                valorPrata: removerRS(valorPlanoPrata)
            });
            sucesso = true;
            break;

        case 2:
            var valorPlanoOuroUpper = valorPlanoOuro.toUpperCase();
            var valorPlanoPrataUpper = valorPlanoPrata.toUpperCase();
            clausulas.push({
                nome: nome,
                valorOuro: valorPlanoOuroUpper,
                valorPrata: valorPlanoPrataUpper
            });
            sucesso = true;
            break;

        case 3:
            pagamentos.push({
                nome: nome,
                valorOuro: removerRS(valorPlanoOuro),
                valorPrata: removerRS(valorPlanoPrata)
            });
            sucesso = true;
            break;

        default:
            console.error('O tipo inserido na function(adicionarItens) é inválido!');
            break;
    }

    return sucesso; // Retorna true se a inserção ocorreu com sucesso
}

export let cobertura1MenorPreco = [];
export let coberturasMenorPreco = [];
export let clausulasMenorPreco = [];
export let pagamentosMenorPreco = [];
function adicionarItensMenorPreco(tipo, nome, idItem) {
    var valorIndividual = document.getElementById(idItem).value;
    var sucesso = false; // Variável para indicar sucesso

    if (valorIndividual === '') {
        customSwal.fire({
            title: 'Dados Inválidos',
            text: 'Existem itens marcados neste orçamento com campos em branco. Caso algum valor esteja ausente, preencha com o valor 0 (zero).',
            icon: 'error',
            iconColor: '#cc0000'
        });
        setValoresAcumulados();
        return;
    } else if (valorIndividual === 'selecione') {
        customSwal.fire({
            title: 'Dados Inválidos',
            html: `Existem itens marcados neste orçamento que estão como <strong>"Selecione"</strong>. Selecione o item desejado ou desmarque o item.`,
            icon: 'error',
            iconColor: '#cc0000'
        });
        setValoresAcumulados();
        return;
    };

    switch (tipo) {
        case 0:
            cobertura1MenorPreco.push({
                nome: nome,
                valor: valorIndividual
            });
            sucesso = true;
            break;

        case 1:
            coberturasMenorPreco.push({
                nome: nome,
                valor: removerRS(valorIndividual)
            });
            sucesso = true;
            break;

        case 2:
            var valorUpper = valorIndividual.toUpperCase();
            clausulasMenorPreco.push({
                nome: nome,
                valor: valorUpper
            });
            sucesso = true;
            break;

        case 3:
            pagamentosMenorPreco.push({
                nome: nome,
                valor: removerRS(valorIndividual)
            });
            sucesso = true;
            break;

        default:
            console.error('O tipo inserido na function(adicionarItensMenorPreco) é inválido!');
            break;
    }

    // Log para depuração
    console.log(`Item adicionado (Tipo: ${tipo}):`, {
        nome: nome,
        valor: valorIndividual
    });

    return sucesso; // Retorna true se a inserção ocorreu com sucesso
}

export { adicionarItensMenorPreco };

export { adicionarItens };

function isNumber(value) {
    const number = Number(value);
    const currentYear = new Date().getFullYear();
    return !isNaN(number) && number > 1900 && number <= currentYear + 1;
}

export { isNumber };

function validarPlaca(placa) {
    // Remove espaços extras e o hífen da placa
    placa = placa.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

    // Expressões regulares para os formatos de placa
    const regexAntigo = /^[A-Z]{3}\d{4}$/; // Formato antigo: 3 letras seguidas de 4 números
    const regexMercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/; // Formato Mercosul: 3 letras, 1 número, 1 letra e 2 números

    // Verifica se a placa corresponde a algum dos formatos
    if (!regexAntigo.test(placa) && !regexMercosul.test(placa)) {
        customSwal.fire({
            title: 'Dados Inválidos',
            text: 'Placa do veículo inválida.',
            icon: 'error',
            iconColor: '#cc0000'
        });
        return false;
    }

    return true;
}

export { validarPlaca };

function calcularParcelasPagamento(nParcela, valor) {
    var valorCalculado = valor / nParcela;
    return valorCalculado;
}

export { calcularParcelasPagamento };

function removerFormatacaoMonetaria(valor) {
    // Remove o símbolo 'R$' se presente
    valor = valor.replace('R$', '').trim();

    // Remove os pontos de milhar
    valor = valor.replace(/\./g, '');

    // Substitui a vírgula por ponto (para que o JS possa interpretar o número corretamente)
    valor = valor.replace(',', '.');

    // Retorna o valor como um número float
    return parseFloat(valor);
}

export { removerFormatacaoMonetaria };

function formatMoeda(value) {
    const numericValue = parseFloat(value.replace(/[^\d]/g, "")) / 100 || 0;
    return numericValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function inputEventList(input) {
    input.addEventListener('input', (event) => {
        const value = event.target.value;
        input.value = formatMoeda(value);
    });
}

export { inputEventList };

function setupInputEventDelegation(container) {
    container.addEventListener('input', (event) => {
        if (event.target.tagName === 'INPUT') {
            const input = event.target;
            const value = input.value;
            input.value = formatMoeda(value); // Aplica a formatação
        }
    });
}

export { setupInputEventDelegation };

function formatPlaca(input) {
    let valor = input.value.replace(/[^a-zA-Z0-9]/g, '');
    if (valor.length > 3) {
        valor = valor.substring(0, 3) + '-' + valor.substring(3, 7);
    }
    input.value = valor.toUpperCase();
}

export { formatPlaca };

function displayBlockNone(buttonRm, estadoRm, buttonAdd, estadoAdd) {
    buttonRm.style.display = estadoRm;
    buttonAdd.style.display = estadoAdd;
};

export { displayBlockNone };

let valorCoberturasSeguradoraSecundaria1 = [];
export const arrayCobertura1 = {
    1: valorCoberturasSeguradoraSecundaria1,
};

let valorCoberturasSeguradoraSecundaria2 = [];
let valorCoberturasSeguradoraSecundaria3 = [];
let valorCoberturasSeguradoraSecundaria4 = [];
let valorCoberturasSeguradoraSecundaria5 = [];
let valorCoberturasSeguradoraSecundaria6 = [];
export const arraysCoberturas = {
    2: valorCoberturasSeguradoraSecundaria2,
    3: valorCoberturasSeguradoraSecundaria3,
    4: valorCoberturasSeguradoraSecundaria4,
    5: valorCoberturasSeguradoraSecundaria5,
    6: valorCoberturasSeguradoraSecundaria6,
};

let valorClausulasSeguradoraSecundaria1 = [];
let valorClausulasSeguradoraSecundaria2 = [];
let valorClausulasSeguradoraSecundaria3 = [];
let valorClausulasSeguradoraSecundaria4 = [];
let valorClausulasSeguradoraSecundaria5 = [];
export const arraysClausulas = {
    1: valorClausulasSeguradoraSecundaria1,
    2: valorClausulasSeguradoraSecundaria2,
    3: valorClausulasSeguradoraSecundaria3,
    4: valorClausulasSeguradoraSecundaria4,
    5: valorClausulasSeguradoraSecundaria5,
};

let valorFranquiasSeguradoraSecundaria = [];
export const arrayFranquias = {
    1: valorFranquiasSeguradoraSecundaria,
};

export let tablePagamentoPOuro = '';
export let tablePagamentoPPrata = '';

let valorPagamentoSeguradoraSecundariaAVista = [];
let valorPagamentoSeguradoraSecundaria1 = [];
let valorPagamentoSeguradoraSecundaria2 = [];
let valorPagamentoSeguradoraSecundaria3 = [];
let valorPagamentoSeguradoraSecundaria4 = [];
let valorPagamentoSeguradoraSecundaria5 = [];
let valorPagamentoSeguradoraSecundaria6 = [];
let valorPagamentoSeguradoraSecundaria7 = [];
let valorPagamentoSeguradoraSecundaria8 = [];
let valorPagamentoSeguradoraSecundaria9 = [];
let valorPagamentoSeguradoraSecundaria10 = [];
let valorPagamentoSeguradoraSecundaria11 = [];
let valorPagamentoSeguradoraSecundaria12 = [];
export const arraysPagamento = {
    1: valorPagamentoSeguradoraSecundariaAVista,
    2: valorPagamentoSeguradoraSecundaria1,
    3: valorPagamentoSeguradoraSecundaria2,
    4: valorPagamentoSeguradoraSecundaria3,
    5: valorPagamentoSeguradoraSecundaria4,
    6: valorPagamentoSeguradoraSecundaria5,
    7: valorPagamentoSeguradoraSecundaria6,
    8: valorPagamentoSeguradoraSecundaria7,
    9: valorPagamentoSeguradoraSecundaria8,
    10: valorPagamentoSeguradoraSecundaria9,
    11: valorPagamentoSeguradoraSecundaria10,
    12: valorPagamentoSeguradoraSecundaria11,
    13: valorPagamentoSeguradoraSecundaria12,
};

export let tablePagamentoIndividual1 = '';
export let tablePagamentoIndividual2 = '';
export let tablePagamentoIndividual3 = '';

function inputSeguradoraSecundaria(input, tipo, indice) {
    input.addEventListener('change', function (event) { // Recebe o objeto 'event'
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') { // Verifica se o elemento é um input
            const inputValue = event.target.value;
            const inputId = event.target.id; // Pega o id do input

            switch (tipo) {
                case 0:
                    if (inputId.startsWith('pOuro')) {

                        arrayCobertura1[indice][0] = {
                            planoOuro: inputValue
                        };
                    } else if (inputId.startsWith('pPrata')) {

                        arrayCobertura1[indice][1] = {
                            planoPrata: inputValue
                        };
                    }
                    break;
                case 1:
                    if (inputId.startsWith('pOuro')) {

                        arraysCoberturas[indice][0] = {
                            planoOuro: removerRS(inputValue)
                        };
                    } else if (inputId.startsWith('pPrata')) {

                        arraysCoberturas[indice][1] = {
                            planoPrata: removerRS(inputValue)
                        };
                    }
                    break;
                case 2:
                    if (inputId.startsWith('pOuro')) {

                        arraysClausulas[indice][0] = {
                            planoOuro: inputValue.toUpperCase()
                        };
                    } else if (inputId.startsWith('pPrata')) {

                        arraysClausulas[indice][1] = {
                            planoPrata: inputValue.toUpperCase()
                        };
                    }
                    break;
                case 3:
                    if (inputId.startsWith('pOuro')) {

                        arrayFranquias[indice][0] = {
                            planoOuro: removerRS(inputValue)
                        };
                    } else if (inputId.startsWith('pPrata')) {

                        arrayFranquias[indice][1] = {
                            planoPrata: removerRS(inputValue)
                        };
                    }
                    break;
                case 4:
                    if (inputId.startsWith('pOuro')) {

                        arraysPagamento[indice][0] = {
                            planoOuro: removerRS(inputValue)
                        };
                    } else if (inputId.startsWith('pPrata')) {

                        arraysPagamento[indice][1] = {
                            planoPrata: removerRS(inputValue)
                        };
                    }
                    break;
                case 5:
                    if (inputId.startsWith('pOuro')) {
                        tablePagamentoPOuro = inputValue;
                    } else if (inputId.startsWith('pPrata')) {
                        tablePagamentoPPrata = inputValue;
                    }
                    break;
                case 6:
                    if (inputId.startsWith('valor-avista-individual1')) {
                        tablePagamentoIndividual1 = inputValue;
                    } else if (inputId.startsWith('valor-avista-individual2')) {
                        tablePagamentoIndividual2 = inputValue;
                    } else if (inputId.startsWith('valor-avista-individual3')) {
                        tablePagamentoIndividual3 = inputValue;
                    }
                    break;
                default:
                    console.error('Type of inputSeguradoraSecundaria not found!');
                    break;
            };
        };
    });
};

export const coberturaSecundaria1 = [];
export const coberturasSecundaria = [];
export const clausulasSecundaria = [];
export const franquiasSecundaria = [];
export const pagamentoSecundaria = [];

function formatDadosArraySeguradoraSecundaria(arrays, indice, arrayFormat) {
    // Limpa o array coberturasSecundaria antes de adicionar novos dados
    arrayFormat.length = 0;

    // Loop para acessar os arraysCoberturas de 1 a 6
    for (let i = 1; i <= indice; i++) {
        const array = arrays[i];  // Acessa o array com a chave 'i' (1, 2, ..., 6)

        // Verifica se o array está definido e tem pelo menos 2 elementos
        if (array && array.length >= 2) {
            const valorPlanoOuro = array[0].planoOuro;
            const valorPlanoPrata = array[1].planoPrata;

            // Verifica se as propriedades planoOuro e planoPrata não são vazias
            if (valorPlanoOuro && valorPlanoPrata) {
                // Verifica se os valores não são apenas strings vazias
                if (valorPlanoOuro.trim() !== "" && valorPlanoPrata.trim() !== "") {
                    // Insere o objeto formatado no array coberturasSecundaria
                    arrayFormat.push({
                        valorOuro: valorPlanoOuro,
                        valorPrata: valorPlanoPrata
                    });
                }
            } else {
                console.error(`Erro: planoOuro ou planoPrata não encontrados para o índice ${i}.`);
            }
        } else {
            console.warn(`Info: o array no índice ${i} não está corretamente formatado ou não tem pelo menos 2 elementos.`);
        }
    };

    // Exibe o resultado final
    console.log('formatado ', coberturasSecundaria);
};

function limparArraysDinamicos(array) {
    for (let key in array) {
        if (array.hasOwnProperty(key)) {
            // Limpa o conteúdo do array sem recriar
            array[key].length = 0;
        };
    };
};

function removeIndexFromArray(arrays, indice) {
    // Verifica se o índice fornecido é válido
    if (arrays[indice]) {
        // Remove o item no índice especificado
        delete arrays[indice];
    } else {
        console.log(`Índice ${indice} não encontrado.`);
    };
};

export { removeIndexFromArray };

export { limparArraysDinamicos };

export { formatDadosArraySeguradoraSecundaria };

export { inputSeguradoraSecundaria };

function setTablePagamentoPOuro(valor) {
    tablePagamentoPOuro = valor;
}

export { setTablePagamentoPOuro };

function setTablePagamentoPPrata(valor) {
    tablePagamentoPPrata = valor;
}

export { setTablePagamentoPPrata };

function setValoresAcumulados() {
    cobertura1.length = 0;
    coberturas.length = 0;
    clausulas.length = 0;
    pagamentos.length = 0;
    cobertura1MenorPreco.length = 0;
    coberturasMenorPreco.length = 0;
    clausulasMenorPreco.length = 0;
    pagamentosMenorPreco.length = 0;
};

export { setValoresAcumulados };

export function removerRS(valor) {
    return valor.replace(/^R\$\s?/, '');
}

export function validarData(data) {
    // Expressão regular para verificar o padrão dd/mm/yyyy
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(data);
}

function removeEmptyArrays(arr) {
    return arr.filter(subArray => subArray.length > 0);
};

export { removeEmptyArrays };

export const cobertura1MpFormatado1 = [];
export const cobertura1MpFormatado2 = [];
export const cobertura1MpFormatado3 = [];
function converterArrayFipeCoberturas(array) {

    array.forEach(item => {
        const valores = item.id === "1" ? cobertura1MpFormatado1 : item.id === "2" ? cobertura1MpFormatado2 : cobertura1MpFormatado3;

        if (item.fipe) valores.push({ valor: item.fipe });
    });

    console.log('valores1', cobertura1MpFormatado1);
    console.log('valores2', cobertura1MpFormatado2);
    console.log('valores3', cobertura1MpFormatado3);
};

export { converterArrayFipeCoberturas };

export const coberturasMpFormatado1 = [];
export const coberturasMpFormatado2 = [];
export const coberturasMpFormatado3 = [];
function converterArrayCoberturas(array) {
    array.forEach(item => {
        const valores = item.id === "1" ? coberturasMpFormatado1 : item.id === "2" ? coberturasMpFormatado2 : coberturasMpFormatado3;

        // Aplica a função removerRS para remover o "R$" das coberturas
        if (item[`v-individual-cobertura-danos-materiais${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-cobertura-danos-materiais${item.id}`]) });
        }
        if (item[`v-individual-cobertura-danos-corporais${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-cobertura-danos-corporais${item.id}`]) });
        }
        if (item[`v-individual-cobertura-danos-morais${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-cobertura-danos-morais${item.id}`]) });
        }
        if (item[`v-individual-app-morte${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-app-morte${item.id}`]) });
        }
        if (item[`v-individual-app-invalidez${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-app-invalidez${item.id}`]) });
        }
    });

    console.log('aaaa' + JSON.stringify(coberturasMpFormatado1, null, 2))
    console.log('aaa' + JSON.stringify(coberturasMpFormatado2, null, 2))
    console.log('aa' + JSON.stringify(coberturasMpFormatado3, null, 2))
};


export { converterArrayCoberturas };

export const clausulasMpFormatado1 = [];
export const clausulasMpFormatado2 = [];
export const clausulasMpFormatado3 = [];
function converterArrayClausulas(array) {

    array.forEach(item => {
        const valores = item.id === "1" ? clausulasMpFormatado1 : item.id === "2" ? clausulasMpFormatado2 : clausulasMpFormatado3;

        if (item[`v-individual-clausulas-assistencia24h${item.id}`]) valores.push({ valor: item[`v-individual-clausulas-assistencia24h${item.id}`] });
        if (item[`v-individual-clausulas-carro-reserva${item.id}`]) valores.push({ valor: item[`v-individual-clausulas-carro-reserva${item.id}`] });
        if (item[`v-individual-clausulas-martelinho-ouro${item.id}`]) valores.push({ valor: item[`v-individual-clausulas-martelinho-ouro${item.id}`] });
        if (item[`v-individual-clausulas-vidros-retrovisores${item.id}`]) valores.push({ valor: item[`v-individual-clausulas-vidros-retrovisores${item.id}`] });
        if (item[`v-individual-clausulas-lanternas-farois${item.id}`]) valores.push({ valor: item[`v-individual-clausulas-lanternas-farois${item.id}`] });
    });
};

export { converterArrayClausulas };

export const franquiasMpFormatado1 = [];
export const franquiasMpFormatado2 = [];
export const franquiasMpFormatado3 = [];
function converterArrayFranquias(array) {
    array.forEach(item => {
        const valores = item.id === "1" ? franquiasMpFormatado1 : item.id === "2" ? franquiasMpFormatado2 : franquiasMpFormatado3;

        // Aplica a função removerRS para remover o "R$" dos valores de franquia
        if (item[`v-individual-franquia${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-franquia${item.id}`]) });
        }
    });
};

export { converterArrayFranquias };

export const pagamentoMpFormatado1 = [];
export const pagamentoMpFormatado2 = [];
export const pagamentoMpFormatado3 = [];
function converterArrayPagamentos(array) {
    array.forEach(item => {
        const valores = item.id === "1" ? pagamentoMpFormatado1 : item.id === "2" ? pagamentoMpFormatado2 : pagamentoMpFormatado3;

        // Aplica a função removerRS para remover o "R$" dos valores de pagamento
        if (item[`v-individual-pagamento-AVista${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-pagamento-AVista${item.id}`]) });
        }
        if (item[`v-individual-pagamento-1${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-pagamento-1${item.id}`]) });
        }
        if (item[`v-individual-pagamento-2${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-pagamento-2${item.id}`]) });
        }
        if (item[`v-individual-pagamento-3${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-pagamento-3${item.id}`]) });
        }
        if (item[`v-individual-pagamento-4${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-pagamento-4${item.id}`]) });
        }
        if (item[`v-individual-pagamento-5${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-pagamento-5${item.id}`]) });
        }
        if (item[`v-individual-pagamento-6${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-pagamento-6${item.id}`]) });
        }
        if (item[`v-individual-pagamento-7${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-pagamento-7${item.id}`]) });
        }
        if (item[`v-individual-pagamento-8${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-pagamento-8${item.id}`]) });
        }
        if (item[`v-individual-pagamento-9${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-pagamento-9${item.id}`]) });
        }
        if (item[`v-individual-pagamento-10${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-pagamento-10${item.id}`]) });
        }
        if (item[`v-individual-pagamento-11${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-pagamento-11${item.id}`]) });
        }
        if (item[`v-individual-pagamento-12${item.id}`]) {
            valores.push({ valor: removerRS(item[`v-individual-pagamento-12${item.id}`]) });
        }
    });
};

export { converterArrayPagamentos };

export const nomeFranquia = [];
export const valorIndividual = [];
export const valoresInputsDemaisSeguradoras1 = [];
export const valoresInputsDemaisSeguradoras2 = [];
export const valoresInputsDemaisSeguradoras3 = [];
function formatarArrayFranquiasMP(dados) {
    dados.forEach(item => {
        nomeFranquia.push({ valor: item.tipoFranquia.toUpperCase() });
        valorIndividual.push({ valor: removerRS(item.valorIndividual) });
        if (item.valoresInputs[0]) {
            valoresInputsDemaisSeguradoras1.push({ valor: removerRS(item.valoresInputs[0]) });
        }
        
        if (item.valoresInputs[1]) {
            valoresInputsDemaisSeguradoras2.push({ valor: removerRS(item.valoresInputs[1]) });
        }
        
        if (item.valoresInputs[2]) {
            valoresInputsDemaisSeguradoras3.push({ valor: removerRS(item.valoresInputs[2]) });
        }
    });

    console.log(nomeFranquia)
    console.log(valorIndividual)
    console.log(valoresInputsDemaisSeguradoras1)
    console.log(valoresInputsDemaisSeguradoras2)
    console.log(valoresInputsDemaisSeguradoras3)

}

export { formatarArrayFranquiasMP };

// Função para verificar se pelo menos um checkbox foi marcado
export function verificarCheckboxes() {
    // Verificando coberturas
    var coberturasMarcadas = false;
    for (var i = 1; i <= 6; i++) {
        var checkboxCobertura = document.getElementById('checkbox-cobertura-' + i);
        if (checkboxCobertura.checked) {
            coberturasMarcadas = true;
            break;
        }
    }

    // Verificando cláusulas
    var clausulasMarcadas = false;
    for (var i = 1; i <= 5; i++) {
        var checkboxClausula = document.getElementById('checkbox-clausulas-' + i);
        if (checkboxClausula.checked) {
            clausulasMarcadas = true;
            break;
        }
    }

    // Verificando pagamentos
    var pagamentosMarcados = false;

    // Verifica o checkbox de pagamento à vista
    var checkboxPagamentoAVista = document.getElementById('checkbox-pagamento-avista');
    if (checkboxPagamentoAVista.checked) {
        pagamentosMarcados = true;
    }

    for (var i = 1; i <= 12; i++) {
        var checkboxPagamento = document.getElementById('checkbox-pagamento-' + i);
        if (checkboxPagamento.checked) {
            pagamentosMarcados = true;
            break;
        }
    }

    // Exibindo um alerta caso algum grupo não tenha sido marcado
    if (!coberturasMarcadas) {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Pelo menos uma cobertura deve ser selecionada.',
            icon: 'info',
            iconColor: '#01458e'
        });
        setValoresAcumulados();
        return false; // Retorna false se nenhuma cobertura foi marcada
    }

    if (!clausulasMarcadas) {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Pelo menos uma cláusula deve ser selecionada.',
            icon: 'info',
            iconColor: '#01458e'
        });
        setValoresAcumulados();
        return false; // Retorna false se nenhuma cláusula foi marcada
    }

    if (!pagamentosMarcados) {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Pelo menos uma parcela de pagamento deve ser selecionada.',
            icon: 'info',
            iconColor: '#01458e'
        });
        setValoresAcumulados();
        return false; // Retorna false se nenhum pagamento foi marcado
    }

    return true; // Retorna true se todos os grupos tiverem pelo menos um item marcado
}

export function verificarCheckboxesIndividual() {
    // Verificando coberturas
    var coberturasMarcadas = false;
    for (var i = 1; i <= 6; i++) {
        var checkboxCobertura = document.getElementById('checkbox-cobertura-' + i + '-individual');
        if (checkboxCobertura.checked) {
            coberturasMarcadas = true;
            break;
        }
    }

    // Verificando cláusulas
    var clausulasMarcadas = false;
    for (var i = 1; i <= 5; i++) {
        var checkboxClausula = document.getElementById('checkbox-clausulas-' + i + '-individual');
        if (checkboxClausula.checked) {
            clausulasMarcadas = true;
            break;
        }
    }

    // Verificando pagamentos
    var pagamentosMarcados = false;

    // Verifica o checkbox de pagamento à vista
    var checkboxPagamentoAVista = document.getElementById('checkbox-pagamento-avista-individual');
    if (checkboxPagamentoAVista.checked) {
        pagamentosMarcados = true;
    }

    for (var i = 1; i <= 12; i++) {
        var checkboxPagamento = document.getElementById('checkbox-pagamento-' + i + '-individual');
        if (checkboxPagamento.checked) {
            pagamentosMarcados = true;
            break;
        }
    }

    // Exibindo um alerta caso algum grupo não tenha sido marcado
    if (!coberturasMarcadas) {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Pelo menos uma cobertura deve ser selecionada.',
            icon: 'info',
            iconColor: '#01458e'
        });
        setValoresAcumulados();
        return false; // Retorna false se nenhuma cobertura foi marcada
    }

    if (!clausulasMarcadas) {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Pelo menos uma cláusula deve ser selecionada.',
            icon: 'info',
            iconColor: '#01458e'
        });
        setValoresAcumulados();
        return false; // Retorna false se nenhuma cláusula foi marcada
    }

    if (!pagamentosMarcados) {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Pelo menos uma parcela de pagamento deve ser selecionada.',
            icon: 'info',
            iconColor: '#01458e'
        });
        setValoresAcumulados();
        return false; // Retorna false se nenhum pagamento foi marcado
    }

    return true; // Retorna true se todos os grupos tiverem pelo menos um item marcado
}
