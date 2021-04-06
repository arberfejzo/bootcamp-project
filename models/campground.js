const mongoose = require('mongoose');
const Review = require('./review')
Schema = mongoose.Schema;

const ImageSchema = new mongoose.Schema({
    url: String,
    filename: String
})
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/t_media_lib_thumb');
})
const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema)

