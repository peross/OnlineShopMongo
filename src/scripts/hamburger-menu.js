const navToggler = document.querySelector('.nav-toggler');

navToggler.addEventListener('click', toggleNav);

function toggleNav(){
    navToggler.classList.toggle('active');
    document.querySelector('.nav').classList.toggle('open');
}

//close nav when click on nav item
document.addEventListener('click', (e) => {
    if(e.target.closest('.nav-item')){
        toggleNav();
    }
});

//sticky header
window.addEventListener('scroll', () => {
    // console.log(this.pageYOffse)
  if(this.scrollY > 60) {
      document.querySelector('.header').classList.add('sticky');
  } else {
      document.querySelector('header').classList.remove('sticky');
  }
});

