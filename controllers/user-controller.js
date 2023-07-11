const userSchema = require("../Models/Registermodel");
const bcrypt = require("bcrypt");
const Error = require("../Models/Errror");
const jwt = require("jsonwebtoken");
const e = require("express");
const Teammodule = require("../Models/Team");
const cloudinary = require("cloudinary").v2;
const Post = require("../Models/Post");
const RecentDonations = require("../Models/RecentDonations");
const Pendingrequests = require("../Models/Pendingrequest");
const Notifications = require("../Models/Notifications");
const Exponotification = require("./Expo-notifications");

cloudinary.config({
  cloud_name: "dcnvkgagc",
  api_key: "882522274499356",
  api_secret: "bD6JshvSy3S0loIwA-aTESxPg08",
});

const Signin = async (req, res, next) => {
  const {
    _id,
    email,
    password,
    name,
    pictrue,
    age,
    gender,
    city,
    country,
    phonenumber,
    bloodgroup,
    lifesaved,
    Rank,
    long,
    lat,
    Status,
    lastbleed,
    token,
  } = req.body;
  //res.send(name + id);
  console.log("h");
  let doesEmailExist;

  try {
    doesEmailExist = await userSchema.findOne({ email });
  } catch (error) {}

  if (doesEmailExist) {
    const err = new Error("Email", 400);
    return res.json({ message: "UserAlreadyExist" });
  }

  const newUser = new userSchema({
    email: email,
    password: password,
    name: name,
    pictrue: pictrue,
    age: age,

    gender: gender,
    city: city,
    country: country,
    phonenumber: phonenumber,
    bloodgroup: bloodgroup,

    lifesaved: lifesaved,
    Rank: Rank,
    long: long,
    lat: lat,
    Status: Status,
    lastbleed: lastbleed,
    token: token,
  });

  await newUser.save();

  res.json({ message: newUser });
  console.log("user created");
};

exports.addUser = addUser;
const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) return res.json({ success: false, message: "User Not Found !" });
  const Ismatched = await user.camparePassword(password);
  if (!Ismatched)
    return res.json({
      success: false,
      message: "email/password does not matched",
    });
  const token = jwt.sign({ userid: user._id }, process.env.JwtScret, {
    expiresIn: "1d",
  });
  res.json({ success: true, user, token });
};
exports.signIn = signIn;

const uploadimage = async (req, res, next) => {
  const result = await cloudinary.uploader.upload(
    req.file.path,
    async (err, result) => {
      const response = await result;
      if (!response) return res.json(err.message);
      return response;
    }
  );

  res.json(result);
  console.log(result);
};

exports.uploadimage = uploadimage;
const getuserbyemail = async (req, res, next) => {
  var user_id = req.params.id;
  userSchema
    .findById(user_id)
    .lean()
    .exec(function (err, results) {
      if (err) return console.error(err);
      try {
        res.json({ success: true, results });
      } catch (error) {
        console.log("errror getting results");
        console.log(error);
      }
    });
};
exports.getuserbyemail = getuserbyemail;

const Update = async (req, res, next) => {
  const {
    _id,
    email,
    password,
    name,
    pictrue,
    age,
    gender,
    city,
    country,
    phonenumber,
    bloodgroup,
    lifesaved,
    Rank,
    long,
    lat,
    Status,
    lastbleed,
    token,
  } = req.body;
  var user_id = req.params.id;
  userSchema.findByIdAndUpdate(
    user_id,
    {
      email: email,
      password: password,
      name: name,
      pictrue: pictrue,
      age: age,
      gender: gender,
      city: city,
      country: country,
      phonenumber: phonenumber,
      bloodgroup: bloodgroup,

      lifesaved: lifesaved,
      Rank: Rank,
      long: long,
      lat: lat,
      Status: Status,
      lastbleed: lastbleed,
      token: token,
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        return res.json(docs);
      }
    }
  );
};
exports.Update = Update;
const findallusers = async (req, res, next) => {
  userSchema.find(
    {
      lat: {
        $ne: null,
      },
      token: {
        $ne: null,
      },
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        return res.json(docs);
      }
    }
  );
};
exports.findallusers = findallusers;

const addTeam = async (req, res, next) => {
  const { logo, title, Volunteer, city, Date, Members } = req.body;
  //res.send(name + id);
  console.log("h");
  let doesUserExist;

  try {
    doesEmailExist = await Teammodule.findOne({ title });
  } catch (error) {}

  if (doesEmailExist) {
    return res.json({ message: "Team Name Already Exist" });
  }

  const newUser = new Teammodule({
    logo: logo,
    title: title,
    Volunteer: Volunteer,
    city: city,
    Date: Date,
    Members: Members,
  });

  await newUser
    .save()
    .then((result) => {
      res.json({ message: newUser });
      console.log("Team created");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.addTeam = addTeam;

const getallteams = async (req, res, next) => {
  Teammodule.find({}, function (err, docs) {
    if (err) {
      return res.json(err);
    } else {
      return res.json(docs);
    }
  });
};

exports.getallteams = getallteams;

const getteambyid = async (req, res, next) => {
  var team_id = req.params.id;
  Teammodule.findById(team_id, function (err, docs) {
    if (err) {
      return res.json({ success: false, message: "Team Not Found !" });
    } else {
      return res.json(docs);
    }
  });
};
exports.getteambyid = getteambyid;
const deleteitem = async (req, res, next) => {
  var team_id = req.params.id;
  userSchema.findByIdAndDelete(team_id, function (err, docs) {
    if (err) {
      return res.json({ success: false, message: "User Not Found !" });
    } else {
      return res.json({ success: true, message: "User Deleted !" });
    }
  });
};
exports.deleteitem = deleteitem;

const deletethteam = async (req, res, next) => {
  var team_id = req.params.id;
  Teammodule.findByIdAndDelete(team_id, function (err, docs) {
    if (err) {
      return res.json({ success: false, message: "Team Not Found !" });
    } else {
      return res.json({ success: true, message: "Team Deleted !" });
    }
  });
};
exports.deletethteam = deletethteam;

const addpost = async (req, res, next) => {
  const {
    id,
    email,

    name,
    pictrue,
    age,
    gender,
    city,
    country,
    phonenumber,
    bloodgroup,
    lifesaved,
    Rank,
    Status,
    Request,
    Bloodtype,
    Date,
    Description,
    hospital,

    long,
    lat,
    Qunatity,
    Urgent,
    SurgeryType,
    Specific,
    accepted,
    acceptedby,
  } = req.body;
  //res.send(name + id);
  console.log("h");

  const newUser = new Post({
    id: id,
    email: email,
    name: name,
    pictrue: pictrue,
    age: age,
    gender: gender,
    city: city,
    country: country,
    phonenumber: phonenumber,
    bloodgroup: bloodgroup,

    lifesaved: lifesaved,
    Rank: Rank,
    Request: Request,
    Status: Status,
    Bloodtype: Bloodtype,
    Date: Date,
    Description: Description,
    hospital: hospital,

    long: long,
    lat: lat,
    Qunatity: Qunatity,
    Urgent: Urgent,
    SurgeryType: SurgeryType,
    Specific: Specific,

    accepted: accepted,
    acceptedby: acceptedby,
  });

  await newUser.save();

  res.json({ success: true, message: newUser });
  console.log("user created");
};
exports.addpost = addpost;

const getallposts = async (req, res, next) => {
  Post.find(
    {
      accepted: false,
    },
    function (err, docs) {
      if (err) {
        return res.json(err);
      } else {
        return res.json(docs);
      }
    }
  );
};
exports.getallposts = getallposts;

const getpostbyid = async (req, res, next) => {
  var post_id = req.params.id;
  Post.findById(post_id, function (err, docs) {
    if (err) {
      return res.json({ success: false, message: "Post Not Found !" });
    } else {
      return res.json(docs), console.log(docs);
    }
  });
};
exports.getpostbyid = getpostbyid;

const updatepost = async (req, res, next) => {
  const {
    id,
    email,

    name,
    pictrue,
    age,
    gender,
    city,
    country,
    phonenumber,
    bloodgroup,
    lifesaved,
    Rank,
    Status,
    Request,
    Bloodtype,
    Date,
    Description,
    hospital,

    long,
    lat,
    Qunatity,
    Urgent,
    SurgeryType,
    Specific,
    accepted,
    acceptedby,
  } = req.body;
  var post_id = req.params.id;
  Post.findByIdAndUpdate(
    post_id,
    {
      id: id,
      email: email,
      name: name,
      pictrue: pictrue,
      age: age,
      gender: gender,
      city: city,
      country: country,
      phonenumber: phonenumber,
      bloodgroup: bloodgroup,

      lifesaved: lifesaved,
      Rank: Rank,
      Request: Request,
      Status: Status,
      Bloodtype: Bloodtype,
      Date: Date,
      Description: Description,
      hospital: hospital,

      long: long,
      lat: lat,
      Qunatity: Qunatity,
      Urgent: Urgent,
      SurgeryType: SurgeryType,
      Specific: Specific,

      accepted: accepted,
      acceptedby: acceptedby,
    },
    function (err, docs) {
      if (err) {
        return res.json({ success: false, message: "Post Not Found !" });
      } else {
        return res.json("userUpdated"), console.log(docs);
      }
    }
  );
};
exports.updatepost = updatepost;
const getpostbyemail = async (req, res, next) => {
  var id = req.params.id;
  Post.find({ id }, function (err, docs) {
    if (err) {
      return res.json({ success: false, message: "Post Not Found !" });
    } else {
      return res.json(docs), console.log(docs);
    }
  });
};
exports.getpostbyemail = getpostbyemail;

const deletepost = async (req, res, next) => {
  var post_id = req.params.id;
  Post.findByIdAndDelete(post_id, function (err, docs) {
    if (err) {
      return res.json({ success: false, message: "Post Not Found !" });
    } else {
      return res.json({ success: true, message: "Post Deleted !" });
    }
  });
};
exports.deletepost = deletepost;
const getapprovedpost = async (req, res, next) => {
  var id = req.params.id;
  Post.find({ id, accepted: true }, function (err, docs) {
    if (err) {
      return res.json({ success: false, message: "Post Not Found !" });
    } else {
      return res.json(docs), console.log(docs);
    }
  });
};
exports.getapprovedpost = getapprovedpost;

const getteambyemail = async (req, res, next) => {
  const email = req.params.email;
  Teammodule.find(
    { Members: { $elemMatch: { email: email } } },
    function (err, docs) {
      if (err) {
        return res.json({ success: false, message: "Team Not Found !" });
      } else {
        return res.json(docs);
      }
    }
  );
};
exports.getteambyemail = getteambyemail;
const addrecentdonner = async (req, res, next) => {
  const { Donnor, Reciever } = req.body;
  const newRecent = new RecentDonations({
    Donnor: Donnor,
    Reciever: Reciever,
  });
  await newRecent.save();
  res.json({ success: true, message: newRecent });
  console.log("user created");
};
exports.addrecentdonner = addrecentdonner;

const gettallrecentdonner = async (req, res, next) => {
  RecentDonations.find({}, function (err, docs) {
    if (err) {
      return res.json({ success: false, message: "Donnor not find" });
    } else {
      return res.json(docs);
    }
  });
};
exports.gettallrecentdonner = gettallrecentdonner;
const getDonationsbyid = async (req, res, next) => {
  const _id = req.params.id;
  RecentDonations.find(
    { Donnor: { $elemMatch: { _id: _id } } },
    function (err, docs) {
      if (err) {
        return res.json({ success: false, message: "Team Not Found !" });
      } else {
        return res.json(docs);
      }
    }
  );
};
exports.getDonationsbyid = getDonationsbyid;

const AddpendingRequest = async (req, res, next) => {
  const {
    id,
    email,

    name,
    pictrue,

    Status,

    bloodgroup,
    Report,
  } = req.body;

  let doesEmailExist;

  try {
    doesEmailExist = await Pendingrequests.findOne({ email });
  } catch (error) {}

  if (doesEmailExist) {
    const err = new Error("Email", 400);
    return res.json({ message: "UserAlreadyExist" });
  }

  const newUser = new Pendingrequests({
    id: id,
    email: email,
    name: name,
    pictrue: pictrue,
    Status: Status,
    bloodgroup: bloodgroup,
    Report: Report,
  });

  await newUser
    .save()
    .then((result) => {
      res.json({ message: newUser });
      console.log("Request Added");
    })
    .catch((err) => {
      res.json({ message: err });
    });
};
exports.AddpendingRequest = AddpendingRequest;

const getallpendingRequest = async (req, res, next) => {
  Pendingrequests.find(
    {
      Status: {
        $ne: "Verified",
      },
    },
    function (err, docs) {
      if (err) {
        return res.json({ success: false, message: "Request Not Found !" });
      } else {
        return res.json(docs);
      }
    }
  );
};
exports.getallpendingRequest = getallpendingRequest;
const delelependingRequest = async (req, res, next) => {
  var id = req.params.id;
  var message = [
    {
      title: "Request Rejected",
      body: "Your Request for Verification has been Rejected",
    },
  ];

  Pendingrequests.findOneAndDelete(
    {
      id: id,
    },
    function (err, docs) {
      if (err) {
        return res.json({ success: false, message: "Request Not Found !" });
      } else {
        return res.json({ success: true, message: "Request Deleted !" });
      }
    }
  );
};
exports.delelependingRequest = delelependingRequest;

const Addnotification = async (req, res, next) => {
  const { Notification } = req.body;
  const newNotification = new Notifications({
    Notification: Notification,
  });
  await newNotification.save();
  res.json({ success: true, message: newNotification });
};
exports.Addnotification = Addnotification;

const gettnotificationbyid = async (req, res, next) => {
  const id = req.params.id;
  Notifications.find(
    { Notification: { $elemMatch: { id: id } } },
    function (err, docs) {
      if (err) {
        return res.json({
          success: false,
          message: "Notifications Not Found !",
        });
      } else {
        return res.json(docs);
      }
    }
  );
};
exports.gettnotificationbyid = gettnotificationbyid;

const deleteNotification = async (req, res, next) => {
  var id = req.params.id;
  Notifications.findByIdAndDelete(id, function (err, docs) {
    if (err) {
      return res.json({ success: false, message: "Notification Not Found !" });
    } else {
      return res.json({ success: true, message: "Notification Deleted !" });
    }
  });
};
exports.deleteNotification = deleteNotification;

const gettalldata = async (req, res, next) => {
  const Users = await userSchema.countDocuments({
    lat: {
      $ne: null,
    },
    token: {
      $ne: null,
    },
  });
  const Posts = await Post.countDocuments();
  const Teams = await Teammodule.countDocuments();

  if (!Users && !Posts && !Teams) {
    res.status(500).json({ success: false });
  }
  res.send({
    Users: Users,
    Posts: Posts,
    Teams: Teams,
  });
};
exports.gettalldata = gettalldata;
