import { customSwal } from "./alertasCustom.js";

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://127.0.0.1:4040/logs', {credentials: 'include'})
    .then(response => response.json())
    .then(data => {
      if (!data.success) throw new Error(data.message || 'Erro ao buscar logs');

      const tbody = document.getElementById('logs-tbody');
      tbody.innerHTML = ''; // Limpa o conteúdo antes de adicionar

      data.logs.forEach(log => {
        // Define a cor conforme o tipo
        let color;
        switch(log.tipo) {
          case 0: color = '#8e0101'; break;
          case 1: color = '#d15300'; break;
          case 2: color = '#01458e'; break;
          case 3: color = '#068e01'; break;
          default: color = '#dee200';
        }

        // Cria a linha e células
        const tr = document.createElement('tr');
        const td = document.createElement('td');

        // Ícone com cor dinâmica
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-square';
        icon.style.fontSize = '8px';
        icon.style.transform = 'translateY(-1.5px)';
        icon.style.color = color;

        td.appendChild(icon);
        td.appendChild(document.createTextNode(' ' + log.logMessage));
        tr.appendChild(td);
        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar logs:', error);
      // Aqui você pode mostrar uma mensagem de erro para o usuário
    });
});


// Função para contar as linhas da tabela
function contarLinhas() {
    // Acessa a tabela pelo ID
    var tabela = document.getElementById("table-orcamentos");
    // Conta o número de linhas no corpo da tabela (<tbody>)
    var linhas = tabela.getElementsByTagName("tr").length;
    // Exibe o número de linhas
    document.getElementById("qtd-users").innerText = "Logs do Sistema: " + (linhas - 1);
}

// Chama a função ao carregar a página
contarLinhas();

function limparDados() {
    fetch('http://127.0.0.1:4040/limparLogs', {
        method: 'DELETE', // trocado de POST para DELETE
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            customSwal.fire({
                title: 'Registros apagados',
                text: data.message,
                icon: 'success',
                iconColor: '#068e01'
            }).then(() => {
                window.location.reload();
            });
        } else {
            throw new Error(data.error || 'Erro desconhecido ao limpar os dados.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        customSwal.fire({
            title: 'Algo deu errado',
            text: error.message || 'Erro ao limpar os dados.',
            icon: 'error',
            iconColor: '#8e0101'
        });
    });
}

const btnClean = document.querySelector('.btn-clean');
btnClean.addEventListener('click', function () {
    customSwal.fire({
        title: 'Atenção',
        html: `Você tem certeza de que deseja apagar todos os dados de logs? Essa ação é irreversível e todos os registros serão permanentemente excluídos.`,
        icon: 'warning',
        iconColor: '#01458e',
        showCancelButton: true,  // Mostra o botão de cancelar
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true // Inverte a ordem dos botões (Confirmar à esquerda)
    }).then((result) => {
        if (result.isConfirmed) {
            limparDados();
        } else if (result.isDismissed) {
            return;
        }
    });
});

document.getElementById('img-pdf').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;  // Desestruturação para obter jsPDF
    const doc = new jsPDF();

    // Definindo margens
    const marginLeft = 10;
    const marginTop = 10;
    const marginRight = 10;
    const pageHeight = doc.internal.pageSize.height;

    // Adiciona título ao PDF com a margem
    doc.text('Logs de Usuário', marginLeft, marginTop);

    // Definindo o tamanho da fonte (por exemplo, 10 pontos)
    const fontSize = 10;
    doc.setFontSize(fontSize);  // Definindo o tamanho da fonte para 10

    // Coleta os dados da tabela
    const table = document.getElementById('table-orcamentos');
    const rows = table.getElementsByTagName('tr');

    // Começa a escrever a tabela no PDF com margens e ajustando o Y
    let y = marginTop + 10; // Posição Y inicial com margem
    const lineHeight = fontSize * 1.2;  // Define a altura da linha com base no tamanho da fonte

    for (let i = 1; i < rows.length; i++) {  // Começa de 1 para ignorar o cabeçalho
        const cells = rows[i].getElementsByTagName('td');
        const message = cells[0].innerText; // Agora só pegamos a mensagem

        // Quebra de linha automaticamente se o texto for muito longo
        const splitMessage = doc.splitTextToSize(message, doc.internal.pageSize.width - marginLeft - marginRight);

        // Se não couber na página, quebra a página
        if (y + (splitMessage.length * lineHeight) > pageHeight - marginTop) {
            doc.addPage(); // Cria uma nova página
            y = marginTop; // Reseta a posição Y para o topo da nova página
        }

        // Adiciona o texto ao PDF
        doc.text(splitMessage, marginLeft, y);
        y += lineHeight; // Ajusta a distância entre as linhas
    }

    // Salva o PDF gerado
    doc.save('logs_usuario.pdf');
});
