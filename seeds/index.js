
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const sample = array => array[Math.floor(Math.random() * array.length)];



const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6415bc25f84e460dea3a366e',  //YOUR USER ID
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dyan3gjyc/image/upload/v1680111086/YelpCamp/ysfptfxucjd4rhyiha9f.jpg',
                    filename: 'YelpCamp/ysfptfxucjd4rhyiha9f'
                },
                {
                    url: 'https://res.cloudinary.com/dyan3gjyc/image/upload/v1680111086/YelpCamp/c31ix32lqseskdkh6hjl.jpg',
                    filename: 'YelpCamp/c31ix32lqseskdkh6hjl'
                },
                {
                    url: 'https://res.cloudinary.com/dyan3gjyc/image/upload/v1680111087/YelpCamp/ygngl1ziuevrcezliawd.jpg',
                    filename: 'YelpCamp/ygngl1ziuevrcezliawd'
                }
            ],
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem dolores quisquam deserunt totam, voluptate unde sunt a. Molestias doloribus tempora, ea beatae fugit neque hic iste officiis similique odio eaque!",
            price
        });
        await camp.save();
    }

};
seedDB().then(() => {
    mongoose.connection.close();
})