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
        const query = `SELECT products.title, products.summary, products.cijena, products.image, category.name FROM products INNER JOIN category ON products.category_id = category.category_id WHERE category.name = (?)`;

        const [products] = await db.query(query, categoryName);

        return products;
        // return products.map((productDocument) => {
        //     return new Product(productDocument);
        // });
    }

    static async getCategoty(categoryName){
        const query = `SELECT products.title, products.summary, products.cijena, products.image, category.name FROM products INNER JOIN category ON products.category_id = category.category_id WHERE category.name = (?)`;

        const [products] = await db.query(query, categoryName);

        return products;
        // return products.map((productDocument) => {
        //     return new Product(productDocument);
        // });
    }
}

module.exports = Product;