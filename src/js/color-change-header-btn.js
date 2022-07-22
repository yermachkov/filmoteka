const refs = {
    headerButtons: document.querySelector('.header__buttons'),
}

refs.headerButtons.addEventListener('click', onHeaderBtnClick);

function onHeaderBtnClick(e){
    if(e.target.nodeName !== 'BUTTON'){
        return
    }

    const currentActivBtn = document.querySelector('.current__button');
    const nextActivBtn = e.target;
    
    if(currentActivBtn){
        currentActivBtn.classList.remove('current__button');
    }
    nextActivBtn.classList.add('current__button')
}