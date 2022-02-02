const db = require('../data/database');

class Category {
    constructor(name){
        this.name = name;
    }

    static async getAllCategorys(){
        const category = await db.getDb().collection('category').find().toArray();
        return category;
    }
}

module.exports = Category;