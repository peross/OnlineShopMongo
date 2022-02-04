const deleteProductBtns = document.querySelectorAll('.menu-item button');

async function deleteProduct(e){
    const button = e.target;
    const productId = button.dataset.productid;
    const csrfToken = button.dataset.csrf;

    const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrfToken, {
         method: 'DELETE',
     });

     if(!response.ok){
         alert('Nesto nije u redu');
         return;
     }

     button.parentElement.parentElement.remove();
}

for(const deleteProductBtn of deleteProductBtns){
    deleteProductBtn.addEventListener('click', deleteProduct);
}