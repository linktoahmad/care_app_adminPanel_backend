const express = require("express");
const mongoose = require("mongoose");
const jwtAuth = require("../lib/jwtAuth");

const User = require("../db/User");
const Question = require("../db/Questions");
const Activity = require("../db/Activities");
const History = require("../db/History");
const Mood = require("../db/Mood");

const router = express.Router();




// test ok
// get user's personal details for profile
router.get("/user", jwtAuth, (req, res) => {
  const user = req.user;

  User.findOne({ _id: user._id })
    .then((jobApplicant) => {
      if (jobApplicant == null) {
        res.status(404).json({
          message: "User does not exist",
        });
        return;
      }
      res.json(jobApplicant);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});





// test ok
// To add new question in database
router.post("/addQuestion", (req, res) => {
  const data = req.body;
console.log(data)
  let question = new Question({
    question: data.question,
    answers: data.answers,
    scores: data.scores,
  });

  question
    .save()
    .then(() => {
      res.json({ message: "Question added successfully to the database" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});





// test ok
// get daily quiz
router.get("/getQuiz", (req, res) => {
  Question.aggregate([{ $sample: { size: 10 } }])
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});





// test ok
// save quiz-score as history
// score must be <= 100
router.post("/saveScore", (req, res) => {
  const data = req.body;
  let history = new History({
    userId: data._id,
    score: data.score,
    dateOfQuiz: new Date(),
  });

  history
    .save()
    .then(() => {
      res.json({ message: "quiz result saved" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});





// test ok
// get user history of month
// todo: must be in order from date 1 to 30
router.post("/getQuizData", (req, res) => {
  const data = req.body;

  console.log({
    dateOfQuiz: { $gte: new Date(data.sdate), $lt: new Date(data.edate) },
    userId: data.userId,
  });

  History.find({
    dateOfQuiz: { $gte: new Date(data.sdate), $lt: new Date(data.edate) },
    userId: data.userId,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});



// test ok
// check get quiz mood and data
router.get("/getQuizData/:id", (req,res) => {
  const today = new Date()
  let tomorrow =  new Date()
  tomorrow.setDate(today.getDate() + 1)
  History.findOne({
    dateOfQuiz: {"$gte": new Date(`${today.toISOString("uk").substring(0,10)}T00:00:00.000Z`),
    "$lt": new Date(`${tomorrow.toISOString("uk").substring(0,10)}T00:00:00.000Z`)},
    userId: req.params.id,
  })
    .then((result) => {
      result==null?res.json(result):
      Mood.findOne({ score: Math.round(result.score/10)*10 })
      .then((result) => {
        console.log(result)
        res.json(result);
      })
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});




// test ok
// get user data for the dashboard
router.get("/getDashboardData", (req, res) => {
  const data = req.body;
  History.findOne({ userId: data.userId }).sort({'dateOfQuiz':-1}).limit(1)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});




// tesst ok
// To add new activity in database
// activity image is saved by upload api in uploadRoutes.js
// > from front end call uploadimage api forst it will return image url then save activity with data
router.post("/addActivity", (req, res) => {
  const data = req.body;

  console.log(req.body);

  let activity = new Activity({
    name: data.name,
    mood: data.mood,
    description: data.description,
    image: data.image,
  });

  activity
    .save()
    .then(() => {
      res.json({ message: "Activity added successfully to the database" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});



// test ok
// to get activities for front page
// get 10 random activities
router.get("/getActivities", (req, res) => {
  Activity.aggregate([{ $sample: { size: 10 } }])
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});



// test ok
// get activity based on mood
// get activityt after quiz based on score
// score will determine mood of user
// moods enum=[depressed,stressed,upset,tense,fatigued,calm,relaxed,happy,excited,joy]
//from least to max score ie 0...100
router.post("/getMoodActivities", (req, res) => {
  const data = req.body;
  Activity.find({ mood: data.mood })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// test ok
// to get mood based on score
router.get("/getMood/:id", (req, res) => {
  const score = req.params.id;
  Mood.findOne({ score: score })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
