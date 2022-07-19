const refs = {
    openFooterModal: document.querySelector('[data-action="open-modal"]'),
    closeFooterModal: document.querySelector('[data-action="close-modal"]'),
    // footerModal: document.querySelector('.footer__modal'),
    footerModalOverlay: document.querySelector('.footer__modal-overlay')
};

refs.openFooterModal.addEventListener('click', onOpenModal);
refs.closeFooterModal.addEventListener('click', onCloseModal);
refs.footerModalOverlay.addEventListener('click', onOverlayClick);

function onOpenModal() {
    window.addEventListener('keydown',onEscKeyPress);
    refs.footerModalOverlay.classList.remove('is-hidden-footer');     
}

function onCloseModal() {
    window.removeEventListener('keydown',onEscKeyPress);
    refs.footerModalOverlay.classList.add('is-hidden-footer');    
}

function onOverlayClick(event) {
    if (event.currentTarget === event.target) {
        onCloseModal();
    }
}

function onEscKeyPress(event) {
    if (event.code === 'Escape') {
        onCloseModal();
    }
}