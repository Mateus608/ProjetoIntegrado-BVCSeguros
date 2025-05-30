// Obtendo todos os radio buttons com "checked" definido no HTML para o grupo "recomendado"
const radiosRecomendadosIniciais = document.querySelectorAll('input[type="radio"][name="recomendado"][checked]');

// Adicionando o evento de clique ao botão de limpar campos
document.querySelector('.btn-limpar-campos').addEventListener('click', function() {
    // Selecionando todos os inputs, selects e textarea dentro do formulário
    const formElements = document.querySelectorAll('input, select, textarea');

    formElements.forEach(function(element) {
        // Limpar os valores dos inputs
        if (element.type === 'checkbox') {
            element.checked = false; // Desmarca os checkboxes
        } else if (element.type === 'radio') {
            // Ignorar radio buttons com name "tipo-orcamento"
            if (element.name !== 'tipo-orcamento') {
                element.checked = false;
            }
        } else if (element.type === 'select-one') {
            element.selectedIndex = 0; // Limpar o select
        } else {
            element.value = ''; // Limpar os campos de texto e textarea
        }
    });

    // Restaurando os radio buttons "recomendado" ao estado inicial
    radiosRecomendadosIniciais.forEach(function(radio) {
        radio.checked = true;
    });
});
