const db = require('../data/database');
const mongodb = require('mongodb');

class Product {
    constructor(productData){
        this.name = productData.name;
        this.description = productData.description;
        this.price = +productData.price; //force number
        this.category = productData.category;
        this.image = productData.image; //name of the image file
        this.imagePath = `product-data/images/menu/${productData.image}`;
        this.imageUrl = `/products/assets/images/menu/${productData.image}`; 

        if(productData._id){
            this.id = productData._id.toString();
        }
    }

    static async findProductById(productId){
        let prodId;
        try {
            prodId = new mongodb.ObjectId(productId);
        } catch (error) {
            error.code = 404;
            throw error;
        }

        const product = await db.getDb().collection('products').findOne({_id: prodId});

        console.log(product);

        if(!product) {
            const error = new Error('Nije moguće pronaći proizvod sa datim id-om');
            error.code = 404;
            throw error;
        }

        return new Product(product);
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