let modalToggles = document.querySelectorAll('[data-toggle-modal]');

modalToggles.forEach(function(button) {
    let modalSelector = button.dataset.toggleModal;
    let modal = document.querySelector(modalSelector);
    let modalBody = modal.querySelector('.modal-body');
    let closeBtn = modal.querySelector('.close');

    button.addEventListener('click', function(event) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        event.preventDefault();
        event.stopPropagation();
    });

    let closeModal = function() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    if(closeBtn) {
        closeBtn.addEventListener('click', function(event) {
            event.preventDefault();
            closeModal();
        });
    }

    if(modalBody) {
        modalBody.addEventListener('click', function(event){
            event.stopPropagation();
        });

        window.addEventListener('click', function(event) {
            // console.log('closing Modal');
            event.preventDefault();
            closeModal();
        });
    }
});