const db = require('../data/database');

class Product {
    constructor(productData){
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price; //force number
        this.description = productData.description;
        this.image = productData.image; //name of the image file

        if(productData.product_id){
            this.id = productData.product_id;
        }
    }

    static async findAllProducts(categoryName){
        const product = await db.getDb().collection('products').find({category: categoryName}).toArray();
        return product.map((productDocument) => {
            return new Product(productDocument);
        });
    }
}

module.exports = Product;