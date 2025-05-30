const customSwal = Swal.mixin({
    confirmButtonText: 'OK',
    confirmButtonColor: '#01458e', // Cor do botão
    background: '#f4f4f4', // Cor de fundo do alerta
    color: '#333333', // Cor do texto
    titleTextColor: '#000000', // Cor do título
    customClass: {
        popup: 'custom-popup',
        title: 'custom-title',
        confirmButton: 'custom-confirm-button',
        icon: 'icon'
    }
});

export {customSwal};