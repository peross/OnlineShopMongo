const updateOrderForms = document.querySelectorAll('.order-actions form');
const orderBadge = document.querySelector('.order-badge');

async function updateOrder(e){
    e.preventDefault(); //prevetn automaticly send HTTP request by browser
    const orderForm = e.target;

    const formData = new FormData(orderForm);
    const newStatus = formData.get('status');
    const orderId = formData.get('orderid');
    const csrfToken = formData.get('_csrf');

    let response;

    try {
        response = await fetch(`/admin/orders/${orderId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                newStatus: newStatus,
                _csrf: csrfToken
            }),
            headers: {
                'Content-Type': 'application/json',
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
    
    const responseData = await response.json();

    orderForm.parentElement.parentElement.querySelector('.order-badge').textContent = responseData.newStatus.toUpperCase();

    // orderBadge.textContent = responseData.newStatus.toUpperCase();
}

for(const updateOrderForm of updateOrderForms){
    updateOrderForm.addEventListener('submit', updateOrder);
}