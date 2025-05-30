const tdVeiculoTableFranquias = document.getElementById('td-veiculo-table-franquias');
const tdVeiculoTableFranquiasIndividual = document.getElementById('td-veiculo-table-franquias-individual');
const nomeVeiculo = document.getElementById('nome-veiculo');
const idVeiculo = document.getElementById('id-veiculo');
const containerIdVeiculo = document.getElementById('p-id-veiculo');

nomeVeiculo.addEventListener('change', function() {
    var descricaoVeiculo = nomeVeiculo.value.toUpperCase();
    var nItem = idVeiculo.value;

    if (nomeVeiculo) {
        containerIdVeiculo.innerText = `Nº Item ${nItem}`;
        tdVeiculoTableFranquias.innerHTML = `<strong style="color: #8e0101";>${descricaoVeiculo}</strong>`;
        tdVeiculoTableFranquiasIndividual.innerHTML = `<strong style="color: #8e0101";>${descricaoVeiculo}</strong>`;
    }
});