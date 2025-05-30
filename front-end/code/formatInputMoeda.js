import { inputEventList } from "./functionCliente.js";

function inputCobertura(indice) {
    inputEventList(document.getElementById(`valor-plano-ouro-cobertura${indice}`));
    inputEventList(document.getElementById(`valor-plano-prata-cobertura${indice}`));
    inputEventList(document.getElementById(`valor-individual-cobertura${indice}`));
}

function inputPagamento(indice) {
    inputEventList(document.getElementById(`input-valor-${indice}x-plano-ouro`));
    inputEventList(document.getElementById(`input-valor-${indice}x-plano-prata`));
    inputEventList(document.getElementById(`input-valor-${indice}x-individual`));
}

const inpulanoOuroFranquias = document.getElementById('valor-plano-ouro-franquias');
const inpulanoPrataFranquias = document.getElementById('valor-plano-prata-franquias');
const inputIndividualFranquias = document.getElementById('valor-individual-franquias');
const inputValorAvistaPlanoOuro = document.getElementById('valor-avista-plano-ouro'); // Table Pagamento
const inputValorAvistaPlanoPrata = document.getElementById('valor-avista-plano-prata'); // Table Pagamento
const inputValoravistaPlanoOuro = document.getElementById('input-valor-avista-plano-ouro');
const inputValoravistaPlanoPrata = document.getElementById('input-valor-avista-plano-prata');
const inputinputValoravistaIndividual = document.getElementById('input-valor-avista-individual');
const inputValorAvistaIndividual = document.getElementById(`valor-avista-individual`); // Table Pagamento

inputEventList(inpulanoOuroFranquias);
inputEventList(inpulanoPrataFranquias);
inputEventList(inputIndividualFranquias);
inputEventList(inputinputValoravistaIndividual);
inputEventList(inputValorAvistaPlanoOuro);
inputEventList(inputValorAvistaPlanoPrata);
inputEventList(inputValoravistaPlanoOuro);
inputEventList(inputValoravistaPlanoPrata);
inputEventList(inputValorAvistaIndividual);

inputCobertura(2);
inputCobertura(3);
inputCobertura(4);
inputCobertura(6);
inputCobertura(5);

inputPagamento(1);
inputPagamento(2);
inputPagamento(3);
inputPagamento(4);
inputPagamento(5);
inputPagamento(6);
inputPagamento(7);
inputPagamento(8);
inputPagamento(9);
inputPagamento(10);
inputPagamento(11);
inputPagamento(12);