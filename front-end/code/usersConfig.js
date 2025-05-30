 async function carregarUsuarios() {
        try {
            const response = await fetch('http://127.0.0.1:4040/users', {
               credentials: 'include'
            });
            const data = await response.json();

            if (!data.success) {
                console.error('Erro ao buscar usuários:', data.message);
                return;
            }

            const tabela = document.getElementById('corpo-tabela-usuarios');
            tabela.innerHTML = ''; // limpa a tabela

            data.values.forEach(user => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>
                        <img 
                            src="http://localhost:3000/icon-remove.png" 
                            alt="icon" 
                            style="cursor: pointer;" 
                            class="delete-btn" 
                            data-id="${user.idusers}" 
                            data-usuario="${user.usuario}">
                    </td>
                    <td>${user.codigo}</td>
                    <td>${user.usuario}</td>
                    <td>${user.tipo}</td>
                `;
                tabela.appendChild(tr);
            });

        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        }
    }

    // Chama a função ao carregar a página
    window.onload = carregarUsuarios;
 
 // Função para contar as linhas da tabela
 function contarLinhas() {
    // Acessa a tabela pelo ID
    var tabela = document.getElementById("table-orcamentos");
    // Conta o número de linhas no corpo da tabela (<tbody>)
    var linhas = tabela.getElementsByTagName("tr").length;
    // Exibe o número de linhas
    document.getElementById("qtd-users").innerText = "Usuários Cadastrados: " + (linhas - 1);
}

// Chama a função ao carregar a página
setTimeout(() => {
  contarLinhas();
  }, 100);

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-btn')) {
    const button = e.target;
    const userId = button.getAttribute('data-id');
    const usuario = button.getAttribute('data-usuario');

    if (confirm(`Tem certeza que deseja excluir o usuário ${usuario}?`)) {
      fetch(`http://127.0.0.1:4040/user/${userId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Usuário excluído com sucesso.");
          button.closest('tr').remove();
        } else if (data.message) {
          alert(`Erro: ${data.message}`);
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        alert(`Erro: ${error.message || 'Ocorreu um erro desconhecido.'}`);
      });
    }
  }
});
