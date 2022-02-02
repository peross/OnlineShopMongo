const db = require('../data/database');

class Product {
    constructor(productData){
        this.name = productData.name;
        this.description = productData.description;
        this.price = +productData.price; //force number
        this.category = productData.category;
        this.image = productData.image; //name of the image file
        this.imagePath = `product-data/images/menu/${productData.image}`;
        this.imageUrl = `/products/assets/images/menu/${productData.image}`;

        if(productData.product_id){
            this.id = productData.product_id;
        }
    }

    static async findAllProducts(){
        const product = await db.getDb().collection('products').find().toArray();
        return product.map((productDocument) => {
            return new Product(productDocument);
        });
    }

    async save() {
        const productData = {
            name: this.name,
            image: this.image,
            description: this.description,
            price: this.price,
            category: this.category
        };
        await db.getDb().collection('products').insertOne(productData);
    }
}

module.exports = Product;