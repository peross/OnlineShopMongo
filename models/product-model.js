const db = require('../data/database');
const mongodb = require('mongodb');

class Product {
    constructor(productData){
        this.name = productData.name;
        this.description = productData.description;
        this.price = +productData.price; //force number
        this.category = productData.category;
        this.image = productData.image; //name of the image file
        this.updateImageData();

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

        
        if(!product) {
            const error = new Error('Nije moguće pronaći proizvod sa datim id-om');
            error.code = 404;
            throw error;
        }
        
        console.log(product);
        return new Product(product);
    }

    static async findAllProducts(){
        const product = await db.getDb().collection('products').find().toArray();
        return product.map((productDocument) => {
            return new Product(productDocument);
        });
    }

    updateImageData(){
        this.imagePath = `product-data/images/menu/${this.image}`;
        this.imageUrl = `/products/assets/images/menu/${this.image}`; 
    }

    async save() {
        const productData = {
            name: this.name,
            image: this.image,
            description: this.description,
            price: this.price,
            category: this.category
        };

        if(this.id){
            const productId = new mongodb.ObjectId(this.id);
            if(!this.image){
                delete productData.image; 
            }
            await db.getDb().collection('products').updateOne({_id: productId}, {
                $set: productData
            });
        } else{
            await db.getDb().collection('products').insertOne(productData);
        }
    }

    async replaceImage(newImage){
        this.image = newImage;
        this.updateImageData();
    }
}

module.exports = Product;