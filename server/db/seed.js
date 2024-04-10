const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function seed() {
    console.log("Seeding the database.");
    try {
        await prisma.$connect();


        await prisma.user.create({
            data:{
                email: faker.internet.email(),
                username: faker.internet.userName(),
                password: faker.internet.password(),
            },
        })
          
        console.log('user has been created');


        const users = 
            await Promise.all([
                prisma.user.create({ email: "diane12@email.com", username: "diane12", password: "password1"}),
                prisma.user.create({ email: "alex21@email.com", username: "alex21", password: "password2"}),
                prisma.user.create({ email: "tom99@email.com", username: "tom99", password: "password3"})
            ]);

        console.log("Users created:", users);

        const items = 
            await Promise.all([
                prisma.item.create({ name: "tshirt", rating: 3.5 }),
                prisma.item.create({ name: "jeans", rating: 5.0 }),
                prisma.item.create({ name: "blouse", rating: 1.0 })
            ]);
        console.log("Items created:", items);

        const userReviews = await Promise.all([
            prisma.review.create({ userId: diane.id, itemId: tshirt.id, comment: "Soft tshirt, a staple piece.", rating: 3.5 }),
            prisma.review.create({ userId: alex.id, itemId: jeans.id, comment: "Very good quality!", rating: 5.0 }),
            prisma.review.create({ userId: tom.id, itemId: blouse.id, comment: "Horrible, the quality feels so cheap!", rating: 1.0 })
        ]);
        console.log("Reviews created:", userReviews);


        const fetchUsers = await prisma.user.findMany();
        const fetchItems = await prisma.item.findMany();
        const fetchUserReviews = await prisma.review.findMany();

        console.log("Fetched Users", fetchUsers);
        console.log("Fetched Items", fetchItems);
        console.log("Fetched User Reviews", fetchUserReviews);


    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}