const cartItemUpdateFormElements = document.querySelectorAll('.cart-item-management');
const cartItemTotalPriceElement = document.querySelector('.cart-item-total');
const cartTotalPriceElement = document.querySelector('.cart-total-price');
const cartBadge = document.querySelector('.badge');
const deleteBtnElement = document.getElementById('delete');

async function updateCartItem(e){
    e.preventDefault();

    const cartForm = e.target;
    const productId =  cartForm.dataset.productid;
    const csrfToken = cartForm.dataset.csrf;
    const quantity = cartForm.firstElementChild.value;

    let response;
    try {
        response = await fetch('/cart/items', {
            method: 'PATCH',
            body: JSON.stringify({
                productId: productId,
                quantity: quantity,
                _csrf: csrfToken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })   
    } catch (error) {
        alert('Nesto nije u redu');
        return;
    }

    if(!response.ok){
        alert('Nesto nije u redu');
        return;
    }

    const responseData = await response.json(); //extract data

    //delete item
    if(responseData.updateCartData.updatedItemPrice === 0){
        cartForm.parentElement.parentElement.remove();
    } else {
        //update cart quantity
        cartItemTotalPriceElement.textContent = responseData.updateCartData.updatedItemPrice.toFixed(2);
    }
    
    cartTotalPriceElement.textContent = responseData.updateCartData.newTotalPrice.toFixed(2);
    cartBadge.textContent = responseData.updateCartData.newTotalQuantity;
}

function deleteItem(){
    cartForm.parentElement.parentElement.remove();
}

for(const cartItemFormElement of cartItemUpdateFormElements){
    cartItemFormElement.addEventListener('submit', updateCartItem);
}