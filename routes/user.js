const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load User model
const User = require("../models/user");
const CurrentCity = require("../models/currentcity");
const Place = require("../models/place");

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

      newCUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
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
    if ((req.body.Key = user.Key)) {
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

router.post("/getuser", function(req, res) {
  User.findOne({ ID: req.body.ID }, function(err, user) {
    if (user) {
      console.log(user.Interests);

      return res.json(user);
    } else {
      return res.json({ message: "User not found" });
    }
  });
});

router.route("/updateprofile").post(function(req, res) {
  console.log(req.body);
  User.findOne({ _id: req.body._id }, function(err, user) {
    if (!user) res.status(404).send("data is not found");
    else {
      console.log("There");
      user.FullName = req.body.FullName;
      user.ID = req.body.ID;
      user.Key = req.body.Key;
      user.Email = req.body.Email;
      user.Interests = req.body.Interests;
      user
        .save()
        .then(todo => {
          res.json({ message: "Profile updated" });
        })
        .catch(err => {
          res.status(400).send("Profile not possible");
        });
    }
  });
});

router.route("/updateccity").post(function(req, res) {
  CurrentCity.findOne({ ID: req.body.ID }, function(err, cl) {
    if (!cl) {
      const city = CurrentCity({
        ID: req.body.ID,
        City: req.body.City
      });
      city
        .save()
        .then(todo => {
          return res.json("City updated");
        })
        .catch(err => {
          return res.status(400).send("City update not possible");
        });
    } else {
      (cl.City = req.body.City), (cl.ID = req.body.ID);
      cl.save()
        .then(todo => {
          return res.json("City updated");
        })
        .catch(err => {
          return res.status(400).send("City update not possible");
        });
    }
  });
});

router.post("/getrplaces", function(req, res) {
  console.log(req.body.ID);
  User.findOne({ ID: req.body.ID }, function(err, user) {
    const interests = user.Interests;
    console.log(interests);
    CurrentCity.findOne({ ID: req.body.ID }, function(err, city) {
      const ucity = city.City;
      Place.find({ City: ucity }, function(err, places) {
        if (places) {
          console.log("List of all places");
          console.log(places);
          const result = [];
          chk = false;
          places.forEach((v, i, a) => {
            console.log("outer" + i);
            chk = false;
            console.log(v.Tags);
            v.Tags.forEach((vv, ii, aa) => {
              console.log("inner" + ii);
              if (interests.includes(vv)) {
                console.log("Added");
                chk = true;
              }
            });
            if (chk) {
              result.push(v);
            }
          });
          if (!result === []) {
            return res.json(result);
          } else {
            return res.json([
              {
                Name: "None",
                Category: "None",
                Tags: ["None", "None"]
              }
            ]);
          }
        } else {
        }
      });
    });
  });
});

module.exports = router;
