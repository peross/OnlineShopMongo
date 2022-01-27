const menuTabs = document.querySelector('.menu-tabs');

menuTabs.addEventListener('click', (e) => {
    if(e.target.classList.contains('menu-tab-item') && !e.target.classList.contains('active')){
        const target = e.target.getAttribute('data-target');
        menuTabs.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
        console.log(target);
    }
});