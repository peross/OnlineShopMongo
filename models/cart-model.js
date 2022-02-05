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
                cartItem.quantity += 1;
                cartItem.totalPrice += product.price; 
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
}

module.exports = Cart;