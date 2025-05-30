window.onload = function() {
    // Obtendo a data atual
    let dataAtual = new Date();

    // Obtendo o dia, mês e ano
    let dia = String(dataAtual.getDate()).padStart(2, '0');  // Garante que o dia tenha 2 dígitos
    let mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Meses começam do zero, então adicionamos 1
    let ano = dataAtual.getFullYear();

    // Formatando a data no padrão dd/mm/aaaa
    let dataFormatada = `${dia}/${mes}/${ano}`;

    // Atribuindo a data formatada ao campo de input
    var dataInput = document.getElementById('input-data');
    dataInput.value = dataFormatada;  // Usando value para input
};
