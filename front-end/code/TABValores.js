import { seguradoraStatusGrMn } from "./GesRiscoMenPreco.js";

document.addEventListener('keydown', async function (event) {
    if (event.key === 'Shift') {
        //event.preventDefault();

        const tipoOrcamentoSelecionado = document.querySelector('input[name="tipo-orcamento"]:checked').value;
    
        if (tipoOrcamentoSelecionado === 'Gestor') {

        // Coberturas
        const valorCobertura1POuro = document.getElementById('valor-plano-ouro-cobertura1').value;
        const valorCobertura2POuro = document.getElementById('valor-plano-ouro-cobertura2').value;
        const valorCobertura3POuro = document.getElementById('valor-plano-ouro-cobertura3').value;
        const valorCobertura4POuro = document.getElementById('valor-plano-ouro-cobertura4').value;
        const valorCobertura5POuro = document.getElementById('valor-plano-ouro-cobertura5').value;
        const valorCobertura6POuro = document.getElementById('valor-plano-ouro-cobertura6').value;

        const valorCobertura1POuroDinamic = document.querySelectorAll(`[id="pOuro-cobertura1"]`);
        const valorCobertura2POuroDinamic = document.querySelectorAll(`[id="pOuro-cobertura2"]`);
        const valorCobertura3POuroDinamic = document.querySelectorAll(`[id="pOuro-cobertura3"]`);
        const valorCobertura4POuroDinamic = document.querySelectorAll(`[id="pOuro-cobertura4"]`);
        const valorCobertura5POuroDinamic = document.querySelectorAll(`[id="pOuro-cobertura5"]`);
        const valorCobertura6POuroDinamic = document.querySelectorAll(`[id="pOuro-cobertura6"]`);

        inserirValor(valorCobertura1POuroDinamic, valorCobertura1POuro);
        inserirValor(valorCobertura2POuroDinamic, formatMoeda(valorCobertura2POuro));
        inserirValor(valorCobertura3POuroDinamic, formatMoeda(valorCobertura3POuro));
        inserirValor(valorCobertura4POuroDinamic, formatMoeda(valorCobertura4POuro));
        inserirValor(valorCobertura5POuroDinamic, formatMoeda(valorCobertura5POuro));
        inserirValor(valorCobertura6POuroDinamic, formatMoeda(valorCobertura6POuro));

        const valorCobertura1PPrata = document.getElementById('valor-plano-prata-cobertura1').value;
        const valorCobertura2PPrata = document.getElementById('valor-plano-prata-cobertura2').value;
        const valorCobertura3PPrata = document.getElementById('valor-plano-prata-cobertura3').value;
        const valorCobertura4PPrata = document.getElementById('valor-plano-prata-cobertura4').value;
        const valorCobertura5PPrata = document.getElementById('valor-plano-prata-cobertura5').value;
        const valorCobertura6PPrata = document.getElementById('valor-plano-prata-cobertura6').value;

        const valorCobertura1PPrataDinamic = document.querySelectorAll(`[id="pPrata-cobertura1"]`);
        const valorCobertura2PPrataDinamic = document.querySelectorAll(`[id="pPrata-cobertura2"]`);
        const valorCobertura3PPrataDinamic = document.querySelectorAll(`[id="pPrata-cobertura3"]`);
        const valorCobertura4PPrataDinamic = document.querySelectorAll(`[id="pPrata-cobertura4"]`);
        const valorCobertura5PPrataDinamic = document.querySelectorAll(`[id="pPrata-cobertura5"]`);
        const valorCobertura6PPrataDinamic = document.querySelectorAll(`[id="pPrata-cobertura6"]`);

        inserirValor(valorCobertura1PPrataDinamic, valorCobertura1PPrata);
        inserirValor(valorCobertura2PPrataDinamic, formatMoeda(valorCobertura2PPrata));
        inserirValor(valorCobertura3PPrataDinamic, formatMoeda(valorCobertura3PPrata));
        inserirValor(valorCobertura4PPrataDinamic, formatMoeda(valorCobertura4PPrata));
        inserirValor(valorCobertura5PPrataDinamic, formatMoeda(valorCobertura5PPrata));
        inserirValor(valorCobertura6PPrataDinamic, formatMoeda(valorCobertura6PPrata));

        // Clausulas
        const valorClausula1POuro = document.getElementById('select-clausulas-p-ouro1').value;
        const valorClausula2POuro = document.getElementById('select-clausulas-p-ouro2').value;
        const valorClausula3POuro = document.getElementById('select-clausulas-p-ouro3').value;
        const valorClausula4POuro = document.getElementById('select-clausulas-p-ouro4').value;
        const valorClausula5POuro = document.getElementById('select-clausulas-p-ouro5').value;

        const valorClausula1POuroDinamic = document.querySelectorAll(`[id="pOuro-clausula1"]`);
        const valorClausula2POuroDinamic = document.querySelectorAll(`[id="pOuro-clausula2"]`);
        const valorClausula3POuroDinamic = document.querySelectorAll(`[id="pOuro-clausula3"]`);
        const valorClausula4POuroDinamic = document.querySelectorAll(`[id="pOuro-clausula4"]`);
        const valorClausula5POuroDinamic = document.querySelectorAll(`[id="pOuro-clausula5"]`);

        inserirValor(valorClausula1POuroDinamic, valorClausula1POuro);
        inserirValor(valorClausula2POuroDinamic, valorClausula2POuro);
        inserirValor(valorClausula3POuroDinamic, valorClausula3POuro);
        inserirValor(valorClausula4POuroDinamic, valorClausula4POuro);
        inserirValor(valorClausula5POuroDinamic, valorClausula5POuro);

        const valorClausula1PPrata = document.getElementById('select-clausulas-p-prata1').value;
        const valorClausula2PPrata = document.getElementById('select-clausulas-p-prata2').value;
        const valorClausula3PPrata = document.getElementById('select-clausulas-p-prata3').value;
        const valorClausula4PPrata = document.getElementById('select-clausulas-p-prata4').value;
        const valorClausula5PPrata = document.getElementById('select-clausulas-p-prata5').value;

        const valorClausula1PPrataDinamic = document.querySelectorAll(`[id="pPrata-clausula1"]`);
        const valorClausula2PPrataDinamic = document.querySelectorAll(`[id="pPrata-clausula2"]`);
        const valorClausula3PPrataDinamic = document.querySelectorAll(`[id="pPrata-clausula3"]`);
        const valorClausula4PPrataDinamic = document.querySelectorAll(`[id="pPrata-clausula4"]`);
        const valorClausula5PPrataDinamic = document.querySelectorAll(`[id="pPrata-clausula5"]`);

        inserirValor(valorClausula1PPrataDinamic, valorClausula1PPrata);
        inserirValor(valorClausula2PPrataDinamic, valorClausula2PPrata);
        inserirValor(valorClausula3PPrataDinamic, valorClausula3PPrata);
        inserirValor(valorClausula4PPrataDinamic, valorClausula4PPrata);
        inserirValor(valorClausula5PPrataDinamic, valorClausula5PPrata);

        // Franquias
        const valorFranquiaPOuro = document.getElementById('valor-plano-ouro-franquias').value;
        const valorFranquiaPPrata = document.getElementById('valor-plano-prata-franquias').value;

        const valorFranquiaPOuroDinamic = document.querySelectorAll(`[id="pOuro-franquia"]`);
        const valorFranquiaPPrataDinamic = document.querySelectorAll(`[id="pPrata-franquia"]`);

        inserirValor(valorFranquiaPOuroDinamic, formatMoeda(valorFranquiaPOuro));
        inserirValor(valorFranquiaPPrataDinamic, formatMoeda(valorFranquiaPPrata));

        // Pagamento
        const valorPagamentoPOuro = document.getElementById('valor-avista-plano-ouro').value;
        const valorPagamentoPPrata = document.getElementById('valor-avista-plano-prata').value;

        const valorPagamentoPOuroDinamic = document.querySelectorAll(`[id="pOuro-1"]`);
        const valorPagamentoPPrataDinamic = document.querySelectorAll(`[id="pPrata-1"]`);

        inserirValor(valorPagamentoPOuroDinamic, formatMoeda(valorPagamentoPOuro));
        inserirValor(valorPagamentoPPrataDinamic, formatMoeda(valorPagamentoPPrata));
        
    } else if (tipoOrcamentoSelecionado === 'Menor') {
        const valorCobertura1Individual = document.getElementById('valor-individual-cobertura1').value;
        const valorCobertura2Individual = document.getElementById('valor-individual-cobertura2').value;
        const valorCobertura3Individual = document.getElementById('valor-individual-cobertura3').value;
        const valorCobertura4Individual = document.getElementById('valor-individual-cobertura4').value;
        const valorCobertura5Individual = document.getElementById('valor-individual-cobertura5').value;
        const valorCobertura6Individual = document.getElementById('valor-individual-cobertura6').value;

        const valorClausula1Individual = document.getElementById('select-clausulas-individual1').value;
        const valorClausula2Individual = document.getElementById('select-clausulas-individual2').value;
        const valorClausula3Individual = document.getElementById('select-clausulas-individual3').value;
        const valorClausula4Individual = document.getElementById('select-clausulas-individual4').value;
        const valorClausula5Individual = document.getElementById('select-clausulas-individual5').value;

        const valorFranquiaIndividual = document.getElementById('valor-individual-franquias').value;

        const valorPagamentoIndividual = document.getElementById('valor-avista-individual').value;

        const status = seguradoraStatusGrMn[1];

        for (let i = 1; i <= status; i++) {
            valoresIndividualCoberturas(
                valorCobertura1Individual, valorCobertura2Individual, valorCobertura3Individual,
                valorCobertura4Individual, valorCobertura5Individual, valorCobertura6Individual,
                `[class="cobertura-individual1${i}"]`,
                `[class="cobertura-individual2${i}"]`,
                `[class="cobertura-individual3${i}"]`,
                `[class="cobertura-individual4${i}"]`,
                `[class="cobertura-individual5${i}"]`,
                `[class="cobertura-individual6${i}"]`
            );
        }

        for (let i = 1; i <= status; i++) {
            valoresIndividualClausulas(
                valorClausula1Individual, valorClausula2Individual, valorClausula3Individual,
                valorClausula4Individual, valorClausula5Individual,
                `[class="clausula-individual1${i}"]`,
                `[class="clausula-individual2${i}"]`,
                `[class="clausula-individual3${i}"]`,
                `[class="clausula-individual4${i}"]`,
                `[class="clausula-individual5${i}"]`,
            );
        }

        for (let i = 1; i <= status; i++) {
            valoresIndividualFranquias(
                valorFranquiaIndividual,
                `[class="franquia-individual${i}"]`,
            );
        }

        for (let i = 1; i <= status; i++) {
            valoresIndividualPagamentos(
                valorPagamentoIndividual,
                `[class="table-pagamento-individual${i}"]`,
            );
        }

    }

    }
});

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

function valoresIndividualCoberturas(v1, v2, v3, v4, v5, v6, f1, f2, f3, f4, f5, f6) {
    const valorFormatadoIndividual1 = formatMoeda(v1);

    const valorFormatadoIndividual2 = formatMoeda(v2);

    const valorFormatadoIndividual3 = formatMoeda(v3);

    const valorFormatadoIndividual4 = formatMoeda(v4);

    const valorFormatadoIndividual5 = formatMoeda(v5);

    const valorFormatadoIndividual6 = formatMoeda(v6);



    const cIndividual1 = document.querySelectorAll(f1);
    const cIndividual2 = document.querySelectorAll(f2);
    const cIndividual3 = document.querySelectorAll(f3);
    const cIndividual4 = document.querySelectorAll(f4);
    const cIndividual5 = document.querySelectorAll(f5);
    const cIndividual6 = document.querySelectorAll(f6);

    inserirValor(cIndividual1, valorFormatadoIndividual1);
    inserirValor(cIndividual2, valorFormatadoIndividual2);
    inserirValor(cIndividual3, valorFormatadoIndividual3);
    inserirValor(cIndividual4, valorFormatadoIndividual4);
    inserirValor(cIndividual5, valorFormatadoIndividual5);
    inserirValor(cIndividual6, valorFormatadoIndividual6);
}

function valoresIndividualClausulas(v1, v2, v3, v4, v5, f1, f2, f3, f4, f5) {
    const valorFormatadoIndividual1 = formatMoeda(v1);

    const valorFormatadoIndividual2 = formatMoeda(v2);

    const valorFormatadoIndividual3 = formatMoeda(v3);

    const valorFormatadoIndividual4 = formatMoeda(v4);

    const valorFormatadoIndividual5 = formatMoeda(v5);



    const cIndividual1 = document.querySelectorAll(f1);
    const cIndividual2 = document.querySelectorAll(f2);
    const cIndividual3 = document.querySelectorAll(f3);
    const cIndividual4 = document.querySelectorAll(f4);
    const cIndividual5 = document.querySelectorAll(f5);

    inserirValor(cIndividual1, valorFormatadoIndividual1);
    inserirValor(cIndividual2, valorFormatadoIndividual2);
    inserirValor(cIndividual3, valorFormatadoIndividual3);
    inserirValor(cIndividual4, valorFormatadoIndividual4);
    inserirValor(cIndividual5, valorFormatadoIndividual5);
}

function valoresIndividualFranquias(v1, f1) {
    const valorFormatadoIndividual1 = formatMoeda(v1);

    const fIndividual1 = document.querySelectorAll(f1);

    inserirValor(fIndividual1, valorFormatadoIndividual1);
}

function valoresIndividualPagamentos(v1, f1) {
    const valorFormatadoIndividual1 = formatMoeda(v1);

    const fIndividual1 = document.querySelectorAll(f1);

    inserirValor(fIndividual1, valorFormatadoIndividual1);

}