const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');
const checkUserAuth = require('../middlewares/auth-middleware.js');
const app = express();
const path = require('path');
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../views/index.html');
    res.sendFile(filePath);
  });
// Route Level Middleware - To Protect Route
router.use('/changepassword', checkUserAuth);
router.use('/loggeduser', checkUserAuth);

// Public Routes
router.post('/register', UserController.userRegistration);
router.post('/login', UserController.userLogin);
router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail);
router.post('/reset-password/:id/:token', UserController.userPasswordReset);

// Protected Routes
router.post('/changepassword', UserController.changeUserPassword);
router.get('/loggeduser', UserController.loggedUser);

module.exports = router;
