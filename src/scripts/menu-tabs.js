const menuTabs = document.querySelector('.menu-tabs');
const menuTabSection = document.querySelector('.menu-tab-content');
const searchCategory = document.getElementById('search');
const categoryBtns = document.querySelectorAll('.menu-tab-item');

window.onload = () => {
    document.getElementById('defaultCategory').click();
}

// function fetchCategory(e){
//     if(e.target.classList.contains('menu-tab-item') && !e.target.classList.contains('active')){
//         const categoryName = e.target.getAttribute('data-category');
//         menuTabs.querySelector('.active').classList.remove('active');
//         e.target.classList.add('active');

//         // console.log(categoryName);
//         searchCategory.value = 'Tekst';

//         const responseData = await response.json();

//         // console.log(responseData);
//     }
// }

function changeValue(o, e){
    if(e.target.classList.contains('menu-tab-item') && !e.target.classList.contains('active')){
    const categoryName = e.target.getAttribute('data-category');
    menuTabs.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');
    searchCategory.value = o.innerHTML;
    console.log(o.innerHTML);
}}

for(const categoryBtn of categoryBtns){
    categoryBtn.addEventListener('click', changeValue);
}