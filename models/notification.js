// const mongoose = require('mongoose');

// // Define the schema for Notification
// const notificationSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     type: { type: String },
//     content: { type: String },
//     timestamp: { type: Date },
//     status: { type: String }
// });

// const Notification = mongoose.model('Notification', notificationSchema);

// module.exports = Notification;
const mongoose = require('mongoose');

// Define the schema for Notification
const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true, // Ensures every notification is linked to a user
        },
        type: {
            type: String,
            enum: ['info', 'warning', 'success'], // Restricts to specific types
            required: true, // Ensures type is always provided
            default: 'info', // Defaults to 'info' if not specified
        },
        content: {
            type: String,
            required: [true, 'Content is required'], // Ensures every notification has content
        },
        status: {
            type: String,
            enum: ['read', 'unread'], // Restricts to 'read' or 'unread'
            default: 'unread', // Defaults to 'unread'
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
