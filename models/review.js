// const mongoose = require('mongoose');

// const reviewSchema = new mongoose.Schema({
//     bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
//     ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     machineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine' },
//     rating: { type: Number },
//     comment: { type: String }
// });

// const Review = mongoose.model('Review', reviewSchema);

// module.exports = Review;


const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    machineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
