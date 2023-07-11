const express = require("express");
const userController = require("../controllers/user-controller");
const Payment = require("../controllers/Strippayment");
const forgetpassword = require("../controllers/ForgetPassword");
const router = express.Router();
const Expo = require("../controllers/Expo-notifications");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Invalid Image Format", false);
  }
};
const fileSizeLimitErrorHandler = (err, req, res, next) => {
  if (err) {
    res.send("File size limit exceeded");
  } else {
    next();
  }
};

const uploads = multer({ storage, fileFilter, limits: { fileSize: 2000000 } });
cloudinary.config({
  cloud_name: "dcnvkgagc",
  api_key: "882522274499356",
  api_secret: "bD6JshvSy3S0loIwA-aTESxPg08",
});
router.post("/Registration", userController.addUser);
router.post("/SignIn", userController.signIn);
router.post(
  "/UploadImage",
  uploads.single("profile"),
  fileSizeLimitErrorHandler,
  userController.uploadimage
);
router.patch("/Update/:id", userController.Update);
router.get("/Userinfo/:id", userController.getuserbyemail);
router.get("/getusers", userController.findallusers);
router.post("/addteam", userController.addTeam);
router.get("/getteams", userController.getallteams);
router.get("/teaminfo/:id", userController.getteambyid);
router.delete("/deleteteam/:id", userController.deleteitem);
router.post("/addpost", userController.addpost);
router.get("/getposts", userController.getallposts);
router.get("/postinfo/:id", userController.getpostbyid);
router.patch("/updatepost/:id", userController.updatepost);
router.get("/getpostbyuserid/:id", userController.getpostbyemail);
router.delete("/deletepost/:id", userController.deletepost);
router.get("/getpostapproved/:id", userController.getapprovedpost);
router.get("/getteambyemail/:email", userController.getteambyemail);
router.post("/Addrecentdonnor", userController.addrecentdonner);
router.get("/getdonnorhistorybyid/:id", userController.getDonationsbyid);
router.post("/Addpendingrequest", userController.AddpendingRequest);
router.get("/getpendingrequest", userController.getallpendingRequest);
router.post("/Addnotification", userController.Addnotification);
router.get("/getnotificationbyid/:id", userController.gettnotificationbyid);
router.delete("/deletenotification/:id", userController.deleteNotification);
router.post("/create-payment-intent", Payment.paymment_intent);
router.get("/getreccentdonnor", userController.gettallrecentdonner);
router.get("/getallpendingrequest", userController.getallpendingRequest);
router.delete("/detetheteam/:id", userController.deletethteam);
router.get("/getuserbyemailid/:email", forgetpassword.finduserbyemail);
router.post("/verifyemail/:email", forgetpassword.VerifyEmail);
router.get("/Verifycode/:UniqueString", forgetpassword.VerifyCode);
router.patch("/Newpassword/:id/:password", forgetpassword.NewPassword);
router.get("/getalldata", userController.gettalldata);
router.post("/Sendnotification", Expo.sendNotification);
router.delete("/deleterequest/:id", userController.delelependingRequest);

module.exports = router;
