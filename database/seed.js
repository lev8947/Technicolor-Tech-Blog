require('dotenv').config();
const Sequelize = require("sequelize");
const { faker } = require("@faker-js/faker");
const Post = require("../models/Post");
const { sequelize } = require("../models/User");
const User = require("../models/User");

async function seedUsers(num = 10) {

    for (let index = 0; index < num; index++) {
        const email = faker.internet.email();
        const password = faker.internet.password(8);

        await User.create({
            email,
            password,
        })
    }
}

async function seedPost(num = 10) {
    for (let index = 0; index < num; index++) {
        const title = faker.vehicle.vehicle();
        const content = faker.lorem.paragraph(2);

        const randomUsers = await User .findAll({ order: Sequelize.literal("rand()"), limit: 1});
        
        const user_id = randomUsers[0].id;
        

        await Post.create({
            title,
            content,
            user_id,
        })
    }
}


async function seed() {
    //seed users
    sequelize.sync({force: true}).then(async () => {
        
        await seedUsers(10);
        //seed post
        await seedPost()
    })

  
}

seed();