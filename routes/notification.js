// const express = require('express');
// const router = express.Router();
// const {getNotifications, getNotification, createNotification, updateNotification, deleteNotification} = require('../controllers/notificationController');
// const validateToken = require('../middleware/validateTokenHandler');

// router.use(validateToken);

// router.get('/all', getNotifications);
// router.get('/', getNotification);
// router.post('/', createNotification);
// router.put('/', updateNotification);
// router.delete('/', deleteNotification);

// module.exports = router;


const express = require('express');
const router = express.Router();
const {
    getNotifications,
    getNotification,
    createNotification,
    updateNotification,
    deleteNotification,
} = require('../controllers/notificationController');
const validateToken = require('../middleware/validateTokenHandler');

// Apply the validateToken middleware globally to protect all routes
router.use(validateToken);

// Routes
router.route('/')
    .get(getNotifications) // Fetch all notifications
    .post(createNotification); // Create a notification

router.route('/:id')
    .get(getNotification) // Fetch a specific notification
    .put(updateNotification) // Update a specific notification
    .delete(deleteNotification); // Delete a specific notification

module.exports = router;
