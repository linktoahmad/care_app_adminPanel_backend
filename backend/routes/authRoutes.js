const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");

const User = require("../db/User");


const router = express.Router();

router.post("/signup", (req, res, next) => {
  const data = req.body;
  let user = new User({
    email: data.email,
    password: data.password,
    image: data.image,
    name: data.name,
  });

  user
    .save()
    .then(() => {
      // Token
      const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
      res.json({
        id:user._id,
        token: token,
      });
    })
    .catch((err) => {
        user
          .delete()
          .then(() => {
            if (err.keyValue.email === req.body.email) {
              console.log("user", req.body.email, "already exist");
              passport.authenticate(
                "local",
                { session: false },
                function (err, user, info) {
                  if (err) {
                    return next(err);
                  }
                  if (!user) {
                    res.status(401).json(info);
                    return;
                  }
                  // Token
                  const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
                  res.json({
                    id:user._id,
                    token: token,
                    type: user.type,
                  });
                }
              )(req, res, next);
            } else {
            res.status(400).json(err);
            }
          })
          .catch((err) => {
            res.json({ error: err });
          });
        err;
    });
});

// const AlreadyAUser = () => {
//   console.log("already user function");
//   passport.authenticate(
//     "local",
//     { session: false },
//     function (err, user, info) {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         res.status(401).json(info);
//         return;
//       }
//       // Token
//       const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//       res.json({
//         token: token,
//         type: user.type,
//       });
//     }
//   )(req, res, next);
// };

router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).json(info);
        return;
      }
      // Token
      const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
      res.json({
        id:user._id,
        token: token,
        type: user.type,
      });
    }
  )(req, res, next);
});

module.exports = router;
