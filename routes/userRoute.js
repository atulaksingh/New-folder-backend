const express = require("express")
const { handleUserSignup, handleUserLogin, handleUserChangePassword, handleUserLogout, handleUserPasswordResetByEmail, userPasswordReset } = require("../controllers/userController")
const checkAuth = require("../middlewares/auth-middlewares")
const router = express.Router();

//Route middleware to protect

router.use('/changepassword', checkAuth)
router.use('/logout', checkAuth)

//Public Routes

router.post("/register", handleUserSignup);
router.post("/login", handleUserLogin);
router.post("/reset-password-send-email", handleUserPasswordResetByEmail);
router.post("/userPasswordReset/:id/:token", userPasswordReset);
//Protected Routes

router.post("/changepassword", handleUserChangePassword);
router.get("/logout", handleUserLogout);



module.exports = router;

