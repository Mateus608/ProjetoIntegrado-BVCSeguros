import { customSwal } from "./alertasCustom.js";

const passwordInput = document.getElementById('passwd');
const togglePasswordButton = document.getElementById('togglePassword');
const togglePasswordCloseButton = document.getElementById('togglePasswordClose');

// Adicione um evento de clique para alternar a visibilidade da senha
togglePasswordButton.addEventListener('click', function () {
    passwordInput.type = 'text';

    togglePasswordButton.style.display = 'none';
    togglePasswordCloseButton.style.display = 'inline';
});

togglePasswordCloseButton.addEventListener('click', function () {
    passwordInput.type = 'password';

    togglePasswordCloseButton.style.display = 'none';
    togglePasswordButton.style.display = 'inline';
});

function validateForm() {
    const idUser = document.getElementById('id-user');
    if (!idUser.value) {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Por favor, insira o id do usuário.',
            icon: 'info',
            iconColor: '#01458e'
        });
        return false; // Interrompe a execução da função se o campo não estiver preenchido
    }

    const userName = document.getElementById('usuario');
    if (!userName.value) {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Por favor, insira o usuário.',
            icon: 'info',
            iconColor: '#01458e'
        });
        return false; // Interrompe a execução da função se o campo não estiver preenchido
    } else if (userName.value.length < 4) {
        customSwal.fire({
            title: 'Usuário muito curto',
            text: 'O Usuário deve ter pelo menos 4 caracteres.',
            icon: 'info',
            iconColor: '#01458e'
        });
        return false; // Interrompe a execução da função se o nome de usuário for muito curto
    }

    const userNome = document.getElementById('nome-user');
    if (!userNome.value) {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Por favor, insira o nome do usuário.',
            icon: 'info',
            iconColor: '#01458e'
        });
        return false; // Interrompe a execução da função se o campo não estiver preenchido
    } else if (userNome.value.length < 4) {
        customSwal.fire({
            title: 'Nome de usuário muito curto',
            text: 'O nome de usuário deve ter pelo menos 4 caracteres.',
            icon: 'info',
            iconColor: '#01458e'
        });
        return false; // Interrompe a execução da função se o nome de usuário for muito curto
    }

    const passwd = document.getElementById('passwd');
    if (!passwd.value) {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Por favor, insira a senha do usuário.',
            icon: 'info',
            iconColor: '#01458e'
        });
        return false; // Interrompe a execução da função se o campo não estiver preenchido
    } else if (passwd.value.length < 4) {
        customSwal.fire({
            title: 'Senha muito curta',
            text: 'A senha deve ter pelo menos 4 caracteres.',
            icon: 'info',
            iconColor: '#01458e'
        });
        return false; // Interrompe a execução da função se a senha for muito curta
    }

    var tipoUser = document.querySelector('input[name="tipo_user"]:checked');
    if (!tipoUser) {
        customSwal.fire({
            title: 'Campo Obrigatório',
            text: 'Por favor, selecione o tipo de usuário.',
            icon: 'info',
            iconColor: '#01458e'
        });
        return false; // Interrompe a execução da função se nenhum tipo de usuário for selecionado
    }

    // Caso todos os campos sejam válidos, retorna true
    return true;
}

function addUser() {
    const usuario = document.getElementById('usuario').value;
    const nome = document.getElementById('nome-user').value;
    const passwd = document.getElementById('passwd').value;
    const codigo = document.getElementById('id-user').value;  // código do usuário
    const tipoRadio = document.querySelector('input[name="tipo_user"]:checked');
    const tipo = tipoRadio ? tipoRadio.value : null;

    fetch('http://127.0.0.1:4040/user', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, nome, passwd, codigo, tipo })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Erro desconhecido');
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            customSwal.fire({
                title: 'Usuário Adicionado',
                text: data.message,
                icon: 'success',
                iconColor: '#068e01'
            }).then(() => {
                // limpa campos
                document.getElementById('usuario').value = '';
                document.getElementById('nome-user').value = '';
                document.getElementById('passwd').value = '';
                document.getElementById('id-user').value = '';
                if (tipoRadio) tipoRadio.checked = false;

                window.location.reload();
            });
        } else {
            // Caso retorne sucesso false, exibe mensagem de erro
            throw new Error(data.message || 'Erro ao adicionar usuário');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        customSwal.fire({
            title: 'Erro ao adicionar usuário',
            text: error.message,
            icon: 'error',
            iconColor: '#8e0101'
        });
    });
}

const btnSubmit = document.querySelector('.btn-submit');

btnSubmit.addEventListener('click', function (e) {
    e.preventDefault(); // Previne o envio do formulário
    if (validateForm()) { // Se a validação passar, chama a função addUser
        addUser();
    };
});


const btnCancelar = document.querySelector('.btn-cancelar');

btnCancelar.addEventListener('click', function () {
    if (confirm("Você tem certeza de que deseja cancelar?")) {
        window.location.href = 'http://127.0.0.1:3000/users';
    };
})