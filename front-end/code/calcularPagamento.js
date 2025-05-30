import { calcularParcelasPagamento} from "./functionCliente.js";
import { removerFormatacaoMonetaria } from "./functionCliente.js";
import { tablePagamentoPOuro, tablePagamentoPPrata, tablePagamentoIndividual1, tablePagamentoIndividual2, tablePagamentoIndividual3 } from "./functionCliente.js";
import { customSwal } from "./alertasCustom.js";
import { seguradoraStatus } from "./adicionarSeguradora.js";
import { seguradoraStatusGrMn } from "./GesRiscoMenPreco.js";


document.querySelector('.btn-calcular').addEventListener('click', async function() {

    // Captura do valor no input mantendo a formatação
    var valorPlanoOuro = document.getElementById('valor-avista-plano-ouro').value;
    valorPlanoOuro = removerFormatacaoMonetaria(valorPlanoOuro);
    if (isNaN(valorPlanoOuro) || valorPlanoOuro === '') {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Para calcular as parcelas do pagamento Plano Ouro, por favor, insira o valor do prêmio.',
            icon: 'info',
            iconColor: '#01458e'
        });
        return;
    }

    var valorPlanoPrata = document.getElementById('valor-avista-plano-prata').value;
    valorPlanoPrata = removerFormatacaoMonetaria(valorPlanoPrata);
    if (isNaN(valorPlanoPrata) || valorPlanoPrata === '') {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Para calcular as parcelas do pagamento Plano Prata, por favor, insira o valor do prêmio.',
            icon: 'info',
            iconColor: '#01458e'
        });
        return;
    }

    // Insere os valores
    document.getElementById('input-valor-avista-plano-ouro').value = formatMoeda(valorPlanoOuro);
    document.getElementById('input-valor-avista-plano-prata').value = formatMoeda(valorPlanoPrata);

    // Cálculo das parcelas

    var valor1x = calcularParcelasPagamento(1, valorPlanoOuro);
    document.getElementById('input-valor-1x-plano-ouro').value = formatMoeda(valor1x);
    var valor1x = calcularParcelasPagamento(1, valorPlanoPrata);
    document.getElementById('input-valor-1x-plano-prata').value = formatMoeda(valor1x);

    var valor2x = calcularParcelasPagamento(2, valorPlanoOuro);
    document.getElementById('input-valor-2x-plano-ouro').value = formatMoeda(valor2x);
    var valor2x = calcularParcelasPagamento(2, valorPlanoPrata);
    document.getElementById('input-valor-2x-plano-prata').value = formatMoeda(valor2x);

    var valor3x = calcularParcelasPagamento(3, valorPlanoOuro);
    document.getElementById('input-valor-3x-plano-ouro').value = formatMoeda(valor3x);
    var valor3x = calcularParcelasPagamento(3, valorPlanoPrata);
    document.getElementById('input-valor-3x-plano-prata').value = formatMoeda(valor3x);

    var valor4x = calcularParcelasPagamento(4, valorPlanoOuro);
    document.getElementById('input-valor-4x-plano-ouro').value = formatMoeda(valor4x);
    var valor4x = calcularParcelasPagamento(4, valorPlanoPrata);
    document.getElementById('input-valor-4x-plano-prata').value = formatMoeda(valor4x);

    var valor5x = calcularParcelasPagamento(5, valorPlanoOuro);
    document.getElementById('input-valor-5x-plano-ouro').value = formatMoeda(valor5x);
    var valor5x = calcularParcelasPagamento(5, valorPlanoPrata);
    document.getElementById('input-valor-5x-plano-prata').value = formatMoeda(valor5x);

    var valor6x = calcularParcelasPagamento(6, valorPlanoOuro);
    document.getElementById('input-valor-6x-plano-ouro').value = formatMoeda(valor6x);
    var valor6x = calcularParcelasPagamento(6, valorPlanoPrata);
    document.getElementById('input-valor-6x-plano-prata').value = formatMoeda(valor6x);

    var valor7x = calcularParcelasPagamento(7, valorPlanoOuro);
    document.getElementById('input-valor-7x-plano-ouro').value = formatMoeda(valor7x);
    var valor7x = calcularParcelasPagamento(7, valorPlanoPrata);
    document.getElementById('input-valor-7x-plano-prata').value = formatMoeda(valor7x);

    var valor8x = calcularParcelasPagamento(8, valorPlanoOuro);
    document.getElementById('input-valor-8x-plano-ouro').value = formatMoeda(valor8x);
    var valor8x = calcularParcelasPagamento(8, valorPlanoPrata);
    document.getElementById('input-valor-8x-plano-prata').value = formatMoeda(valor8x);

    var valor9x = calcularParcelasPagamento(9, valorPlanoOuro);
    document.getElementById('input-valor-9x-plano-ouro').value = formatMoeda(valor9x);
    var valor9x = calcularParcelasPagamento(9, valorPlanoPrata);
    document.getElementById('input-valor-9x-plano-prata').value = formatMoeda(valor9x);

    var valor10x = calcularParcelasPagamento(10, valorPlanoOuro);
    document.getElementById('input-valor-10x-plano-ouro').value = formatMoeda(valor10x);
    var valor10x = calcularParcelasPagamento(10, valorPlanoPrata);
    document.getElementById('input-valor-10x-plano-prata').value = formatMoeda(valor10x);

    var valor11x = calcularParcelasPagamento(11, valorPlanoOuro);
    document.getElementById('input-valor-11x-plano-ouro').value = formatMoeda(valor11x);
    var valor11x = calcularParcelasPagamento(11, valorPlanoPrata);
    document.getElementById('input-valor-11x-plano-prata').value = formatMoeda(valor11x);

    var valor12x = calcularParcelasPagamento(12, valorPlanoOuro);
    document.getElementById('input-valor-12x-plano-ouro').value = formatMoeda(valor12x);
    var valor12x = calcularParcelasPagamento(12, valorPlanoPrata);
    document.getElementById('input-valor-12x-plano-prata').value = formatMoeda(valor12x);

    
    const tablePagamentoPOuroSemFormato = removerFormatacaoMonetaria(tablePagamentoPOuro);
    
    const tablePagamentoPPrataSemFormato = removerFormatacaoMonetaria(tablePagamentoPPrata);

    if (seguradoraStatus[1] === 1) {
        if (isNaN(tablePagamentoPOuroSemFormato) || tablePagamentoPOuroSemFormato === '') {
            customSwal.fire({
                title: 'Campo Obrigatório',
                text: 'Para calcular as parcelas do pagamento Plano Ouro, por favor, insira o valor do prêmio.',
                icon: 'info',
                iconColor: '#01458e'
            });
            return;
        };

        if (isNaN(tablePagamentoPPrataSemFormato) || tablePagamentoPPrataSemFormato === '') {
            customSwal.fire({
                title: 'Campo Obrigatório',
                text: 'Para calcular as parcelas do pagamento Plano Prata, por favor, insira o valor do prêmio.',
                icon: 'info',
                iconColor: '#01458e'
            });
            return;
        };
    };

    const valorFormatadoPOuro = formatMoeda(tablePagamentoPOuroSemFormato);

    const valorSemFormatoPOuro2x = calcularParcelasPagamento(2, tablePagamentoPOuroSemFormato);
    const valorFormatadoPOuro2x = formatMoeda(valorSemFormatoPOuro2x);

    const valorSemFormatoPOuro3x = calcularParcelasPagamento(3, tablePagamentoPOuroSemFormato);
    const valorFormatadoPOuro3x = formatMoeda(valorSemFormatoPOuro3x);

    const valorSemFormatoPOuro4x = calcularParcelasPagamento(4, tablePagamentoPOuroSemFormato);
    const valorFormatadoPOuro4x = formatMoeda(valorSemFormatoPOuro4x);

    const valorSemFormatoPOuro5x = calcularParcelasPagamento(5, tablePagamentoPOuroSemFormato);
    const valorFormatadoPOuro5x = formatMoeda(valorSemFormatoPOuro5x);

    const valorSemFormatoPOuro6x = calcularParcelasPagamento(6, tablePagamentoPOuroSemFormato);
    const valorFormatadoPOuro6x = formatMoeda(valorSemFormatoPOuro6x);

    const valorSemFormatoPOuro7x = calcularParcelasPagamento(7, tablePagamentoPOuroSemFormato);
    const valorFormatadoPOuro7x = formatMoeda(valorSemFormatoPOuro7x);

    const valorSemFormatoPOuro8x = calcularParcelasPagamento(8, tablePagamentoPOuroSemFormato);
    const valorFormatadoPOuro8x = formatMoeda(valorSemFormatoPOuro8x);

    const valorSemFormatoPOuro9x = calcularParcelasPagamento(9, tablePagamentoPOuroSemFormato);
    const valorFormatadoPOuro9x = formatMoeda(valorSemFormatoPOuro9x);

    const valorSemFormatoPOuro10x = calcularParcelasPagamento(10, tablePagamentoPOuroSemFormato);
    const valorFormatadoPOuro10x = formatMoeda(valorSemFormatoPOuro10x);

    const valorSemFormatoPOuro11x = calcularParcelasPagamento(11, tablePagamentoPOuroSemFormato);
    const valorFormatadoPOuro11x = formatMoeda(valorSemFormatoPOuro11x);

    const valorSemFormatoPOuro12x = calcularParcelasPagamento(12, tablePagamentoPOuroSemFormato);
    const valorFormatadoPOuro12x = formatMoeda(valorSemFormatoPOuro12x);


    const valorFormatadoPPrata = formatMoeda(tablePagamentoPPrataSemFormato);

    const valorSemFormatoPPrata2x = calcularParcelasPagamento(2, tablePagamentoPPrataSemFormato);
    const valorFormatadoPPrata2x = formatMoeda(valorSemFormatoPPrata2x);

    const valorSemFormatoPPrata3x = calcularParcelasPagamento(3, tablePagamentoPPrataSemFormato);
    const valorFormatadoPPrata3x = formatMoeda(valorSemFormatoPPrata3x);
    
    const valorSemFormatoPPrata4x = calcularParcelasPagamento(4, tablePagamentoPPrataSemFormato);
    const valorFormatadoPPrata4x = formatMoeda(valorSemFormatoPPrata4x);

    const valorSemFormatoPPrata5x = calcularParcelasPagamento(5, tablePagamentoPPrataSemFormato);
    const valorFormatadoPPrata5x = formatMoeda(valorSemFormatoPPrata5x);

    const valorSemFormatoPPrata6x = calcularParcelasPagamento(6, tablePagamentoPPrataSemFormato);
    const valorFormatadoPPrata6x = formatMoeda(valorSemFormatoPPrata6x);

    const valorSemFormatoPPrata7x = calcularParcelasPagamento(7, tablePagamentoPPrataSemFormato);
    const valorFormatadoPPrata7x = formatMoeda(valorSemFormatoPPrata7x);

    const valorSemFormatoPPrata8x = calcularParcelasPagamento(8, tablePagamentoPPrataSemFormato);
    const valorFormatadoPPrata8x = formatMoeda(valorSemFormatoPPrata8x);

    const valorSemFormatoPPrata9x = calcularParcelasPagamento(9, tablePagamentoPPrataSemFormato);
    const valorFormatadoPPrata9x = formatMoeda(valorSemFormatoPPrata9x);

    const valorSemFormatoPPrata10x = calcularParcelasPagamento(10, tablePagamentoPPrataSemFormato);
    const valorFormatadoPPrata10x = formatMoeda(valorSemFormatoPPrata10x);

    const valorSemFormatoPPrata11x = calcularParcelasPagamento(11, tablePagamentoPPrataSemFormato);
    const valorFormatadoPPrata11x = formatMoeda(valorSemFormatoPPrata11x);

    const valorSemFormatoPPrata12x = calcularParcelasPagamento(12, tablePagamentoPPrataSemFormato);
    const valorFormatadoPPrata12x = formatMoeda(valorSemFormatoPPrata12x);


    // Selecionar todos os inputs que possuem id começando com "pOuroAVista-"
    const pOuroAVista = document.querySelectorAll('[id="pOuroAVista"]');
    const pOuro1 = document.querySelectorAll('[id="pOuro1"]');
    const pOuro2 = document.querySelectorAll('[id="pOuro2"]');
    const pOuro3 = document.querySelectorAll('[id="pOuro3"]');
    const pOuro4 = document.querySelectorAll('[id="pOuro4"]');
    const pOuro5 = document.querySelectorAll('[id="pOuro5"]');
    const pOuro6 = document.querySelectorAll('[id="pOuro6"]');
    const pOuro7 = document.querySelectorAll('[id="pOuro7"]');
    const pOuro8 = document.querySelectorAll('[id="pOuro8"]');
    const pOuro9 = document.querySelectorAll('[id="pOuro9"]');
    const pOuro10 = document.querySelectorAll('[id="pOuro10"]');
    const pOuro11 = document.querySelectorAll('[id="pOuro11"]');
    const pOuro12 = document.querySelectorAll('[id="pOuro12"]');

    const pPrataAVista = document.querySelectorAll('[id="pPrataAVista"]');
    const pPrata1 = document.querySelectorAll('[id="pPrata1"]');
    const pPrata2 = document.querySelectorAll('[id="pPrata2"]');
    const pPrata3 = document.querySelectorAll('[id="pPrata3"]');
    const pPrata4 = document.querySelectorAll('[id="pPrata4"]');
    const pPrata5 = document.querySelectorAll('[id="pPrata5"]');
    const pPrata6 = document.querySelectorAll('[id="pPrata6"]');
    const pPrata7 = document.querySelectorAll('[id="pPrata7"]');
    const pPrata8 = document.querySelectorAll('[id="pPrata8"]');
    const pPrata9 = document.querySelectorAll('[id="pPrata9"]');
    const pPrata10 = document.querySelectorAll('[id="pPrata10"]');
    const pPrata11 = document.querySelectorAll('[id="pPrata11"]');
    const pPrata12 = document.querySelectorAll('[id="pPrata12"]');

    inserirValor(pOuroAVista, valorFormatadoPOuro);
    inserirValor(pOuro1, valorFormatadoPOuro);
    inserirValor(pOuro2, valorFormatadoPOuro2x);
    inserirValor(pOuro3, valorFormatadoPOuro3x);
    inserirValor(pOuro4, valorFormatadoPOuro4x);
    inserirValor(pOuro5, valorFormatadoPOuro5x);
    inserirValor(pOuro6, valorFormatadoPOuro6x);
    inserirValor(pOuro7, valorFormatadoPOuro7x);
    inserirValor(pOuro8, valorFormatadoPOuro8x);
    inserirValor(pOuro9, valorFormatadoPOuro9x);
    inserirValor(pOuro10, valorFormatadoPOuro10x);
    inserirValor(pOuro11, valorFormatadoPOuro11x);
    inserirValor(pOuro12, valorFormatadoPOuro12x);

    inserirValor(pPrataAVista, valorFormatadoPPrata);
    inserirValor(pPrata1, valorFormatadoPPrata);
    inserirValor(pPrata2, valorFormatadoPPrata2x);
    inserirValor(pPrata3, valorFormatadoPPrata3x);
    inserirValor(pPrata4, valorFormatadoPPrata4x);
    inserirValor(pPrata5, valorFormatadoPPrata5x);
    inserirValor(pPrata6, valorFormatadoPPrata6x);
    inserirValor(pPrata7, valorFormatadoPPrata7x);
    inserirValor(pPrata8, valorFormatadoPPrata8x);
    inserirValor(pPrata9, valorFormatadoPPrata9x);
    inserirValor(pPrata10, valorFormatadoPPrata10x);
    inserirValor(pPrata11, valorFormatadoPPrata11x);
    inserirValor(pPrata12, valorFormatadoPPrata12x);
});

document.querySelector('.btn-calcular-individual').addEventListener('click', async function() {

    // Captura do valor no input mantendo a formatação
    var valorIndividual = document.getElementById('valor-avista-individual').value;
    valorIndividual = removerFormatacaoMonetaria(valorIndividual);
    if (isNaN(valorIndividual) || valorIndividual === '') {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Para calcular as parcelas do pagamento, por favor, insira o valor do prêmio.',
            icon: 'info',
            iconColor: '#01458e'
        });
        return;
    }

    // Insere os valores
    document.getElementById('input-valor-avista-individual').value = formatMoeda(valorIndividual);

    // Cálculo das parcelas
    var valor1xIndividual = calcularParcelasPagamento(1, valorIndividual);
    document.getElementById('input-valor-1x-individual').value = formatMoeda(valor1xIndividual);

    var valor2xIndividual = calcularParcelasPagamento(2, valorIndividual);
    document.getElementById('input-valor-2x-individual').value = formatMoeda(valor2xIndividual);

    var valor3xIndividual = calcularParcelasPagamento(3, valorIndividual);
    document.getElementById('input-valor-3x-individual').value = formatMoeda(valor3xIndividual);

    var valor4xIndividual = calcularParcelasPagamento(4, valorIndividual);
    document.getElementById('input-valor-4x-individual').value = formatMoeda(valor4xIndividual);

    var valor5xIndividual = calcularParcelasPagamento(5, valorIndividual);
    document.getElementById('input-valor-5x-individual').value = formatMoeda(valor5xIndividual);

    var valor6xIndividual = calcularParcelasPagamento(6, valorIndividual);
    document.getElementById('input-valor-6x-individual').value = formatMoeda(valor6xIndividual);

    var valor7xIndividual = calcularParcelasPagamento(7, valorIndividual);
    document.getElementById('input-valor-7x-individual').value = formatMoeda(valor7xIndividual);

    var valor8xIndividual = calcularParcelasPagamento(8, valorIndividual);
    document.getElementById('input-valor-8x-individual').value = formatMoeda(valor8xIndividual);

    var valor9xIndividual = calcularParcelasPagamento(9, valorIndividual);
    document.getElementById('input-valor-9x-individual').value = formatMoeda(valor9xIndividual);

    var valor10xIndividual = calcularParcelasPagamento(10, valorIndividual);
    document.getElementById('input-valor-10x-individual').value = formatMoeda(valor10xIndividual);

    var valor11xIndividual = calcularParcelasPagamento(11, valorIndividual);
    document.getElementById('input-valor-11x-individual').value = formatMoeda(valor11xIndividual);

    var valor12xIndividual = calcularParcelasPagamento(12, valorIndividual);
    document.getElementById('input-valor-12x-individual').value = formatMoeda(valor12xIndividual);


    const tablePagamentoIndividualSemFormato1 = removerFormatacaoMonetaria(tablePagamentoIndividual1);
    const tablePagamentoIndividualSemFormato2 = removerFormatacaoMonetaria(tablePagamentoIndividual2);
    const tablePagamentoIndividualSemFormato3 = removerFormatacaoMonetaria(tablePagamentoIndividual3);

    if (seguradoraStatusGrMn[1] === 1) {
        valoresCalculadosIndividual(tablePagamentoIndividualSemFormato1, '[class="p-individualAVista1"]', '[class="p-individual11"]', 
            '[class="p-individual21"]', '[class="p-individual31"]', '[class="p-individual41"]', '[class="p-individual51"]', '[class="p-individual61"]',
        '[class="p-individual71"]', '[class="p-individual81"]', '[class="p-individual91"]', '[class="p-individual101"]', '[class="p-individual111"]', '[class="p-individual121"]');
    };

    if (seguradoraStatusGrMn[1] === 2) {
        valoresCalculadosIndividual(tablePagamentoIndividualSemFormato1, '[class="p-individualAVista1"]', '[class="p-individual11"]', 
            '[class="p-individual21"]', '[class="p-individual31"]', '[class="p-individual41"]', '[class="p-individual51"]', '[class="p-individual61"]',
        '[class="p-individual71"]', '[class="p-individual81"]', '[class="p-individual91"]', '[class="p-individual101"]', '[class="p-individual111"]', '[class="p-individual121"]');

        valoresCalculadosIndividual(tablePagamentoIndividualSemFormato2, '[class="p-individualAVista2"]', '[class="p-individual12"]', 
            '[class="p-individual22"]', '[class="p-individual32"]', '[class="p-individual42"]', '[class="p-individual52"]', '[class="p-individual62"]',
        '[class="p-individual72"]', '[class="p-individual82"]', '[class="p-individual92"]', '[class="p-individual102"]', '[class="p-individual112"]', '[class="p-individual122"]');
    };
    
    if (seguradoraStatusGrMn[1] === 3) {
        valoresCalculadosIndividual(tablePagamentoIndividualSemFormato1, '[class="p-individualAVista1"]', '[class="p-individual11"]', 
            '[class="p-individual21"]', '[class="p-individual31"]', '[class="p-individual41"]', '[class="p-individual51"]', '[class="p-individual61"]',
        '[class="p-individual71"]', '[class="p-individual81"]', '[class="p-individual91"]', '[class="p-individual101"]', '[class="p-individual111"]', '[class="p-individual121"]');

        valoresCalculadosIndividual(tablePagamentoIndividualSemFormato2, '[class="p-individualAVista2"]', '[class="p-individual12"]', 
            '[class="p-individual22"]', '[class="p-individual32"]', '[class="p-individual42"]', '[class="p-individual52"]', '[class="p-individual62"]',
        '[class="p-individual72"]', '[class="p-individual82"]', '[class="p-individual92"]', '[class="p-individual102"]', '[class="p-individual112"]', '[class="p-individual122"]');

        valoresCalculadosIndividual(tablePagamentoIndividualSemFormato3, '[class="p-individualAVista3"]', '[class="p-individual13"]', 
            '[class="p-individual23"]', '[class="p-individual33"]', '[class="p-individual43"]', '[class="p-individual53"]', '[class="p-individual63"]',
        '[class="p-individual73"]', '[class="p-individual83"]', '[class="p-individual93"]', '[class="p-individual103"]', '[class="p-individual113"]', '[class="p-individual123"]');
    };
});


function valoresCalculadosIndividual (table, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9,v10, v11, v12) {
    if (isNaN(table) || table === '') {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Para calcular as parcelas do pagamento, por favor, insira o valor do prêmio.',
            icon: 'info',
            iconColor: '#01458e'
        });
        return;
    }
    
    const valorFormatadoIndividual = formatMoeda(table);

    const valorSemFormatoIndividual2x = calcularParcelasPagamento(2, table);
    const valorFormatadoIndividual2x = formatMoeda(valorSemFormatoIndividual2x);

    const valorSemFormatoIndividual3x = calcularParcelasPagamento(3, table);
    const valorFormatadoIndividual3x = formatMoeda(valorSemFormatoIndividual3x);

    const valorSemFormatoIndividual4x = calcularParcelasPagamento(4, table);
    const valorFormatadoIndividual4x = formatMoeda(valorSemFormatoIndividual4x);

    const valorSemFormatoIndividual5x = calcularParcelasPagamento(5, table);
    const valorFormatadoIndividual5x = formatMoeda(valorSemFormatoIndividual5x);

    const valorSemFormatoIndividual6x = calcularParcelasPagamento(6, table);
    const valorFormatadoIndividual6x = formatMoeda(valorSemFormatoIndividual6x);

    const valorSemFormatoIndividual7x = calcularParcelasPagamento(7, table);
    const valorFormatadoIndividual7x = formatMoeda(valorSemFormatoIndividual7x);

    const valorSemFormatoIndividual8x = calcularParcelasPagamento(8, table);
    const valorFormatadoIndividual8x = formatMoeda(valorSemFormatoIndividual8x);

    const valorSemFormatoIndividual9x = calcularParcelasPagamento(9, table);
    const valorFormatadoIndividual9x = formatMoeda(valorSemFormatoIndividual9x);

    const valorSemFormatoIndividual10x = calcularParcelasPagamento(10, table);
    const valorFormatadoIndividual10x = formatMoeda(valorSemFormatoIndividual10x);

    const valorSemFormatoIndividual11x = calcularParcelasPagamento(11, table);
    const valorFormatadoIndividual11x = formatMoeda(valorSemFormatoIndividual11x);

    const valorSemFormatoIndividual12x = calcularParcelasPagamento(12, table);
    const valorFormatadoIndividual12x = formatMoeda(valorSemFormatoIndividual12x);



        // Selecionar todos os inputs que possuem id começando com "pOuroAVista-"
        const pIndividualAVista1 = document.querySelectorAll(v0);
        const pIndividual11 = document.querySelectorAll(v1);
        const pIndividual21 = document.querySelectorAll(v2);
        const pIndividual31 = document.querySelectorAll(v3);
        const pIndividual41 = document.querySelectorAll(v4);
        const pIndividual51 = document.querySelectorAll(v5);
        const pIndividual61 = document.querySelectorAll(v6);
        const pIndividual71 = document.querySelectorAll(v7);
        const pIndividual81 = document.querySelectorAll(v8);
        const pIndividual91 = document.querySelectorAll(v9);
        const pIndividual101 = document.querySelectorAll(v10);
        const pIndividual111 = document.querySelectorAll(v11);
        const pIndividual121 = document.querySelectorAll(v12);

        inserirValor(pIndividualAVista1, valorFormatadoIndividual);
        inserirValor(pIndividual11, valorFormatadoIndividual);
        inserirValor(pIndividual21, valorFormatadoIndividual2x);
        inserirValor(pIndividual31, valorFormatadoIndividual3x);
        inserirValor(pIndividual41, valorFormatadoIndividual4x);
        inserirValor(pIndividual51, valorFormatadoIndividual5x);
        inserirValor(pIndividual61, valorFormatadoIndividual6x);
        inserirValor(pIndividual71, valorFormatadoIndividual7x);
        inserirValor(pIndividual81, valorFormatadoIndividual8x);
        inserirValor(pIndividual91, valorFormatadoIndividual9x);
        inserirValor(pIndividual101, valorFormatadoIndividual10x);
        inserirValor(pIndividual111, valorFormatadoIndividual11x);
        inserirValor(pIndividual121, valorFormatadoIndividual12x);
}

function formatMoeda(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function inserirValor(input, valorFormatado) {
    input.forEach(input => {
        input.value = valorFormatado;
        const event = new InputEvent('change', { bubbles: true });
        input.dispatchEvent(event);
    });
}