import { formatPlaca } from "./functionCliente.js";
const placaVeiculo = document.getElementById('placa-veiculo');

inputEventList(placaVeiculo);

function inputEventList(input) {
    input.addEventListener('input', function () {
        formatPlaca(this);
    });
}