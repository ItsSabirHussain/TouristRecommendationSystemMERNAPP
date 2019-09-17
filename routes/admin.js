const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateProManRegistration = require("../validation/admin");
const validateProManLogin = require("../validation/promanlogin");

// Load User model
const Admin = require("../models/admin");
const Place = require("../models/place");

// @route POST /adminregisteration
// @desc Register user
// @access Public
router.post("/promanreg", (req, res) => {
  // Form validation
  const { errors, isValid } = validateProManRegistration(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Admin.findOne({ ID: req.body.ID }).then(proman => {
    if (proman) {
      return res.status(400).json({ ID: "ID already exists" });
    } else {
      const newProMan = new Admin({
        FullName: req.body.FullName,
        OfficeID: req.body.OfficeID,
        ID: req.body.ID,
        Key: req.body.Key
      });

      console.log(newProMan);

      // Hash key before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newProMan.Key, salt, (err, hash) => {
          console.log(err);
          if (err) throw err;
          newProMan.Key = hash;
          newProMan
            .save()
            .then(admin => res.json(newProMan))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST /adminlogin
// @desc Login admin and return JWT token
// @access Public
router.post("/adminlogin", (req, res) => {
  const ID = req.body.ID;
  const Key = req.body.Key;
  console.log(ID);
  console.log(Key);
  // Find admin by id
  Admin.findOne({ ID: req.body.ID }).then(admin => {
    // Check if admin exists
    if (!admin) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    // Check password
    bcrypt.compare(Key, admin.Key).then(isMatch => {
      if (isMatch) {
        // Admin matched
        // Create JWT Payload
        const payload = {
          id: admin.id,
          ID: admin.ID
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
        return res.status(400).json({ passwordincorrect: "Key incorrect" });
      }
    });
  });
});
router.post("/getadmin", function(req, res) {
  console.log(req.body);
  Admin.findOne({ ID: req.body.ID }, function(err, admin) {
    if (admin) {
      return res.json(admin);
    } else {
      return res.json({ message: "User not found" });
    }
  });
});

router.route("/aupdateprofile").post(function(req, res) {
  Admin.findOne({ ID: req.body.ID }, function(err, admin) {
    admin.FullName = req.body.FullName;
    admin.ID = req.body.ID;
    if (req.body.Key === "") {
      admin.Key = req.body.Key;
    }
    admin.Email = req.body.Email;
    if (!admin.Key === "") {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(admin.Key, salt, (err, hash) => {
          console.log(err);
          if (err) throw err;
          admin.Key = hash;
          admin
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
    admin
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
  });
});

router.post("/addplace", (req, res) => {
  console.log("here");

  Place.findOne({
    Latitude: req.body.Longitude,
    Longitude: req.body.Latitude
  }).then(place => {
    if (place) {
      return res.status(400).json({ ID: "Place already exists" });
    } else {
      const newPlace = new Place({
        Name: req.body.Name,
        Category: req.body.Category,
        Latitude: req.body.Latitude,
        Longitude: req.body.Longitude,
        Tags: req.body.Tags,
        City: req.body.City
      });
      newPlace
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
