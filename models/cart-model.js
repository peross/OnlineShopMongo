class Cart{
    constructor(items = [], totalQuantity = 0, totalPrice = 0){ //for first time user create cart it wil be empty
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
    }

    addItem(product){
        const cartItem = {
            product: product,
            quantity: 1,
            totalPrice: product.price
        };

        for(let i=0; i<this.items.length; i++){
            const item = this.items[i];
            if(item.product.id === product.id){
                //we can change const because we don't store the object or array, instead just the memory address (pointer) and that address hasn't change
                cartItem.quantity = +item.quantity + 1; //force conversion to number
                cartItem.totalPrice = item.totalPrice + product.price; 
                this.items[i] = cartItem;

                //increase quantity of already exists item
                this.totalQuantity++;
                this.totalPrice += product.price;
                return;
            }
        }
        this.items.push(cartItem);
        this.totalQuantity++;
        this.totalPrice += product.price;
        console.log(this.totalQuantity);
    }

    updateItem(productId, newQuantity){
        for(let i=0; i<this.items.length; i++){
            const item = this.items[i];
            if(item.product.id === productId && newQuantity > 0){
                //we can change const because we don't store the object or array, instead just the memory address (pointer) and that address hasn't change
                const cartItem = {...item}; //copy of the item found
                cartItem.quantity = newQuantity;
                const quantityChange = newQuantity - item.quantity;
                cartItem.totalPrice = newQuantity * item.product.price; 
                this.items[i] = cartItem;

                //increase quantity of already exists item
                this.totalQuantity = this.totalQuantity + quantityChange;
                this.totalPrice += quantityChange * item.product.price;
                return {updatedItemPrice: cartItem.totalPrice};
            } else if (item.product.id === productId && newQuantity <=0){
                this.items.splice(i, 1); //remove item from array by sprecifying the index of the item that should be removed

                this.totalQuantity = this.totalQuantity - item.quantity;
                this.totalPrice -= item.totalPrice;
                return {updatedItemPrice: 0};
            }
        }
    }
}

module.exports = Cart;