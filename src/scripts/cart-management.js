const addToCartBtn = document.getElementById('add-to-cart');
const cartBadge = document.querySelector('.badge');

async function addToCart(){
    const productId = addToCartBtn.dataset.productid;
    const csrfToken = addToCartBtn.dataset.csrf;
    let response; 

    try {
        response = await fetch('/cart/items', {
            method: 'post',
            body: JSON.stringify({
                productId: productId,
                _csrf: csrfToken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        alert('Nesto nije u redu');
        return;
    }

    if(!response.ok){
        alert('Nesto nije u redu');
        return;
    }

    const responseData = await response.json();
    const newTotalQuantity = responseData.newTotalItems;
    cartBadge.textContent = newTotalQuantity;
}

addToCartBtn.addEventListener('click', addToCart);