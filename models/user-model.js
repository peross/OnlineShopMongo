const db = require('../data/database');
const bcrypt = require('bcrypt');

class User {
    constructor(email, password, name, surname, street, postal, city){
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.street = street;
        this.postal = postal;
        this.city = city;
    }

    getUserWithSameEmail(){
        return db.getDb().collection('users').findOne({email: this.email});
    }

    async userExistsAlready(){
        const userExists = await this.getUserWithSameEmail();
        if(userExists){
            return true;
        } 
        return false;
    }

    comparePassword(hashedPassword){
        return bcrypt.compare(this.password, hashedPassword);
    }
    
    async signup(){
        const hashedPassword = await bcrypt.hash(this.password, 12);
        await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.name,
            surname: this.surname,
            street: this.street,
            postal: this.postal,
            city: this.city
        });
    }

    
}

module.exports = User;