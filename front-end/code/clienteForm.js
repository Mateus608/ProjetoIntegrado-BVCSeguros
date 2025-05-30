import { customSwal } from "./alertasCustom.js";
import { selectedValueSeguradoraSecundaria, seguradoraStatus } from "./adicionarSeguradora.js";
import { switchCaseSelectSeguradora } from "./base64Seguradora.js";
import {
    cobertura1MenorPreco, coberturasMenorPreco, clausulasMenorPreco, pagamentosMenorPreco, cobertura1, coberturas, clausulas,
    pagamentos, adicionarItens, isNumber, validarPlaca, setValoresAcumulados, formatDadosArraySeguradoraSecundaria, arrayCobertura1,
    arraysCoberturas, arraysClausulas, arrayFranquias, arraysPagamento, coberturaSecundaria1, coberturasSecundaria, clausulasSecundaria,
    franquiasSecundaria, pagamentoSecundaria, removeIndexFromArray, adicionarItensMenorPreco, converterArrayCoberturas, converterArrayClausulas,
    converterArrayFranquias, converterArrayPagamentos, coberturasMpFormatado1, coberturasMpFormatado2, coberturasMpFormatado3, clausulasMpFormatado1,
    clausulasMpFormatado2, clausulasMpFormatado3, franquiasMpFormatado1, franquiasMpFormatado2, franquiasMpFormatado3, pagamentoMpFormatado1,
    pagamentoMpFormatado2, pagamentoMpFormatado3, converterArrayFipeCoberturas, cobertura1MpFormatado1, cobertura1MpFormatado2, cobertura1MpFormatado3,
    formatarArrayFranquiasMP, nomeFranquia, valorIndividual, valoresInputsDemaisSeguradoras1, valoresInputsDemaisSeguradoras2, valoresInputsDemaisSeguradoras3,
    removerRS, validarData, verificarCheckboxes, verificarCheckboxesIndividual, tablePagamentoPOuro, tablePagamentoPPrata
} from "./functionCliente.js";
import {
    seguradoraStatusGrMn, selectedValuesSeguradorasGrMr, capturarValoresCoberturas, capturarValoresClausulas, capturarValoresFranquias,
    capturarValoresPagamentos, arrayCoberturasGr, arrayClausulasGr, arrayFranquiasGr, arrayPagamentosGr
} from "./GesRiscoMenPreco.js";
import { capturarInformacoesFranquiasTr, capturarInformacoesFranquiasIndividual, franquiasIndividualAdicionadas, franquiaCounterIndividual, franquiasAdicionadas, franquiaCounter } from "./adicionarFranquia.js";

async function geraPDFDataForm() {

    console.log(franquiasAdicionadas)
    setValoresAcumulados();

    capturarInformacoesFranquiasTr();

    capturarInformacoesFranquiasIndividual();
    formatarArrayFranquiasMP(franquiasIndividualAdicionadas);

    capturarValoresCoberturas();
    capturarValoresClausulas();
    capturarValoresFranquias();
    capturarValoresPagamentos();

    let idOrcamento;

    try {
        const response = await fetch('http://127.0.0.1:4040/codorc');
        const data = await response.json();

        if (data.error) {
            console.error('Erro:', data.error);
            alert(data.error);
            return; // interrompe aqui
        }

        idOrcamento = data.codOrcamento;
        console.log('Código gerado:', idOrcamento);

    } catch (err) {
        console.error('Erro na requisição:', err);
        alert('Erro ao gerar código de orçamento.');
        return;
    }

    const tipoOrcamentoSelecionado = document.querySelector('input[name="tipo-orcamento"]:checked').value;
    let base64Imagem;
    let base64ImagemSecundaria;
    let base64ImagemSecundaria1;
    let base64ImagemSecundaria2;
    let base64ImagemSecundaria3;
    var selectSeguradora = document.getElementById('select-seguradora').value.toLowerCase();
    var semLogoCiaCheckbox = document.getElementById('sem-logo-cia');

    var semLogoCiaValue = false;
    if (semLogoCiaCheckbox.checked) {
        semLogoCiaValue = true;
    } else if (tipoOrcamentoSelecionado === 'Gestor') {
        if (seguradoraStatus[1] === 0) {
            if (selectSeguradora === 'selecione') {
                customSwal.fire({
                    title: 'Campo Obrigatório',
                    text: 'Por favor, selecione a Seguradora.',
                    icon: 'info',
                    iconColor: '#01458e'
                });
                setValoresAcumulados();
                return;
            } else {
                base64Imagem = switchCaseSelectSeguradora(selectSeguradora);
            }
        } else if (seguradoraStatus[1] === 1) {
            if (selectSeguradora === 'selecione' || selectedValueSeguradoraSecundaria === '') {
                customSwal.fire({
                    title: 'Campo Obrigatório',
                    text: 'Por favor, selecione a Seguradora.',
                    icon: 'info',
                    iconColor: '#01458e'
                });
                setValoresAcumulados();
                return;
            } else {
                base64Imagem = switchCaseSelectSeguradora(selectSeguradora);
                base64ImagemSecundaria = switchCaseSelectSeguradora(selectedValueSeguradoraSecundaria.toLowerCase());
            };
        };
    } else if (tipoOrcamentoSelecionado === 'Menor') {
        if (seguradoraStatusGrMn[1] === 0) {
            if (selectSeguradora === 'selecione') {
                customSwal.fire({
                    title: 'Campo Obrigatório',
                    text: 'Por favor, selecione a Seguradora.',
                    icon: 'info',
                    iconColor: '#01458e'
                });
                setValoresAcumulados();
                return;
            } else {
                base64Imagem = switchCaseSelectSeguradora(selectSeguradora);
            };
        } else if (seguradoraStatusGrMn[1] === 1) {
            if (selectSeguradora === 'selecione' || selectedValuesSeguradorasGrMr[0] === undefined) {
                customSwal.fire({
                    title: 'Campo Obrigatório',
                    text: 'Por favor, selecione a Seguradora.',
                    icon: 'info',
                    iconColor: '#01458e'
                });
                setValoresAcumulados();
                return;
            } else {
                base64Imagem = switchCaseSelectSeguradora(selectSeguradora);
                base64ImagemSecundaria1 = switchCaseSelectSeguradora(selectedValuesSeguradorasGrMr[0].toLowerCase());
            };
        } else if (seguradoraStatusGrMn[1] === 2) {
            if (selectSeguradora === 'selecione' || selectedValuesSeguradorasGrMr[0] === undefined || selectedValuesSeguradorasGrMr[1] === undefined) {
                customSwal.fire({
                    title: 'Campo Obrigatório',
                    text: 'Por favor, selecione a Seguradora.',
                    icon: 'info',
                    iconColor: '#01458e'
                });
                setValoresAcumulados();
                return;
            } else {
                base64Imagem = switchCaseSelectSeguradora(selectSeguradora);
                base64ImagemSecundaria1 = switchCaseSelectSeguradora(selectedValuesSeguradorasGrMr[0].toLowerCase());
                base64ImagemSecundaria2 = switchCaseSelectSeguradora(selectedValuesSeguradorasGrMr[1].toLowerCase());
            };
        } else if (seguradoraStatusGrMn[1] === 3) {
            if (selectSeguradora === 'selecione' || selectedValuesSeguradorasGrMr[0] === undefined || selectedValuesSeguradorasGrMr[1] === undefined || selectedValuesSeguradorasGrMr[2] === undefined) {
                customSwal.fire({
                    title: 'Campo Obrigatório',
                    text: 'Por favor, selecione a Seguradora.',
                    icon: 'info',
                    iconColor: '#01458e'
                });
                setValoresAcumulados();
                return;
            } else {
                base64Imagem = switchCaseSelectSeguradora(selectSeguradora);
                base64ImagemSecundaria1 = switchCaseSelectSeguradora(selectedValuesSeguradorasGrMr[0].toLowerCase());
                base64ImagemSecundaria2 = switchCaseSelectSeguradora(selectedValuesSeguradorasGrMr[1].toLowerCase());
                base64ImagemSecundaria3 = switchCaseSelectSeguradora(selectedValuesSeguradorasGrMr[2].toLowerCase());
            };
        };
    };

    let ciaSeguradora = selectSeguradora;
    let ciaGestorRisco = selectedValueSeguradoraSecundaria;
    let ciaMenorPreco1 = selectedValuesSeguradorasGrMr[0];
    let ciaMenorPreco2 = selectedValuesSeguradorasGrMr[1];
    let ciaMenorPreco3 = selectedValuesSeguradorasGrMr[2];

    var tipoSeguro = document.querySelector('input[name="tipo-seguro"]:checked');
    if (!tipoSeguro) {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Por favor, selecione o tipo de seguro.',
            icon: 'info',
            iconColor: '#01458e'
        });
        setValoresAcumulados();
        return;
    };

    var selectPreposto = document.getElementById('select-preposto');
    var prepostoSelecionado = selectPreposto.value.toUpperCase();

    if (prepostoSelecionado == 'SELECIONE') {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Por favor, selecione o comercial.',
            icon: 'info',
            iconColor: '#01458e'
        });
        setValoresAcumulados();
        return;
    };

    var dataAtual = document.getElementById('input-data').value;
    if (!validarData(dataAtual)) {
        customSwal.fire({
            title: 'Dados Inválidos',
            text: 'A data inserida é inválida. Formato correto: dd/mm/aaaa',
            icon: 'error',
            iconColor: '#cc0000'
        });
        setValoresAcumulados();
        return;
    }

    var nomeCliente = document.getElementById('input-nome-cliente').value.toUpperCase();

    if (!nomeCliente) {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Por favor, insira o nome do cliente.',
            icon: 'info',
            iconColor: '#01458e'
        });
        setValoresAcumulados();
        return;
    };

    var celularCliente = document.getElementById('input-celular') ? document.getElementById('input-celular').value : '';
    var tipoPessoa = document.querySelector('input[name="tipo_pessoa"]:checked') ? document.querySelector('input[name="tipo_pessoa"]:checked').value : '';

    tipoSeguro = tipoSeguro.value.toUpperCase();

    var anoVeiculo = document.getElementById('ano-veiculo').value;
    var modeloVeiculo = document.getElementById('modelo-veiculo').value;
    if (!anoVeiculo) {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Por favor, insira o ano de fabricação do veículo.',
            icon: 'info',
            iconColor: '#01458e'
        });
        setValoresAcumulados();
        return;
    } else if (!modeloVeiculo) {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Por favor, insira o ano do modelo do veículo.',
            icon: 'info',
            iconColor: '#01458e'
        });
        setValoresAcumulados();
        return;
    } else if (!isNumber(anoVeiculo)) {
        customSwal.fire({
            title: 'Dados Inválidos',
            text: 'Ano de fabricação do veículo inválido.',
            icon: 'error',
            iconColor: '#cc0000'
        });
        setValoresAcumulados();
        return;
    } else if (!isNumber(modeloVeiculo)) {
        customSwal.fire({
            title: 'Dados Inválidos',
            text: 'Ano do modelo do veículo inválido.',
            icon: 'error',
            iconColor: '#cc0000'
        });
        setValoresAcumulados();
        return;
    } else if (modeloVeiculo < anoVeiculo) {
        customSwal.fire({
            title: 'Dados Inválidos',
            text: 'O ano do modelo do veículo não pode ser inferior ao de fabricação.',
            icon: 'error',
            iconColor: '#cc0000'
        });
        setValoresAcumulados();
        return;
    };

    var zerokmVeiculoCheckbox = document.getElementById('0km-veiculo');
    var valueZeroKmCheckbox = null;
    var intZeroKmCheckbox = 0;
    if (zerokmVeiculoCheckbox.checked) {
        valueZeroKmCheckbox = zerokmVeiculoCheckbox.value;
        intZeroKmCheckbox = 1;
    };

    var nomeVeiculo = document.getElementById('nome-veiculo').value.toUpperCase();
    if (!nomeVeiculo) {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Por favor, insira a descrição do veículo.',
            icon: 'info',
            iconColor: '#01458e'
        });
        setValoresAcumulados();
        return;
    };

    var selectCombustivelVeiculo = document.getElementById('select-combustivel-veiculo');
    var combustivelSelecionado = selectCombustivelVeiculo.value.toUpperCase();
    if (combustivelSelecionado == 'SELECIONE') {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Por favor, selecione o tipo de combustível do veículo.',
            icon: 'info',
            iconColor: '#01458e'
        });
        setValoresAcumulados();
        return;
    };

    var descricaoVeiculo;
    if (valueZeroKmCheckbox == null) {
        descricaoVeiculo = `${nomeVeiculo} ${combustivelSelecionado}`;
    } else {
        descricaoVeiculo = `${nomeVeiculo} ${combustivelSelecionado} ${valueZeroKmCheckbox}`;
    };


    var placaVeiculo = document.getElementById('placa-veiculo').value.toUpperCase();
    if (!placaVeiculo) {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Por favor, insira a placa do veículo',
            icon: 'info',
            iconColor: '#01458e'
        });
        setValoresAcumulados();
        return;
    } else {
        if (!validarPlaca(placaVeiculo)) {
            setValoresAcumulados();
            return;
        };
    };


    var seguradoraRecomendada = document.querySelector('input[name="recomendado"]:checked');
    seguradoraRecomendada = seguradoraRecomendada.value.toUpperCase();

    var seguradoraIndividualRecomendada = document.querySelector('input[name="recomendado-individual"]:checked');
    seguradoraIndividualRecomendada = seguradoraIndividualRecomendada.value.toUpperCase();

    var franquiaChecked;

    if (tipoOrcamentoSelecionado === 'Gestor') {
        // Adicionar Coberturas
        var checkboxCobertura1 = document.getElementById('checkbox-cobertura-1');
        if (checkboxCobertura1.checked) {
            var sucesso = adicionarItens(0, 'COLISÃO, INCÊNCIO E ROUBO', 'valor-plano-ouro-cobertura1', 'valor-plano-prata-cobertura1');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arrayCobertura1, 1) };

        var checkboxCobertura2 = document.getElementById('checkbox-cobertura-2');
        if (checkboxCobertura2.checked) {
            var sucesso = adicionarItens(1, 'DANOS MATERIAIS', 'valor-plano-ouro-cobertura2', 'valor-plano-prata-cobertura2');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysCoberturas, 2) };

        var checkboxCobertura3 = document.getElementById('checkbox-cobertura-3');
        if (checkboxCobertura3.checked) {
            var sucesso = adicionarItens(1, 'DANOS CORPORAIS', 'valor-plano-ouro-cobertura3', 'valor-plano-prata-cobertura3');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysCoberturas, 3) };

        var checkboxCobertura4 = document.getElementById('checkbox-cobertura-4');
        if (checkboxCobertura4.checked) {
            var sucesso = adicionarItens(1, 'DANOS MORAIS', 'valor-plano-ouro-cobertura4', 'valor-plano-prata-cobertura4');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysCoberturas, 4) };

        var checkboxCobertura5 = document.getElementById('checkbox-cobertura-5');
        if (checkboxCobertura5.checked) {
            var sucesso = adicionarItens(1, 'APP - MORTE', 'valor-plano-ouro-cobertura5', 'valor-plano-prata-cobertura5');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysCoberturas, 5) };

        var checkboxCobertura6 = document.getElementById('checkbox-cobertura-6');
        if (checkboxCobertura6.checked) {
            var sucesso = adicionarItens(1, 'APP - INVALIDEZ', 'valor-plano-ouro-cobertura6', 'valor-plano-prata-cobertura6');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysCoberturas, 6) };

        // Adicionar Clausulas
        var checkboxClausulas1 = document.getElementById('checkbox-clausulas-1');
        if (checkboxClausulas1.checked) {
            var sucesso = adicionarItens(2, 'ASSISTÊNCIA 24H', 'select-clausulas-p-ouro1', 'select-clausulas-p-prata1');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysClausulas, 1) };

        var checkboxClausulas2 = document.getElementById('checkbox-clausulas-2');
        if (checkboxClausulas2.checked) {
            var sucesso = adicionarItens(2, 'CARRO RESERVA', 'select-clausulas-p-ouro2', 'select-clausulas-p-prata2');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysClausulas, 2) };

        var checkboxClausulas3 = document.getElementById('checkbox-clausulas-3');
        if (checkboxClausulas3.checked) {
            var sucesso = adicionarItens(2, 'MARTELINHO DE OURO', 'select-clausulas-p-ouro3', 'select-clausulas-p-prata3');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysClausulas, 3) };

        var checkboxClausulas4 = document.getElementById('checkbox-clausulas-4');
        if (checkboxClausulas4.checked) {
            var sucesso = adicionarItens(2, 'VIDROS E RETROVISORES', 'select-clausulas-p-ouro4', 'select-clausulas-p-prata4');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysClausulas, 4) };

        var checkboxClausulas5 = document.getElementById('checkbox-clausulas-5');
        if (checkboxClausulas5.checked) {
            var sucesso = adicionarItens(2, 'LANTERNAS E FARÓIS', 'select-clausulas-p-ouro5', 'select-clausulas-p-prata5');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysClausulas, 5) };

        // Adicionar Franquia
        var checkboxFranquiasAceito = document.getElementById('checkbox-exibir-franquias');
        var franquiaChecked = checkboxFranquiasAceito.checked;

        if (checkboxFranquiasAceito.checked) {
            var selectTipoFranquias = document.getElementById('select-tipo-franquia');
            var franquiaSelecionada = selectTipoFranquias.value.toUpperCase();
            if (franquiaSelecionada == 'SELECIONE') {
                customSwal.fire({
                    title: 'Campo Obrigatório',
                    text: 'Por favor, selecione o tipo da franquia.',
                    icon: 'info',
                    iconColor: '#01458e'
                });
                setValoresAcumulados();
                return;
            };

            var franquiaValorOuroRS = document.getElementById('valor-plano-ouro-franquias').value;
            var franquiaValorPrataRS = document.getElementById('valor-plano-prata-franquias').value;
            if (franquiaValorOuroRS === '' || franquiaValorPrataRS === '') {
                customSwal.fire({
                    title: 'Dados Inválidos',
                    text: 'Existem campos em branco na tabela de Franquias. Caso algum valor esteja ausente, preencha com o valor 0 (zero).',
                    icon: 'error',
                    iconColor: '#cc0000'
                });
                setValoresAcumulados();
                return;
            };
            var franquiaValorOuro = removerRS(franquiaValorOuroRS);
            var franquiaValorPrata = removerRS(franquiaValorPrataRS);
        };

        // Adicionar Pagamentos
        var tipoPagamento = document.querySelector('input[name="tipo-pagamento"]:checked');
        if (tipoPagamento === null) {
            customSwal.fire({
                title: 'Campo Obrigatório',
                text: 'Por favor, selecione a forma do pagamento.',
                icon: 'info',
                iconColor: '#01458e'
            });
            setValoresAcumulados();
            return;
        }
        tipoPagamento = tipoPagamento.value.toUpperCase();

        var checkboxPagamentoAVista = document.getElementById('checkbox-pagamento-avista');
        if (checkboxPagamentoAVista.checked) {
            var sucesso = adicionarItens(3, `A VISTA ${tipoPagamento}`, 'input-valor-avista-plano-ouro', 'input-valor-avista-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 1) };

        var checkboxPagamento1x = document.getElementById('checkbox-pagamento-1');
        if (checkboxPagamento1x.checked) {
            var sucesso = adicionarItens(3, `1X ${tipoPagamento}`, 'input-valor-1x-plano-ouro', 'input-valor-1x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 2) };

        var checkboxPagamento2x = document.getElementById('checkbox-pagamento-2');
        if (checkboxPagamento2x.checked) {
            var sucesso = adicionarItens(3, `2X ${tipoPagamento}`, 'input-valor-2x-plano-ouro', 'input-valor-2x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 3) };

        var checkboxPagamento3x = document.getElementById('checkbox-pagamento-3');
        if (checkboxPagamento3x.checked) {
            var sucesso = adicionarItens(3, `3X ${tipoPagamento}`, 'input-valor-3x-plano-ouro', 'input-valor-3x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 4) };

        var checkboxPagamento4x = document.getElementById('checkbox-pagamento-4');
        if (checkboxPagamento4x.checked) {
            var sucesso = adicionarItens(3, `4X ${tipoPagamento}`, 'input-valor-4x-plano-ouro', 'input-valor-4x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 5) };

        var checkboxPagamento5x = document.getElementById('checkbox-pagamento-5');
        if (checkboxPagamento5x.checked) {
            var sucesso = adicionarItens(3, `5X ${tipoPagamento}`, 'input-valor-5x-plano-ouro', 'input-valor-5x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 6) };

        var checkboxPagamento6x = document.getElementById('checkbox-pagamento-6');
        if (checkboxPagamento6x.checked) {
            var sucesso = adicionarItens(3, `6X ${tipoPagamento}`, 'input-valor-6x-plano-ouro', 'input-valor-6x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 7) };

        var checkboxPagamento7x = document.getElementById('checkbox-pagamento-7');
        if (checkboxPagamento7x.checked) {
            var sucesso = adicionarItens(3, `7X ${tipoPagamento}`, 'input-valor-7x-plano-ouro', 'input-valor-7x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 8) };

        var checkboxPagamento8x = document.getElementById('checkbox-pagamento-8');
        if (checkboxPagamento8x.checked) {
            var sucesso = adicionarItens(3, `8X ${tipoPagamento}`, 'input-valor-8x-plano-ouro', 'input-valor-8x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 9) };

        var checkboxPagamento9x = document.getElementById('checkbox-pagamento-9');
        if (checkboxPagamento9x.checked) {
            var sucesso = adicionarItens(3, `9X ${tipoPagamento}`, 'input-valor-9x-plano-ouro', 'input-valor-9x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 10) };

        var checkboxPagamento10x = document.getElementById('checkbox-pagamento-10');
        if (checkboxPagamento10x.checked) {
            var sucesso = adicionarItens(3, `10X ${tipoPagamento}`, 'input-valor-10x-plano-ouro', 'input-valor-10x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 11) };

        var checkboxPagamento11x = document.getElementById('checkbox-pagamento-11');
        if (checkboxPagamento11x.checked) {
            var sucesso = adicionarItens(3, `11X ${tipoPagamento}`, 'input-valor-11x-plano-ouro', 'input-valor-11x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 12) };

        var checkboxPagamento12x = document.getElementById('checkbox-pagamento-12');
        if (checkboxPagamento12x.checked) {
            var sucesso = adicionarItens(3, `12X ${tipoPagamento}`, 'input-valor-12x-plano-ouro', 'input-valor-12x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 13) };

        if (!verificarCheckboxes()) {
            return; // Se algum grupo não tiver um checkbox marcado, interrompe a execução
        };

        // Inserir os valores de Coberturas da segunda seguradora
        formatDadosArraySeguradoraSecundaria(arrayCobertura1, 1, coberturaSecundaria1);
        formatDadosArraySeguradoraSecundaria(arraysCoberturas, 6, coberturasSecundaria);

        // Inserir os valores de Clausulas da segunda seguradora
        formatDadosArraySeguradoraSecundaria(arraysClausulas, 5, clausulasSecundaria);

        // Inserir os valores de Franquias da segunda seguradora
        formatDadosArraySeguradoraSecundaria(arrayFranquias, 1, franquiasSecundaria);

        // Inserir os valores de Pagamentos da segunda seguradora
        formatDadosArraySeguradoraSecundaria(arraysPagamento, 13, pagamentoSecundaria);

    } else if (tipoOrcamentoSelecionado === 'Menor') {
        //Adicionar Coberturas
        var checkboxCobertura1 = document.getElementById('checkbox-cobertura-1-individual');
        if (checkboxCobertura1.checked) {
            var sucesso = adicionarItensMenorPreco(0, 'COLISÃO, INCÊNCIO E ROUBO', 'valor-individual-cobertura1');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayCoberturasGr[0]) {
                delete arrayCoberturasGr[0]["fipe"];
            };
            if (arrayCoberturasGr[1]) {
                delete arrayCoberturasGr[1]["fipe"];
            };
            if (arrayCoberturasGr[2]) {
                delete arrayCoberturasGr[2]["fipe"];
            };
        }

        var checkboxCobertura2 = document.getElementById('checkbox-cobertura-2-individual');
        if (checkboxCobertura2.checked) {
            var sucesso = adicionarItensMenorPreco(1, 'DANOS MATERIAIS', 'valor-individual-cobertura2');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayCoberturasGr[0]) {
                delete arrayCoberturasGr[0]["v-individual-cobertura-danos-materiais1"];
            };
            if (arrayCoberturasGr[1]) {
                delete arrayCoberturasGr[1]["v-individual-cobertura-danos-materiais2"];
            };
            if (arrayCoberturasGr[2]) {
                delete arrayCoberturasGr[2]["v-individual-cobertura-danos-materiais3"];
            };
        }

        var checkboxCobertura3 = document.getElementById('checkbox-cobertura-3-individual');
        if (checkboxCobertura3.checked) {
            var sucesso = adicionarItensMenorPreco(1, 'DANOS CORPORAIS', 'valor-individual-cobertura3');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayCoberturasGr[0]) {
                delete arrayCoberturasGr[0]["v-individual-cobertura-danos-corporais1"];
            };
            if (arrayCoberturasGr[1]) {
                delete arrayCoberturasGr[1]["v-individual-cobertura-danos-corporais2"];
            };
            if (arrayCoberturasGr[2]) {
                delete arrayCoberturasGr[2]["v-individual-cobertura-danos-corporais3"];
            };
        }

        var checkboxCobertura4 = document.getElementById('checkbox-cobertura-4-individual');
        if (checkboxCobertura4.checked) {
            var sucesso = adicionarItensMenorPreco(1, 'DANOS MORAIS', 'valor-individual-cobertura4');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayCoberturasGr[0]) {
                delete arrayCoberturasGr[0]["v-individual-cobertura-danos-morais1"];
            };
            if (arrayCoberturasGr[1]) {
                delete arrayCoberturasGr[1]["v-individual-cobertura-danos-morais2"];
            };
            if (arrayCoberturasGr[2]) {
                delete arrayCoberturasGr[2]["v-individual-cobertura-danos-morais3"];
            };
        }

        var checkboxCobertura5 = document.getElementById('checkbox-cobertura-5-individual');
        if (checkboxCobertura5.checked) {
            var sucesso = adicionarItensMenorPreco(1, 'APP - MORTE', 'valor-individual-cobertura5');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayCoberturasGr[0]) {
                delete arrayCoberturasGr[0]["v-individual-app-morte1"];
            };
            if (arrayCoberturasGr[1]) {
                delete arrayCoberturasGr[1]["v-individual-app-morte2"];
            };
            if (arrayCoberturasGr[2]) {
                delete arrayCoberturasGr[2]["v-individual-app-morte3"];
            };
        }

        var checkboxCobertura6 = document.getElementById('checkbox-cobertura-6-individual');
        if (checkboxCobertura6.checked) {
            var sucesso = adicionarItensMenorPreco(1, 'APP - INVALIDEZ', 'valor-individual-cobertura6');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayCoberturasGr[0]) {
                delete arrayCoberturasGr[0]["v-individual-app-invalidez1"];
            };
            if (arrayCoberturasGr[1]) {
                delete arrayCoberturasGr[1]["v-individual-app-invalidez2"];
            };
            if (arrayCoberturasGr[2]) {
                delete arrayCoberturasGr[2]["v-individual-app-invalidez3"];
            };
        }

        // Adicionar Clausulas
        var checkboxClausulas1 = document.getElementById('checkbox-clausulas-1-individual');
        if (checkboxClausulas1.checked) {
            var sucesso = adicionarItensMenorPreco(2, 'ASSISTÊNCIA 24H', 'select-clausulas-individual1');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayClausulasGr[0]) {
                delete arrayClausulasGr[0]["v-individual-clausulas-assistencia24h1"];
            };
            if (arrayClausulasGr[1]) {
                delete arrayClausulasGr[1]["v-individual-clausulas-assistencia24h2"];
            };
            if (arrayClausulasGr[2]) {
                delete arrayClausulasGr[2]["v-individual-clausulas-assistencia24h3"];
            };
        }

        var checkboxClausulas2 = document.getElementById('checkbox-clausulas-2-individual');
        if (checkboxClausulas2.checked) {
            var sucesso = adicionarItensMenorPreco(2, 'CARRO RESERVA', 'select-clausulas-individual2');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayClausulasGr[0]) {
                delete arrayClausulasGr[0]["v-individual-clausulas-carro-reserva1"];
            };
            if (arrayClausulasGr[1]) {
                delete arrayClausulasGr[1]["v-individual-clausulas-carro-reserva2"];
            };
            if (arrayClausulasGr[2]) {
                delete arrayClausulasGr[2]["v-individual-clausulas-carro-reserva3"];
            };
        }

        var checkboxClausulas3 = document.getElementById('checkbox-clausulas-3-individual');
        if (checkboxClausulas3.checked) {
            var sucesso = adicionarItensMenorPreco(2, 'MARTELINHO DE OURO', 'select-clausulas-individual3');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayClausulasGr[0]) {
                delete arrayClausulasGr[0]["v-individual-clausulas-martelinho-ouro1"];
            };
            if (arrayClausulasGr[1]) {
                delete arrayClausulasGr[1]["v-individual-clausulas-martelinho-ouro2"];
            };
            if (arrayClausulasGr[2]) {
                delete arrayClausulasGr[2]["v-individual-clausulas-martelinho-ouro3"];
            };
        }

        var checkboxClausulas4 = document.getElementById('checkbox-clausulas-4-individual');
        if (checkboxClausulas4.checked) {
            var sucesso = adicionarItensMenorPreco(2, 'VIDROS E RETROVISORES', 'select-clausulas-individual4');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayClausulasGr[0]) {
                delete arrayClausulasGr[0]["v-individual-clausulas-vidros-retrovisores1"];
            };
            if (arrayClausulasGr[1]) {
                delete arrayClausulasGr[1]["v-individual-clausulas-vidros-retrovisores2"];
            };
            if (arrayClausulasGr[2]) {
                delete arrayClausulasGr[2]["v-individual-clausulas-vidros-retrovisores3"];
            };
        }

        var checkboxClausulas5 = document.getElementById('checkbox-clausulas-5-individual');
        if (checkboxClausulas5.checked) {
            var sucesso = adicionarItensMenorPreco(2, 'LANTERNAS E FARÓIS', 'select-clausulas-individual5');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayClausulasGr[0]) {
                delete arrayClausulasGr[0]["v-individual-clausulas-lanternas-farois1"];
            };
            if (arrayClausulasGr[1]) {
                delete arrayClausulasGr[1]["v-individual-clausulas-lanternas-farois2"];
            };
            if (arrayClausulasGr[2]) {
                delete arrayClausulasGr[2]["v-individual-clausulas-lanternas-farois3"];
            };
        }

        // Adicionar Franquias
        var checkboxFranquiasIndividualAceito = document.getElementById('checkbox-exibir-franquias-individual');
        var franquiaChecked = checkboxFranquiasIndividualAceito.checked;

        if (checkboxFranquiasIndividualAceito.checked) {
            var selectTipoFranquias = document.getElementById('select-tipo-individual-franquia');
            var franquiaSelecionada = selectTipoFranquias.value.toUpperCase();
            if (franquiaSelecionada == 'SELECIONE') {
                customSwal.fire({
                    title: 'Campo Obrigatório',
                    text: 'Por favor, selecione o tipo da franquia.',
                    icon: 'info',
                    iconColor: '#01458e'
                });
                setValoresAcumulados();
                return;
            };

            var franquiaValorIndividualRS = document.getElementById('valor-individual-franquias').value;
            if (franquiaValorIndividualRS === '') {
                customSwal.fire({
                    title: 'Dados Inválidos',
                    text: 'Existem campos em branco na tabela de Franquias. Caso algum valor esteja ausente, preencha com o valor 0 (zero).',
                    icon: 'error',
                    iconColor: '#cc0000'
                });
                setValoresAcumulados();
                return;
            };
            var franquiaValorIndividual = removerRS(franquiaValorIndividualRS);
        }

        // Adicionar Pagamentos
        var tipoPagamento = document.querySelector('input[name="tipo-pagamento-individual"]:checked');
        if (tipoPagamento === null) {
            customSwal.fire({
                title: 'Campo Obrigatório',
                text: 'Por favor, selecione a forma do pagamento.',
                icon: 'info',
                iconColor: '#01458e'
            });
            setValoresAcumulados();
            return;
        }
        tipoPagamento = tipoPagamento.value.toUpperCase();

        var checkboxPagamentoAVista = document.getElementById('checkbox-pagamento-avista-individual');
        if (checkboxPagamentoAVista.checked) {
            var sucesso = adicionarItensMenorPreco(3, `A VISTA ${tipoPagamento}`, 'input-valor-avista-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-AVista1"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-AVista2"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-AVista3"];
            };
        }

        var checkboxPagamento1x = document.getElementById('checkbox-pagamento-1-individual');
        if (checkboxPagamento1x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `1X ${tipoPagamento}`, 'input-valor-1x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-11"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-12"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-13"];
            };
        }

        var checkboxPagamento2x = document.getElementById('checkbox-pagamento-2-individual');
        if (checkboxPagamento2x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `2X ${tipoPagamento}`, 'input-valor-2x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-21"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-22"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-23"];
            };
        }

        var checkboxPagamento3x = document.getElementById('checkbox-pagamento-3-individual');
        if (checkboxPagamento3x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `3X ${tipoPagamento}`, 'input-valor-3x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-31"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-32"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-33"];
            };
        }

        var checkboxPagamento4x = document.getElementById('checkbox-pagamento-4-individual');
        if (checkboxPagamento4x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `4X ${tipoPagamento}`, 'input-valor-4x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-41"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-42"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-43"];
            };
        }

        var checkboxPagamento5x = document.getElementById('checkbox-pagamento-5-individual');
        if (checkboxPagamento5x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `5X ${tipoPagamento}`, 'input-valor-5x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-51"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-52"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-53"];
            };
        }

        var checkboxPagamento6x = document.getElementById('checkbox-pagamento-6-individual');
        if (checkboxPagamento6x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `6X ${tipoPagamento}`, 'input-valor-6x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-61"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-62"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-63"];
            };
        }

        var checkboxPagamento7x = document.getElementById('checkbox-pagamento-7-individual');
        if (checkboxPagamento7x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `7X ${tipoPagamento}`, 'input-valor-7x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-71"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-72"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-73"];
            };
        }

        var checkboxPagamento8x = document.getElementById('checkbox-pagamento-8-individual');
        if (checkboxPagamento8x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `8X ${tipoPagamento}`, 'input-valor-8x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-81"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-82"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-83"];
            };
        }

        var checkboxPagamento9x = document.getElementById('checkbox-pagamento-9-individual');
        if (checkboxPagamento9x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `9X ${tipoPagamento}`, 'input-valor-9x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-91"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-92"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-93"];
            };
        }

        var checkboxPagamento10x = document.getElementById('checkbox-pagamento-10-individual');
        if (checkboxPagamento10x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `10X ${tipoPagamento}`, 'input-valor-10x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-101"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-102"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-103"];
            };
        }

        var checkboxPagamento11x = document.getElementById('checkbox-pagamento-11-individual');
        if (checkboxPagamento11x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `11X ${tipoPagamento}`, 'input-valor-11x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-111"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-112"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-113"];
            };
        }
        var checkboxPagamento12x = document.getElementById('checkbox-pagamento-12-individual');
        if (checkboxPagamento12x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `12X ${tipoPagamento}`, 'input-valor-12x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-121"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-122"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-123"];
            };
        }

        if (!verificarCheckboxesIndividual()) {
            return; // Se algum grupo não tiver um checkbox marcado, interrompe a execução
        };

        converterArrayFipeCoberturas(arrayCoberturasGr);
        converterArrayCoberturas(arrayCoberturasGr);
        converterArrayClausulas(arrayClausulasGr);
        converterArrayFranquias(arrayFranquiasGr);
        converterArrayPagamentos(arrayPagamentosGr);
    }

    // Dados enviados ao endpoint do bd
    var checkboxFranquiasGestor = document.getElementById('checkbox-exibir-franquias');
    // franquiasAdicionadas

    var premioPOuro = document.getElementById('valor-avista-plano-ouro') ? document.getElementById('valor-avista-plano-ouro').value : '';
    var premioPPrata = document.getElementById('valor-avista-plano-prata') ? document.getElementById('valor-avista-plano-prata').value : '';

    var premioIndividual = document.getElementById('valor-avista-individual') ? document.getElementById('valor-avista-individual').value : '';

    var tipoPagamentoGestor = document.querySelector('input[name="tipo-pagamento"]:checked') ? document.querySelector('input[name="tipo-pagamento"]:checked').value : '';

    var tipoPagamentoIndividual = document.querySelector('input[name="tipo-pagamento-individual"]:checked') ? document.querySelector('input[name="tipo-pagamento-individual"]:checked').value : '';

    var observacoesCheckboxAceito = document.getElementById('observacoes-checkbox-aceito');
    var obsCheckbox1 = document.getElementById('obs-checkbox-1');
    var obsCheckbox2 = document.getElementById('obs-checkbox-2'); // Corrigido o ID
    var obsCheckbox3 = document.getElementById('obs-checkbox-3'); // Corrigido o ID

    if (observacoesCheckboxAceito.checked) {
        var observacoesTextarea = document.getElementById('observacoes-textarea').value.toUpperCase();

        // Inicializa as variáveis como vazias, para evitar erros de escopo
        var obsChecked1 = '';
        var obsChecked2 = '';
        var obsChecked3 = '';

        if (obsCheckbox1.checked) {
            obsChecked1 = obsCheckbox1.value.toUpperCase();
        }
        if (obsCheckbox2.checked) {
            obsChecked2 = obsCheckbox2.value.toUpperCase();
        }
        if (obsCheckbox3.checked) {
            obsChecked3 = obsCheckbox3.value.toUpperCase();
        }
    }

    var ramoOrcamento = 'AUTOMÓVEL';

    return ({
        ramo: ramoOrcamento,
        tipoOrcamentoSelecionado: tipoOrcamentoSelecionado,
        seguradoraStatus: seguradoraStatus,
        seguradoraStatusGrMn: seguradoraStatusGrMn,
        ciaSeguradora: ciaSeguradora,
        ciaGestorRisco: ciaGestorRisco,
        ciaMenorPreco1: ciaMenorPreco1,
        ciaMenorPreco2: ciaMenorPreco2,
        ciaMenorPreco3: ciaMenorPreco3,
        semLogoCiaValue: semLogoCiaValue,
        base64Imagem: base64Imagem,
        base64ImagemSecundaria: base64ImagemSecundaria,
        base64ImagemSecundaria1: base64ImagemSecundaria1,
        base64ImagemSecundaria2: base64ImagemSecundaria2,
        base64ImagemSecundaria3: base64ImagemSecundaria3,
        prepostoSelecionado: prepostoSelecionado,
        nomeCliente: nomeCliente,
        celularCliente: celularCliente,
        tipoPessoa: tipoPessoa,
        tipoSeguro: tipoSeguro,
        dataAtual: dataAtual,
        idOrcamento: idOrcamento,
        anoVeiculo: anoVeiculo,
        modeloVeiculo: modeloVeiculo,
        intZeroKmCheckbox: intZeroKmCheckbox,
        combustivelSelecionado: combustivelSelecionado,
        nomeVeiculo: nomeVeiculo,
        descricaoVeiculo: descricaoVeiculo,
        placaVeiculo: placaVeiculo,
        seguradoraRecomendada: seguradoraRecomendada,
        seguradoraIndividualRecomendada: seguradoraIndividualRecomendada,
        cobertura1: cobertura1,
        coberturas: coberturas,
        clausulas: clausulas,
        franquiaCounter: franquiaCounter,
        franquiasAdicionadas: franquiasAdicionadas,
        franquiaChecked: franquiaChecked,
        pagamentos: pagamentos,
        cobertura1MenorPreco: cobertura1MenorPreco,
        coberturasMenorPreco: coberturasMenorPreco,
        clausulasMenorPreco: clausulasMenorPreco,
        franquiaValorIndividual: franquiaValorIndividual,
        pagamentosMenorPreco: pagamentosMenorPreco,
        franquiaSelecionada: franquiaSelecionada,
        franquiaValorOuro: franquiaValorOuro,
        franquiaValorPrata: franquiaValorPrata,
        observacoesCheckboxAceito: observacoesCheckboxAceito.checked,
        observacoesTextarea: observacoesTextarea,
        obsChecked1: obsChecked1,
        obsChecked2: obsChecked2,
        obsChecked3: obsChecked3,
        coberturaSecundaria1: coberturaSecundaria1,
        coberturasSecundaria: coberturasSecundaria,
        clausulasSecundaria: clausulasSecundaria,
        franquiasSecundaria: franquiasSecundaria,
        pagamentoSecundaria: pagamentoSecundaria,
        cobertura1MpFormatado1: cobertura1MpFormatado1,
        cobertura1MpFormatado2: cobertura1MpFormatado2,
        cobertura1MpFormatado3: cobertura1MpFormatado3,
        coberturasMpFormatado1: coberturasMpFormatado1,
        coberturasMpFormatado2: coberturasMpFormatado2,
        coberturasMpFormatado3: coberturasMpFormatado3,
        clausulasMpFormatado1: clausulasMpFormatado1,
        clausulasMpFormatado2: clausulasMpFormatado2,
        clausulasMpFormatado3: clausulasMpFormatado3,
        franquiasMpFormatado1: franquiasMpFormatado1,
        franquiasMpFormatado2: franquiasMpFormatado2,
        franquiasMpFormatado3: franquiasMpFormatado3,
        franquiaCounterIndividual: franquiaCounterIndividual,
        nomeFranquia: nomeFranquia,
        valorIndividual: valorIndividual,
        valoresInputsDemaisSeguradoras1: valoresInputsDemaisSeguradoras1,
        valoresInputsDemaisSeguradoras2: valoresInputsDemaisSeguradoras2,
        valoresInputsDemaisSeguradoras3: valoresInputsDemaisSeguradoras3,
        pagamentoMpFormatado1: pagamentoMpFormatado1,
        pagamentoMpFormatado2: pagamentoMpFormatado2,
        pagamentoMpFormatado3: pagamentoMpFormatado3,
        // Dados enviados ao endpoint do bd
        // Gestor
        checkboxFranquiasGestor: checkboxFranquiasGestor.checked,
        franquiasAdicionadas: franquiasAdicionadas,
        tipoPagamentoIndividual: tipoPagamentoIndividual,
        observacoesCheckboxAceito: observacoesCheckboxAceito.checked,
        premioPOuro: premioPOuro,
        premioPPrata: premioPPrata,
        tablePagamentoPOuro: tablePagamentoPOuro,
        tablePagamentoPPrata: tablePagamentoPPrata,
        // Individual
        tipoPagamentoGestor: tipoPagamentoGestor,
        premioIndividual: premioIndividual,
        franquiasIndividualAdicionadas: franquiasIndividualAdicionadas
    })

};

document.querySelector('.btn-pdf').addEventListener('click', async function () {
    const dados = await geraPDFDataForm();
    if (!dados) return;
    // Enviar dados para o servidor via POST
    document.getElementById('loading').style.display = 'block';

    try {
        // Envia os dados para o servidor
        const response = await fetch('http://127.0.0.1:4040/pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
            const data = await response.json(); // Se a resposta for bem-sucedida, abre o PDF
            gerarPDF(dados.idOrcamento);
            saveOrcamento(JSON.stringify(dados))
        } else {
            const errorData = await response.json();
            alert('Erro ao gerar PDF: ' + errorData.error);
        }

    } catch (error) {
        // Se ocorrer um erro na requisição
        document.getElementById('loading').style.display = 'none'; // Esconde o carregamento
        //alert('Erro ao realizar a requisição: ' + error.message);
    }
});

async function capturaDataForm() {

    console.log(franquiasAdicionadas)
    setValoresAcumulados();

    capturarInformacoesFranquiasTr();

    capturarInformacoesFranquiasIndividual();
    formatarArrayFranquiasMP(franquiasIndividualAdicionadas);

    capturarValoresCoberturas();
    capturarValoresClausulas();
    capturarValoresFranquias();
    capturarValoresPagamentos();

   

    let idOrcamento;

    try {
        const response = await fetch('/codorcbvcs');
        const data = await response.json();

        if (data.error) {
            console.error('Erro:', data.error);
            alert(data.error);
            return; // interrompe aqui
        }

        idOrcamento = data.codOrcamento;
        console.log('Código gerado:', idOrcamento);

    } catch (err) {
        console.error('Erro na requisição:', err);
        alert('Erro ao gerar código de orçamento.');
        return;
    }

    const tipoOrcamentoSelecionado = document.querySelector('input[name="tipo-orcamento"]:checked').value;
    let base64Imagem;
    let base64ImagemSecundaria;
    let base64ImagemSecundaria1;
    let base64ImagemSecundaria2;
    let base64ImagemSecundaria3;
    var selectSeguradora = document.getElementById('select-seguradora').value.toLowerCase();
    var semLogoCiaCheckbox = document.getElementById('sem-logo-cia');

    var semLogoCiaValue = false;
    if (semLogoCiaCheckbox.checked) {
        semLogoCiaValue = true;
    } else if (tipoOrcamentoSelecionado === 'Gestor') {
        if (seguradoraStatus[1] === 0) {
            
            base64Imagem = switchCaseSelectSeguradora(selectSeguradora);
            
        } else if (seguradoraStatus[1] === 1) {
           
             
                base64Imagem = switchCaseSelectSeguradora(selectSeguradora);
                base64ImagemSecundaria = switchCaseSelectSeguradora(selectedValueSeguradoraSecundaria.toLowerCase());
            
        };
    } else if (tipoOrcamentoSelecionado === 'Menor') {
        if (seguradoraStatusGrMn[1] === 0) {
            
                base64Imagem = switchCaseSelectSeguradora(selectSeguradora);
            
        } else if (seguradoraStatusGrMn[1] === 1) {
            
                base64Imagem = switchCaseSelectSeguradora(selectSeguradora);
                base64ImagemSecundaria1 = switchCaseSelectSeguradora(selectedValuesSeguradorasGrMr[0].toLowerCase());
            
        } else if (seguradoraStatusGrMn[1] === 2) {
            
                base64Imagem = switchCaseSelectSeguradora(selectSeguradora);
                base64ImagemSecundaria1 = switchCaseSelectSeguradora(selectedValuesSeguradorasGrMr[0].toLowerCase());
                base64ImagemSecundaria2 = switchCaseSelectSeguradora(selectedValuesSeguradorasGrMr[1].toLowerCase());
            
        } else if (seguradoraStatusGrMn[1] === 3) {
           
                base64Imagem = switchCaseSelectSeguradora(selectSeguradora);
                base64ImagemSecundaria1 = switchCaseSelectSeguradora(selectedValuesSeguradorasGrMr[0].toLowerCase());
                base64ImagemSecundaria2 = switchCaseSelectSeguradora(selectedValuesSeguradorasGrMr[1].toLowerCase());
                base64ImagemSecundaria3 = switchCaseSelectSeguradora(selectedValuesSeguradorasGrMr[2].toLowerCase());
            
        };
    };

    let ciaSeguradora = selectSeguradora;
    let ciaGestorRisco = selectedValueSeguradoraSecundaria;
    let ciaMenorPreco1 = selectedValuesSeguradorasGrMr[0];
    let ciaMenorPreco2 = selectedValuesSeguradorasGrMr[1];
    let ciaMenorPreco3 = selectedValuesSeguradorasGrMr[2];

    var tipoSeguro = document.querySelector('input[name="tipo-seguro"]:checked');

    var selectPreposto = document.getElementById('select-preposto');
    var prepostoSelecionado = selectPreposto.value.toUpperCase();


    var dataAtual = document.getElementById('input-data').value;
    if (!validarData(dataAtual)) {
        customSwal.fire({
            title: 'Dados Inválidos',
            text: 'A data inserida é inválida. Formato correto: dd/mm/aaaa',
            icon: 'error',
            iconColor: '#cc0000'
        });
        setValoresAcumulados();
        return;
    }

    var nomeCliente = document.getElementById('input-nome-cliente').value.toUpperCase();

    var celularCliente = document.getElementById('input-celular') ? document.getElementById('input-celular').value : '';
    var tipoPessoa = document.querySelector('input[name="tipo_pessoa"]:checked') ? document.querySelector('input[name="tipo_pessoa"]:checked').value : '';

    if (tipoSeguro) {
        tipoSeguro = tipoSeguro.value.toUpperCase();
    }

    var anoVeiculo = document.getElementById('ano-veiculo').value;
    var modeloVeiculo = document.getElementById('modelo-veiculo').value;
    
    if (anoVeiculo) {
        if (!isNumber(anoVeiculo)) {
            customSwal.fire({
                title: 'Dados Inválidos',
                text: 'Ano de fabricação do veículo inválido.',
                icon: 'error',
                iconColor: '#cc0000'
            });
            setValoresAcumulados();
            return;
        }    
    }
    
    if (modeloVeiculo) {
        if (!isNumber(modeloVeiculo)) {
            customSwal.fire({
                title: 'Dados Inválidos',
                text: 'Ano do modelo do veículo inválido.',
                icon: 'error',
                iconColor: '#cc0000'
            });
            setValoresAcumulados();
            return;
        }
    }
    if (modeloVeiculo < anoVeiculo) {
        customSwal.fire({
            title: 'Dados Inválidos',
            text: 'O ano do modelo do veículo não pode ser inferior ao de fabricação.',
            icon: 'error',
            iconColor: '#cc0000'
        });
        setValoresAcumulados();
        return;
    };

    var zerokmVeiculoCheckbox = document.getElementById('0km-veiculo');
    var valueZeroKmCheckbox = null;
    var intZeroKmCheckbox = 0;
    if (zerokmVeiculoCheckbox.checked) {
        valueZeroKmCheckbox = zerokmVeiculoCheckbox.value;
        intZeroKmCheckbox = 1;
    };

    var nomeVeiculo = document.getElementById('nome-veiculo').value.toUpperCase();

    var selectCombustivelVeiculo = document.getElementById('select-combustivel-veiculo');
    var combustivelSelecionado = selectCombustivelVeiculo.value.toUpperCase();

    var descricaoVeiculo;
    if (valueZeroKmCheckbox == null) {
        descricaoVeiculo = `${nomeVeiculo} ${combustivelSelecionado}`;
    } else {
        descricaoVeiculo = `${nomeVeiculo} ${combustivelSelecionado} ${valueZeroKmCheckbox}`;
    };


    var placaVeiculo = document.getElementById('placa-veiculo').value.toUpperCase();
    
    if (placaVeiculo) {
        if (!validarPlaca(placaVeiculo)) {
            setValoresAcumulados();
            return;  
        };
    }

    var seguradoraRecomendada = document.querySelector('input[name="recomendado"]:checked');
    seguradoraRecomendada = seguradoraRecomendada.value.toUpperCase();

    var seguradoraIndividualRecomendada = document.querySelector('input[name="recomendado-individual"]:checked');
    seguradoraIndividualRecomendada = seguradoraIndividualRecomendada.value.toUpperCase();

    var franquiaChecked;

    if (tipoOrcamentoSelecionado === 'Gestor') {
        // Adicionar Coberturas
        var checkboxCobertura1 = document.getElementById('checkbox-cobertura-1');
        if (checkboxCobertura1.checked) {
            var sucesso = adicionarItens(0, 'COLISÃO, INCÊNCIO E ROUBO', 'valor-plano-ouro-cobertura1', 'valor-plano-prata-cobertura1');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arrayCobertura1, 1) };

        var checkboxCobertura2 = document.getElementById('checkbox-cobertura-2');
        if (checkboxCobertura2.checked) {
            var sucesso = adicionarItens(1, 'DANOS MATERIAIS', 'valor-plano-ouro-cobertura2', 'valor-plano-prata-cobertura2');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysCoberturas, 2) };

        var checkboxCobertura3 = document.getElementById('checkbox-cobertura-3');
        if (checkboxCobertura3.checked) {
            var sucesso = adicionarItens(1, 'DANOS CORPORAIS', 'valor-plano-ouro-cobertura3', 'valor-plano-prata-cobertura3');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysCoberturas, 3) };

        var checkboxCobertura4 = document.getElementById('checkbox-cobertura-4');
        if (checkboxCobertura4.checked) {
            var sucesso = adicionarItens(1, 'DANOS MORAIS', 'valor-plano-ouro-cobertura4', 'valor-plano-prata-cobertura4');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysCoberturas, 4) };

        var checkboxCobertura5 = document.getElementById('checkbox-cobertura-5');
        if (checkboxCobertura5.checked) {
            var sucesso = adicionarItens(1, 'APP - MORTE', 'valor-plano-ouro-cobertura5', 'valor-plano-prata-cobertura5');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysCoberturas, 5) };

        var checkboxCobertura6 = document.getElementById('checkbox-cobertura-6');
        if (checkboxCobertura6.checked) {
            var sucesso = adicionarItens(1, 'APP - INVALIDEZ', 'valor-plano-ouro-cobertura6', 'valor-plano-prata-cobertura6');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysCoberturas, 6) };

        // Adicionar Clausulas
        var checkboxClausulas1 = document.getElementById('checkbox-clausulas-1');
        if (checkboxClausulas1.checked) {
            var sucesso = adicionarItens(2, 'ASSISTÊNCIA 24H', 'select-clausulas-p-ouro1', 'select-clausulas-p-prata1');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysClausulas, 1) };

        var checkboxClausulas2 = document.getElementById('checkbox-clausulas-2');
        if (checkboxClausulas2.checked) {
            var sucesso = adicionarItens(2, 'CARRO RESERVA', 'select-clausulas-p-ouro2', 'select-clausulas-p-prata2');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysClausulas, 2) };

        var checkboxClausulas3 = document.getElementById('checkbox-clausulas-3');
        if (checkboxClausulas3.checked) {
            var sucesso = adicionarItens(2, 'MARTELINHO DE OURO', 'select-clausulas-p-ouro3', 'select-clausulas-p-prata3');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysClausulas, 3) };

        var checkboxClausulas4 = document.getElementById('checkbox-clausulas-4');
        if (checkboxClausulas4.checked) {
            var sucesso = adicionarItens(2, 'VIDROS E RETROVISORES', 'select-clausulas-p-ouro4', 'select-clausulas-p-prata4');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysClausulas, 4) };

        var checkboxClausulas5 = document.getElementById('checkbox-clausulas-5');
        if (checkboxClausulas5.checked) {
            var sucesso = adicionarItens(2, 'LANTERNAS E FARÓIS', 'select-clausulas-p-ouro5', 'select-clausulas-p-prata5');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysClausulas, 5) };

        // Adicionar Franquia
        var checkboxFranquiasAceito = document.getElementById('checkbox-exibir-franquias');
        var franquiaChecked = checkboxFranquiasAceito.checked;

        if (checkboxFranquiasAceito.checked) {
            var selectTipoFranquias = document.getElementById('select-tipo-franquia');
            var franquiaSelecionada = selectTipoFranquias.value.toUpperCase();

            var franquiaValorOuroRS = document.getElementById('valor-plano-ouro-franquias').value;
            var franquiaValorPrataRS = document.getElementById('valor-plano-prata-franquias').value;
            var franquiaValorOuro = removerRS(franquiaValorOuroRS);
            var franquiaValorPrata = removerRS(franquiaValorPrataRS);
        };

        // Adicionar Pagamentos
        var tipoPagamento = document.querySelector('input[name="tipo-pagamento"]:checked');
        if (tipoPagamento) {
            tipoPagamento = tipoPagamento.value.toUpperCase();
        }

        var checkboxPagamentoAVista = document.getElementById('checkbox-pagamento-avista');
        if (checkboxPagamentoAVista.checked) {
            var sucesso = adicionarItens(3, `A VISTA ${tipoPagamento}`, 'input-valor-avista-plano-ouro', 'input-valor-avista-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 1) };

        var checkboxPagamento1x = document.getElementById('checkbox-pagamento-1');
        if (checkboxPagamento1x.checked) {
            var sucesso = adicionarItens(3, `1X ${tipoPagamento}`, 'input-valor-1x-plano-ouro', 'input-valor-1x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 2) };

        var checkboxPagamento2x = document.getElementById('checkbox-pagamento-2');
        if (checkboxPagamento2x.checked) {
            var sucesso = adicionarItens(3, `2X ${tipoPagamento}`, 'input-valor-2x-plano-ouro', 'input-valor-2x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 3) };

        var checkboxPagamento3x = document.getElementById('checkbox-pagamento-3');
        if (checkboxPagamento3x.checked) {
            var sucesso = adicionarItens(3, `3X ${tipoPagamento}`, 'input-valor-3x-plano-ouro', 'input-valor-3x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 4) };

        var checkboxPagamento4x = document.getElementById('checkbox-pagamento-4');
        if (checkboxPagamento4x.checked) {
            var sucesso = adicionarItens(3, `4X ${tipoPagamento}`, 'input-valor-4x-plano-ouro', 'input-valor-4x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 5) };

        var checkboxPagamento5x = document.getElementById('checkbox-pagamento-5');
        if (checkboxPagamento5x.checked) {
            var sucesso = adicionarItens(3, `5X ${tipoPagamento}`, 'input-valor-5x-plano-ouro', 'input-valor-5x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 6) };

        var checkboxPagamento6x = document.getElementById('checkbox-pagamento-6');
        if (checkboxPagamento6x.checked) {
            var sucesso = adicionarItens(3, `6X ${tipoPagamento}`, 'input-valor-6x-plano-ouro', 'input-valor-6x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 7) };

        var checkboxPagamento7x = document.getElementById('checkbox-pagamento-7');
        if (checkboxPagamento7x.checked) {
            var sucesso = adicionarItens(3, `7X ${tipoPagamento}`, 'input-valor-7x-plano-ouro', 'input-valor-7x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 8) };

        var checkboxPagamento8x = document.getElementById('checkbox-pagamento-8');
        if (checkboxPagamento8x.checked) {
            var sucesso = adicionarItens(3, `8X ${tipoPagamento}`, 'input-valor-8x-plano-ouro', 'input-valor-8x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 9) };

        var checkboxPagamento9x = document.getElementById('checkbox-pagamento-9');
        if (checkboxPagamento9x.checked) {
            var sucesso = adicionarItens(3, `9X ${tipoPagamento}`, 'input-valor-9x-plano-ouro', 'input-valor-9x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 10) };

        var checkboxPagamento10x = document.getElementById('checkbox-pagamento-10');
        if (checkboxPagamento10x.checked) {
            var sucesso = adicionarItens(3, `10X ${tipoPagamento}`, 'input-valor-10x-plano-ouro', 'input-valor-10x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 11) };

        var checkboxPagamento11x = document.getElementById('checkbox-pagamento-11');
        if (checkboxPagamento11x.checked) {
            var sucesso = adicionarItens(3, `11X ${tipoPagamento}`, 'input-valor-11x-plano-ouro', 'input-valor-11x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 12) };

        var checkboxPagamento12x = document.getElementById('checkbox-pagamento-12');
        if (checkboxPagamento12x.checked) {
            var sucesso = adicionarItens(3, `12X ${tipoPagamento}`, 'input-valor-12x-plano-ouro', 'input-valor-12x-plano-prata');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else { removeIndexFromArray(arraysPagamento, 13) };

        if (!verificarCheckboxes()) {
            return; // Se algum grupo não tiver um checkbox marcado, interrompe a execução
        };

        // Inserir os valores de Coberturas da segunda seguradora
        formatDadosArraySeguradoraSecundaria(arrayCobertura1, 1, coberturaSecundaria1);
        formatDadosArraySeguradoraSecundaria(arraysCoberturas, 6, coberturasSecundaria);

        // Inserir os valores de Clausulas da segunda seguradora
        formatDadosArraySeguradoraSecundaria(arraysClausulas, 5, clausulasSecundaria);

        // Inserir os valores de Franquias da segunda seguradora
        formatDadosArraySeguradoraSecundaria(arrayFranquias, 1, franquiasSecundaria);

        // Inserir os valores de Pagamentos da segunda seguradora
        formatDadosArraySeguradoraSecundaria(arraysPagamento, 13, pagamentoSecundaria);

    } else if (tipoOrcamentoSelecionado === 'Menor') {
        //Adicionar Coberturas
        var checkboxCobertura1 = document.getElementById('checkbox-cobertura-1-individual');
        if (checkboxCobertura1.checked) {
            var sucesso = adicionarItensMenorPreco(0, 'COLISÃO, INCÊNCIO E ROUBO', 'valor-individual-cobertura1');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayCoberturasGr[0]) {
                delete arrayCoberturasGr[0]["fipe"];
            };
            if (arrayCoberturasGr[1]) {
                delete arrayCoberturasGr[1]["fipe"];
            };
            if (arrayCoberturasGr[2]) {
                delete arrayCoberturasGr[2]["fipe"];
            };
        }

        var checkboxCobertura2 = document.getElementById('checkbox-cobertura-2-individual');
        if (checkboxCobertura2.checked) {
            var sucesso = adicionarItensMenorPreco(1, 'DANOS MATERIAIS', 'valor-individual-cobertura2');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayCoberturasGr[0]) {
                delete arrayCoberturasGr[0]["v-individual-cobertura-danos-materiais1"];
            };
            if (arrayCoberturasGr[1]) {
                delete arrayCoberturasGr[1]["v-individual-cobertura-danos-materiais2"];
            };
            if (arrayCoberturasGr[2]) {
                delete arrayCoberturasGr[2]["v-individual-cobertura-danos-materiais3"];
            };
        }

        var checkboxCobertura3 = document.getElementById('checkbox-cobertura-3-individual');
        if (checkboxCobertura3.checked) {
            var sucesso = adicionarItensMenorPreco(1, 'DANOS CORPORAIS', 'valor-individual-cobertura3');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayCoberturasGr[0]) {
                delete arrayCoberturasGr[0]["v-individual-cobertura-danos-corporais1"];
            };
            if (arrayCoberturasGr[1]) {
                delete arrayCoberturasGr[1]["v-individual-cobertura-danos-corporais2"];
            };
            if (arrayCoberturasGr[2]) {
                delete arrayCoberturasGr[2]["v-individual-cobertura-danos-corporais3"];
            };
        }

        var checkboxCobertura4 = document.getElementById('checkbox-cobertura-4-individual');
        if (checkboxCobertura4.checked) {
            var sucesso = adicionarItensMenorPreco(1, 'DANOS MORAIS', 'valor-individual-cobertura4');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayCoberturasGr[0]) {
                delete arrayCoberturasGr[0]["v-individual-cobertura-danos-morais1"];
            };
            if (arrayCoberturasGr[1]) {
                delete arrayCoberturasGr[1]["v-individual-cobertura-danos-morais2"];
            };
            if (arrayCoberturasGr[2]) {
                delete arrayCoberturasGr[2]["v-individual-cobertura-danos-morais3"];
            };
        }

        var checkboxCobertura5 = document.getElementById('checkbox-cobertura-5-individual');
        if (checkboxCobertura5.checked) {
            var sucesso = adicionarItensMenorPreco(1, 'APP - MORTE', 'valor-individual-cobertura5');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayCoberturasGr[0]) {
                delete arrayCoberturasGr[0]["v-individual-app-morte1"];
            };
            if (arrayCoberturasGr[1]) {
                delete arrayCoberturasGr[1]["v-individual-app-morte2"];
            };
            if (arrayCoberturasGr[2]) {
                delete arrayCoberturasGr[2]["v-individual-app-morte3"];
            };
        }

        var checkboxCobertura6 = document.getElementById('checkbox-cobertura-6-individual');
        if (checkboxCobertura6.checked) {
            var sucesso = adicionarItensMenorPreco(1, 'APP - INVALIDEZ', 'valor-individual-cobertura6');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayCoberturasGr[0]) {
                delete arrayCoberturasGr[0]["v-individual-app-invalidez1"];
            };
            if (arrayCoberturasGr[1]) {
                delete arrayCoberturasGr[1]["v-individual-app-invalidez2"];
            };
            if (arrayCoberturasGr[2]) {
                delete arrayCoberturasGr[2]["v-individual-app-invalidez3"];
            };
        }

        // Adicionar Clausulas
        var checkboxClausulas1 = document.getElementById('checkbox-clausulas-1-individual');
        if (checkboxClausulas1.checked) {
            var sucesso = adicionarItensMenorPreco(2, 'ASSISTÊNCIA 24H', 'select-clausulas-individual1');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayClausulasGr[0]) {
                delete arrayClausulasGr[0]["v-individual-clausulas-assistencia24h1"];
            };
            if (arrayClausulasGr[1]) {
                delete arrayClausulasGr[1]["v-individual-clausulas-assistencia24h2"];
            };
            if (arrayClausulasGr[2]) {
                delete arrayClausulasGr[2]["v-individual-clausulas-assistencia24h3"];
            };
        }

        var checkboxClausulas2 = document.getElementById('checkbox-clausulas-2-individual');
        if (checkboxClausulas2.checked) {
            var sucesso = adicionarItensMenorPreco(2, 'CARRO RESERVA', 'select-clausulas-individual2');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayClausulasGr[0]) {
                delete arrayClausulasGr[0]["v-individual-clausulas-carro-reserva1"];
            };
            if (arrayClausulasGr[1]) {
                delete arrayClausulasGr[1]["v-individual-clausulas-carro-reserva2"];
            };
            if (arrayClausulasGr[2]) {
                delete arrayClausulasGr[2]["v-individual-clausulas-carro-reserva3"];
            };
        }

        var checkboxClausulas3 = document.getElementById('checkbox-clausulas-3-individual');
        if (checkboxClausulas3.checked) {
            var sucesso = adicionarItensMenorPreco(2, 'MARTELINHO DE OURO', 'select-clausulas-individual3');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayClausulasGr[0]) {
                delete arrayClausulasGr[0]["v-individual-clausulas-martelinho-ouro1"];
            };
            if (arrayClausulasGr[1]) {
                delete arrayClausulasGr[1]["v-individual-clausulas-martelinho-ouro2"];
            };
            if (arrayClausulasGr[2]) {
                delete arrayClausulasGr[2]["v-individual-clausulas-martelinho-ouro3"];
            };
        }

        var checkboxClausulas4 = document.getElementById('checkbox-clausulas-4-individual');
        if (checkboxClausulas4.checked) {
            var sucesso = adicionarItensMenorPreco(2, 'VIDROS E RETROVISORES', 'select-clausulas-individual4');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayClausulasGr[0]) {
                delete arrayClausulasGr[0]["v-individual-clausulas-vidros-retrovisores1"];
            };
            if (arrayClausulasGr[1]) {
                delete arrayClausulasGr[1]["v-individual-clausulas-vidros-retrovisores2"];
            };
            if (arrayClausulasGr[2]) {
                delete arrayClausulasGr[2]["v-individual-clausulas-vidros-retrovisores3"];
            };
        }

        var checkboxClausulas5 = document.getElementById('checkbox-clausulas-5-individual');
        if (checkboxClausulas5.checked) {
            var sucesso = adicionarItensMenorPreco(2, 'LANTERNAS E FARÓIS', 'select-clausulas-individual5');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayClausulasGr[0]) {
                delete arrayClausulasGr[0]["v-individual-clausulas-lanternas-farois1"];
            };
            if (arrayClausulasGr[1]) {
                delete arrayClausulasGr[1]["v-individual-clausulas-lanternas-farois2"];
            };
            if (arrayClausulasGr[2]) {
                delete arrayClausulasGr[2]["v-individual-clausulas-lanternas-farois3"];
            };
        }

        // Adicionar Franquias
        var checkboxFranquiasIndividualAceito = document.getElementById('checkbox-exibir-franquias-individual');
        var franquiaChecked = checkboxFranquiasIndividualAceito.checked;

        if (checkboxFranquiasIndividualAceito.checked) {
            var selectTipoFranquias = document.getElementById('select-tipo-individual-franquia');
            var franquiaSelecionada = selectTipoFranquias.value.toUpperCase();

            var franquiaValorIndividualRS = document.getElementById('valor-individual-franquias').value;
            var franquiaValorIndividual = removerRS(franquiaValorIndividualRS);
        }

        // Adicionar Pagamentos
        var tipoPagamento = document.querySelector('input[name="tipo-pagamento-individual"]:checked');
        tipoPagamento = tipoPagamento.value.toUpperCase();

        var checkboxPagamentoAVista = document.getElementById('checkbox-pagamento-avista-individual');
        if (checkboxPagamentoAVista.checked) {
            var sucesso = adicionarItensMenorPreco(3, `A VISTA ${tipoPagamento}`, 'input-valor-avista-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-AVista1"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-AVista2"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-AVista3"];
            };
        }

        var checkboxPagamento1x = document.getElementById('checkbox-pagamento-1-individual');
        if (checkboxPagamento1x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `1X ${tipoPagamento}`, 'input-valor-1x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-11"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-12"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-13"];
            };
        }

        var checkboxPagamento2x = document.getElementById('checkbox-pagamento-2-individual');
        if (checkboxPagamento2x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `2X ${tipoPagamento}`, 'input-valor-2x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-21"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-22"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-23"];
            };
        }

        var checkboxPagamento3x = document.getElementById('checkbox-pagamento-3-individual');
        if (checkboxPagamento3x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `3X ${tipoPagamento}`, 'input-valor-3x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-31"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-32"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-33"];
            };
        }

        var checkboxPagamento4x = document.getElementById('checkbox-pagamento-4-individual');
        if (checkboxPagamento4x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `4X ${tipoPagamento}`, 'input-valor-4x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-41"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-42"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-43"];
            };
        }

        var checkboxPagamento5x = document.getElementById('checkbox-pagamento-5-individual');
        if (checkboxPagamento5x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `5X ${tipoPagamento}`, 'input-valor-5x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-51"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-52"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-53"];
            };
        }

        var checkboxPagamento6x = document.getElementById('checkbox-pagamento-6-individual');
        if (checkboxPagamento6x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `6X ${tipoPagamento}`, 'input-valor-6x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-61"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-62"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-63"];
            };
        }

        var checkboxPagamento7x = document.getElementById('checkbox-pagamento-7-individual');
        if (checkboxPagamento7x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `7X ${tipoPagamento}`, 'input-valor-7x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-71"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-72"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-73"];
            };
        }

        var checkboxPagamento8x = document.getElementById('checkbox-pagamento-8-individual');
        if (checkboxPagamento8x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `8X ${tipoPagamento}`, 'input-valor-8x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-81"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-82"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-83"];
            };
        }

        var checkboxPagamento9x = document.getElementById('checkbox-pagamento-9-individual');
        if (checkboxPagamento9x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `9X ${tipoPagamento}`, 'input-valor-9x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-91"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-92"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-93"];
            };
        }

        var checkboxPagamento10x = document.getElementById('checkbox-pagamento-10-individual');
        if (checkboxPagamento10x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `10X ${tipoPagamento}`, 'input-valor-10x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-101"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-102"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-103"];
            };
        }

        var checkboxPagamento11x = document.getElementById('checkbox-pagamento-11-individual');
        if (checkboxPagamento11x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `11X ${tipoPagamento}`, 'input-valor-11x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-111"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-112"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-113"];
            };
        }
        var checkboxPagamento12x = document.getElementById('checkbox-pagamento-12-individual');
        if (checkboxPagamento12x.checked) {
            var sucesso = adicionarItensMenorPreco(3, `12X ${tipoPagamento}`, 'input-valor-12x-individual');
            if (!sucesso) {
                setValoresAcumulados();
                return;
            };
        } else {
            if (arrayPagamentosGr[0]) {
                delete arrayPagamentosGr[0]["v-individual-pagamento-121"];
            };
            if (arrayPagamentosGr[1]) {
                delete arrayPagamentosGr[1]["v-individual-pagamento-122"];
            };
            if (arrayPagamentosGr[2]) {
                delete arrayPagamentosGr[2]["v-individual-pagamento-123"];
            };
        }

        if (!verificarCheckboxesIndividual()) {
            return; // Se algum grupo não tiver um checkbox marcado, interrompe a execução
        };

        converterArrayFipeCoberturas(arrayCoberturasGr);
        converterArrayCoberturas(arrayCoberturasGr);
        converterArrayClausulas(arrayClausulasGr);
        converterArrayFranquias(arrayFranquiasGr);
        converterArrayPagamentos(arrayPagamentosGr);
    }

    // Dados enviados ao endpoint do bd
    var checkboxFranquiasGestor = document.getElementById('checkbox-exibir-franquias');
    // franquiasAdicionadas

    var premioPOuro = document.getElementById('valor-avista-plano-ouro') ? document.getElementById('valor-avista-plano-ouro').value : '';
    var premioPPrata = document.getElementById('valor-avista-plano-prata') ? document.getElementById('valor-avista-plano-prata').value : '';

    var premioIndividual = document.getElementById('valor-avista-individual') ? document.getElementById('valor-avista-individual').value : '';

    var tipoPagamentoGestor = document.querySelector('input[name="tipo-pagamento"]:checked') ? document.querySelector('input[name="tipo-pagamento"]:checked').value : '';

    var tipoPagamentoIndividual = document.querySelector('input[name="tipo-pagamento-individual"]:checked') ? document.querySelector('input[name="tipo-pagamento-individual"]:checked').value : '';

    var observacoesCheckboxAceito = document.getElementById('observacoes-checkbox-aceito');
    var obsCheckbox1 = document.getElementById('obs-checkbox-1');
    var obsCheckbox2 = document.getElementById('obs-checkbox-2'); // Corrigido o ID
    var obsCheckbox3 = document.getElementById('obs-checkbox-3'); // Corrigido o ID

    if (observacoesCheckboxAceito.checked) {
        var observacoesTextarea = document.getElementById('observacoes-textarea').value.toUpperCase();

        // Inicializa as variáveis como vazias, para evitar erros de escopo
        var obsChecked1 = '';
        var obsChecked2 = '';
        var obsChecked3 = '';

        if (obsCheckbox1.checked) {
            obsChecked1 = obsCheckbox1.value.toUpperCase();
        }
        if (obsCheckbox2.checked) {
            obsChecked2 = obsCheckbox2.value.toUpperCase();
        }
        if (obsCheckbox3.checked) {
            obsChecked3 = obsCheckbox3.value.toUpperCase();
        }
    }

    var ramoOrcamento = 'AUTOMÓVEL';

    return ({
        ramo: ramoOrcamento,
        tipoOrcamentoSelecionado: tipoOrcamentoSelecionado,
        seguradoraStatus: seguradoraStatus,
        seguradoraStatusGrMn: seguradoraStatusGrMn,
        ciaSeguradora: ciaSeguradora,
        ciaGestorRisco: ciaGestorRisco,
        ciaMenorPreco1: ciaMenorPreco1,
        ciaMenorPreco2: ciaMenorPreco2,
        ciaMenorPreco3: ciaMenorPreco3,
        semLogoCiaValue: semLogoCiaValue,
        base64Imagem: base64Imagem,
        base64ImagemSecundaria: base64ImagemSecundaria,
        base64ImagemSecundaria1: base64ImagemSecundaria1,
        base64ImagemSecundaria2: base64ImagemSecundaria2,
        base64ImagemSecundaria3: base64ImagemSecundaria3,
        prepostoSelecionado: prepostoSelecionado,
        nomeCliente: nomeCliente,
        celularCliente: celularCliente,
        tipoPessoa: tipoPessoa,
        tipoSeguro: tipoSeguro,
        dataAtual: dataAtual,
        idOrcamento: idOrcamento,
        anoVeiculo: anoVeiculo,
        modeloVeiculo: modeloVeiculo,
        intZeroKmCheckbox: intZeroKmCheckbox,
        combustivelSelecionado: combustivelSelecionado,
        nomeVeiculo: nomeVeiculo,
        descricaoVeiculo: descricaoVeiculo,
        placaVeiculo: placaVeiculo,
        seguradoraRecomendada: seguradoraRecomendada,
        seguradoraIndividualRecomendada: seguradoraIndividualRecomendada,
        cobertura1: cobertura1,
        coberturas: coberturas,
        clausulas: clausulas,
        franquiaCounter: franquiaCounter,
        franquiasAdicionadas: franquiasAdicionadas,
        franquiaChecked: franquiaChecked,
        pagamentos: pagamentos,
        cobertura1MenorPreco: cobertura1MenorPreco,
        coberturasMenorPreco: coberturasMenorPreco,
        clausulasMenorPreco: clausulasMenorPreco,
        franquiaValorIndividual: franquiaValorIndividual,
        pagamentosMenorPreco: pagamentosMenorPreco,
        franquiaSelecionada: franquiaSelecionada,
        franquiaValorOuro: franquiaValorOuro,
        franquiaValorPrata: franquiaValorPrata,
        observacoesCheckboxAceito: observacoesCheckboxAceito.checked,
        observacoesTextarea: observacoesTextarea,
        obsChecked1: obsChecked1,
        obsChecked2: obsChecked2,
        obsChecked3: obsChecked3,
        coberturaSecundaria1: coberturaSecundaria1,
        coberturasSecundaria: coberturasSecundaria,
        clausulasSecundaria: clausulasSecundaria,
        franquiasSecundaria: franquiasSecundaria,
        pagamentoSecundaria: pagamentoSecundaria,
        cobertura1MpFormatado1: cobertura1MpFormatado1,
        cobertura1MpFormatado2: cobertura1MpFormatado2,
        cobertura1MpFormatado3: cobertura1MpFormatado3,
        coberturasMpFormatado1: coberturasMpFormatado1,
        coberturasMpFormatado2: coberturasMpFormatado2,
        coberturasMpFormatado3: coberturasMpFormatado3,
        clausulasMpFormatado1: clausulasMpFormatado1,
        clausulasMpFormatado2: clausulasMpFormatado2,
        clausulasMpFormatado3: clausulasMpFormatado3,
        franquiasMpFormatado1: franquiasMpFormatado1,
        franquiasMpFormatado2: franquiasMpFormatado2,
        franquiasMpFormatado3: franquiasMpFormatado3,
        franquiaCounterIndividual: franquiaCounterIndividual,
        nomeFranquia: nomeFranquia,
        valorIndividual: valorIndividual,
        valoresInputsDemaisSeguradoras1: valoresInputsDemaisSeguradoras1,
        valoresInputsDemaisSeguradoras2: valoresInputsDemaisSeguradoras2,
        valoresInputsDemaisSeguradoras3: valoresInputsDemaisSeguradoras3,
        pagamentoMpFormatado1: pagamentoMpFormatado1,
        pagamentoMpFormatado2: pagamentoMpFormatado2,
        pagamentoMpFormatado3: pagamentoMpFormatado3,
        // Dados enviados ao endpoint do bd
        // Gestor
        checkboxFranquiasGestor: checkboxFranquiasGestor.checked,
        franquiasAdicionadas: franquiasAdicionadas,
        tipoPagamentoIndividual: tipoPagamentoIndividual,
        observacoesCheckboxAceito: observacoesCheckboxAceito.checked,
        premioPOuro: premioPOuro,
        premioPPrata: premioPPrata,
        tablePagamentoPOuro: tablePagamentoPOuro,
        tablePagamentoPPrata: tablePagamentoPPrata,
        // Individual
        tipoPagamentoGestor: tipoPagamentoGestor,
        premioIndividual: premioIndividual,
        franquiasIndividualAdicionadas: franquiasIndividualAdicionadas
    })

};

document.querySelector('.btn-save').addEventListener('click', async function () {
    const dados = await capturaDataForm();
    if (!dados) return;
    // Enviar dados para o servidor via POST
    document.getElementById('loading').style.display = 'block';

    try {
        // Envia os dados para o servidor
        const response = await fetch('http://127.0.0.1:3000/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
            customSwal.fire({
                title: 'Orçamento Salvo!',
                text: 'Orçamento salvo com sucesso.',
                icon: 'success',
                iconColor: '#01458e'
            });
            setValoresAcumulados();
        } else {
            const errorData = await response.json();
            alert('Erro ao salvar orçamento: ' + errorData.error);
        }

    } catch (error) {
        // Se ocorrer um erro na requisição
        document.getElementById('loading').style.display = 'none'; // Esconde o carregamento
    }
});

async function gerarPDF(idOrcamento) {
    try {
        // Esconde o carregamento após a requisição
        document.getElementById('loading').style.display = 'none';
        window.open(`http://localhost:4040/orcamento${idOrcamento}.pdf`, '_blank'); // Abre o PDF
    } catch (error) {
        // Em caso de erro
        document.getElementById('loading').style.display = 'none'; // Esconde o carregamento
        alert('Erro ao realizar a requisição: ' + error.message);
    }
}

async function saveOrcamento(dados) {
    if (!dados) return;
    try {
        // Envia os dados para o servidor
        const response = await fetch('http://127.0.0.1:4040/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: dados
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            const errorData = await response.json();
            alert('Erro ao gerar PDF: ' + errorData.error);
        }

    } catch (error) {
        console.error('Erro ao realizar a requisição[orçamento não salvo]: ' + error.message);
    }
}
