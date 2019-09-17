const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load User model
const User = require("../models/user");

// @route POST /userregistration
// @desc Register user
// @access Public
router.post("/userreg", (req, res) => {
  User.findOne({ ID: req.body.ID }).then(user => {
    if (user) {
      return res.status(400).json({ ID: "ID already exists" });
    } else {
      const newCUser = new User({
        FullName: req.body.FullName,
        Email: req.body.Email,
        ID: req.body.ID,
        Key: req.body.Key,
        Interests: req.body.Interests
      });
      // Hash key before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCUser.Key, salt, (err, hash) => {
          console.log(err);
          if (err) throw err;
          newCUser.Key = hash;
          newCUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST /userlogin
// @desc Login user and return JWT token
// @access Public
router.post("/userlogin", (req, res) => {
  const ID = req.body.ID;
  const Key = req.body.Key;
  // Find user by id
  User.findOne({ ID: req.body.ID }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    // Check password
    bcrypt.compare(Key, user.Key).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          ID: user.ID
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ keyincorrect: "Key incorrect" });
      }
    });
  });
});

router.post("/getuser", function(req, res) {
  console.log(req.body);
  User.findOne({ ID: req.body.ID }, function(err, user) {
    if (user) {
      return res.json(user);
    } else {
      return res.json({ message: "User not found" });
    }
  });
});

router.route("/updateprofile").post(function(req, res) {
  User.findOne({ ID: req.body.ID }, function(err, user) {
    if (!user) res.status(404).send("data is not found");
    else {
      user.FullName = req.body.FullName;
      user.ID = req.body.ID;
      user.Key = req.body.Key;
      user.Email = req.body.Email;
      user.Interests = req.body.Interests;

      user
        .save()
        .then(todo => {
          res.json("Profile updated");
        })
        .catch(err => {
          res.status(400).send("Profile not possible");
        });
    }
  });
});

router.route("/ucurrentcity").post(function(req, res) {
  CurrentCity.findOne({ ID: req.body.ID }, function(err, cl) {
    if (!cl) res.status(404).send("data is not found");
    else {
      cl.City = req.body.City;
      cl.ID = "0";

      cl.save()
        .then(todo => {
          res.json("City updated");
        })
        .catch(err => {
          res.status(400).send("City update not possible");
        });
    }
  });
});

module.exports = router;
