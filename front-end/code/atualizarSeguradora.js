// Obtém o elemento select e todos os elementos com a classe "title-table-seguradora"
var selectSeguradora = document.getElementById('select-seguradora');
var selectSeguradora2 = document.getElementById('select-seguradora-2');
var uiSeguradora = document.getElementsByClassName('p-title-table-seguradora');
var uiSeguradora2 = document.getElementsByClassName('p-title-table-seguradora2');

// Adiciona um ouvinte de evento para quando o valor do select mudar
selectSeguradora.addEventListener('change', function() {
    // Obtém o valor selecionado
    var seguradoraSelecionada = selectSeguradora.value;

    // Verifica se algo foi selecionado
    if (!seguradoraSelecionada) {
        alert('Por favor, selecione a seguradora.');
    } else {
        // Itera sobre todos os elementos com a classe "title-table-seguradora" e atualiza o conteúdo
        for (var i = 0; i < uiSeguradora.length; i++) {
            uiSeguradora[i].innerHTML = seguradoraSelecionada;
        }
    }
});