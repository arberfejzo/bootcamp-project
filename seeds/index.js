const mongoose = require('mongoose');
const cities = require('./cities');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log('db connection success')
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 100) + 50;
        const camp = new Campground({
            author: '600860fcd6c68f2c2455e58d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/davs25jwm/image/upload/v1611455940/YelpCamp/tcrhculturtjoo2vrczu.jpg',
                    filename: 'YelpCamp/tcrhculturtjoo2vrczu'
                },
                {
                    url: 'https://res.cloudinary.com/davs25jwm/image/upload/v1611455938/YelpCamp/vcuolgfvtjqhmol5v4ag.jpg',
                    filename: 'YelpCamp/vcuolgfvtjqhmol5v4ag'
                },
                {
                    url: 'https://res.cloudinary.com/davs25jwm/image/upload/v1611455938/YelpCamp/a76bjmey6wxcdw6qmfh7.jpg',
                    filename: 'YelpCamp/a76bjmey6wxcdw6qmfh7'
                }
            ],
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem enim consequatur soluta sed odio accusantium repellat, delectus, nostrum ut aliquid incidunt natus inventore veniam iste at ab veritatis modi iusto.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})