// const asyncHandler = require('express-async-handler');
// const Notification = require('../models/notification');

// //@desc Get all notifications
// //@route GET /api/notification
// //@access Private
// const getNotifications = asyncHandler(async (req, res) => {
// });

// //@desc Get notification by ID
// //@route GET /api/notification/
// //@access Private
// const getNotification = asyncHandler(async (req, res) => {
// });

// //@desc Register notification
// //@route POST /api/notification
// //@access Public
// const createNotification = asyncHandler(async (req, res) => {
// });

// //@desc Update notification
// //@route PUT /api/notification/
// //@access Public
// const updateNotification = asyncHandler(async (req, res) => {
// });

// //@desc Delete notification
// //@route DELETE /api/notification/
// //@access Public
// const deleteNotification = asyncHandler(async (req, res) => {
// });

// module.exports = { getNotifications, getNotification, createNotification, updateNotification, deleteNotification };


const asyncHandler = require('express-async-handler');
const Notification = require('../models/notification');

//@desc Get all notifications for the logged-in user
//@route GET /api/notification
//@access Private
const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
});

//@desc Get a specific notification by ID
//@route GET /api/notification/:id
//@access Private
const getNotification = asyncHandler(async (req, res) => {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
        res.status(404);
        throw new Error('Notification not found');
    }

    if (notification.userId.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Access denied');
    }

    res.status(200).json(notification);
});

//@desc Create a new notification
//@route POST /api/notification
//@access Public
const createNotification = asyncHandler(async (req, res) => {
    const { userId, type, content, status } = req.body;

    // Validate required fields
    if (!userId || !type || !content) {
        res.status(400);
        throw new Error('Please provide all required fields: userId, type, content');
    }

    const notification = await Notification.create({
        userId,
        type,
        content,
        status: status || 'unread', // Defaults to 'unread' if not provided
    });

    res.status(201).json(notification);
});

//@desc Update a notification
//@route PUT /api/notification/:id
//@access Private
const updateNotification = asyncHandler(async (req, res) => {
    const { type, content, status } = req.body;

    const notification = await Notification.findById(req.params.id);

    if (!notification) {
        res.status(404);
        throw new Error('Notification not found');
    }

    if (notification.userId.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Access denied');
    }

    // Update fields if provided
    notification.type = type || notification.type;
    notification.content = content || notification.content;
    notification.status = status || notification.status;

    const updatedNotification = await notification.save();

    res.status(200).json(updatedNotification);
});

//@desc Delete a notification
//@route DELETE /api/notification/:id
//@access Private
const deleteNotification = asyncHandler(async (req, res) => {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
        res.status(404);
        throw new Error('Notification not found');
    }

    if (notification.userId.toString() !== req.user.id) {
        res.status(403);
        throw new Error('Access denied');
    }

    await notification.remove();

    res.status(200).json({ message: 'Notification deleted successfully' });
});

module.exports = {
    getNotifications,
    getNotification,
    createNotification,
    updateNotification,
    deleteNotification,
};
