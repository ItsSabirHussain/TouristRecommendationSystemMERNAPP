const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const Admin = require("../models/admin");
const Place = require("../models/place");

router.post("/promanreg", (req, res) => {
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
      newProMan
        .save()
        .then(admin => res.json(newProMan))
        .catch(err => console.log(err));
    }
  });
});

router.post("/adminlogin", (req, res) => {
  const ID = req.body.ID;
  const Key = req.body.Key;
  Admin.findOne({ ID: req.body.ID }).then(admin => {
    if (!admin) {
      return res.status(404).json({ IDNotFound: "ID not found" });
    }
    if (req.body.Key == admin.Key) {
      const payload = {
        id: admin.id,
        ID: admin.ID
      };
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
  Admin.findOne({ ID: req.body.IDD }, function(err, admin) {
    admin.FullName = req.body.FullName;
    admin.ID = req.body.ID;
    admin.Key = req.body.Key;
    admin.Email = req.body.Email;
    admin
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
  });
});

router.post("/addplace", (req, res) => {
  console.log(req.body.Tags);

  Place.findOne({
    Latitude: req.body.Longitude,
    Longitude: req.body.Latitude
  }).then(place => {
    if (place) {
      return res.status(400).json({ ID: "Place already exists" });
    } else {
      console.log(req.body.Tags);
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

router.post("/getallplaces", function(req, res) {
  Place.find({}, function(err, admin) {
    if (admin) {
      return res.json(admin);
    } else {
      return res.json({ message: "User not found" });
    }
  });
});

router.post("/getplace", function(req, res) {
  Place.findOne({ _id: req.body._id }, function(err, place) {
    if (place) {
      return res.json(place);
    } else {
      return res.json({ message: "Place not found" });
    }
  });
});

router.route("/updateplace").post(function(req, res) {
  console.log(req.body.Tags);
  Place.findOne({ _id: req.body._id }, function(err, place) {
    place.Name = req.body.Name;
    place.Category = req.body.Category;
    place.Latitude = req.body.Latitude;
    place.Longitude = req.body.Longitude;
    place.City = req.body.City;
    place.Tags = req.body.Tags;
    place
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
  });
});

module.exports = router;
