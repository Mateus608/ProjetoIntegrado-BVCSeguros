import { customSwal } from "./alertasCustom.js";
document.querySelector('.btn-cancel').addEventListener('click', async function() {
    customSwal.fire({
        title: 'Atenção',
        text: 'Você tem certeza de que deseja cancelar esta operação? Esta ação não pode ser desfeita.',
        icon: 'warning',
        iconColor: '#01458e',
        showCancelButton: true,  // Mostra o botão de cancelar
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true // Inverte a ordem dos botões (Confirmar à esquerda)
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'http://127.0.0.1:3000/';
            
        } else if (result.isDismissed) {
            return;
        }
    });
});