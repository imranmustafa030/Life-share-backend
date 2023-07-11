const userSchema = require("../Models/Registermodel");
const nodemailer = require("nodemailer");
const VerifiedEmail = require("../Models/VerifyEmail");
const bcrypt = require("bcrypt");

const finduserbyemail = async (req, res) => {
  const { email } = req.params;
  userSchema
    .find({
      email: email,
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
exports.finduserbyemail = finduserbyemail;

const VerifyEmail = async (req, res) => {
  const { email } = req.params;
  const UniqueString = randomstring();
  Sendemail(email, UniqueString, res);
};

exports.VerifyEmail = VerifyEmail;
const randomstring = () => {
  var text = "";
  var possible = "0123456789";

  for (var i = 0; i < 4; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};
const Sendemail = async (email, UniqueStrings, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: "tech.basit23@gmail.com",
      pass: "qxejqkhkzllknbzs",
    },
  });

  var mailOptions;
  let sender = "LifeShare";
  mailOptions = {
    from: sender,
    to: email,
    subject: "LifeShare Verification Code",
    text: "Your Verification Code is: " + UniqueStrings,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400).json(error);
    } else {
      const verifyemail = new VerifiedEmail({
        email: email,
        UniqueString: UniqueStrings,
      });
      verifyemail
        .save()
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    }
  });
};

const VerifyCode = async (req, res) => {
  const { UniqueString } = req.params;
  const user = await VerifiedEmail.find({
    UniqueString: UniqueString,
  });
  if (user.length > 0) {
    await VerifiedEmail.deleteOne({
      UniqueString: UniqueString,
    })
      .then((data) => {
        res.json({ message: "UserDeleted" });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(400).json("Invalid Code");
  }
};
exports.VerifyCode = VerifyCode;

const NewPassword = async (req, res) => {
  const { id, password } = req.params;
  const hash = await bcrypt.hash(password, 8);
  userSchema
    .updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: hash,
        },
      }
    )
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
exports.NewPassword = NewPassword;
