function loader(){
    document.querySelector('.loader').classList.add('fade-out');
}

function fadeOut(){
    setInterval(loader, 1500);
}

window.onload = fadeOut;