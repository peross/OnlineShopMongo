const menuTabs = document.querySelector('.menu-tabs');
const menuTabSection = document.querySelector('.menu-tab-content');

window.onload = () => {
    document.getElementById('defaultCategory').click();
}

function createProductsList(products){
    const productList = document.createDocumentFragment(); //create empty element!!
    for(const product of products){
        const productElement = document.createElement('div');
        productElement.className = 'menu-item';
        productElement.innerHTML = `
        
        <div class="menu-item-title">
            <h3>${product.name}</h3>
            
        </div>       
        <div class="menu-item-price">
            <p>${product.price} KM</p>
        </div>`;
    productList.appendChild(productElement);
    }

    return productList;
}

async function fetchCategory(e){
    if(e.target.classList.contains('menu-tab-item') && !e.target.classList.contains('active')){
        const categoryName = e.target.getAttribute('data-category');
        menuTabs.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
        
        // console.log(categoryName);

        const response = await fetch(`/products/${categoryName}`);
        const responseData = await response.json();

        // console.log(responseData);

        const productList = createProductsList(responseData);
        menuTabSection.innerHTML = '';
        menuTabSection.appendChild(productList);
    }
}

menuTabs.addEventListener('click', fetchCategory);