const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors");
const app = express();

const { validateFirebaseIdToken } = require("./verifyIdToken")
const { getUserData, putUserData, postMyWatchlist, getMyWatchlist } = require("./user");
const config = require("./config");
const {admin, db, fb} = require("./admin");
const { getTimeline, postTimeline } = require("./timeline");

app.use(cors({origin: true}));



app.post("/register",
  (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let userId;
    fb.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      userId = userCredential.user.uid;
      return db.doc(`/user/${userId}`).set(
        {
          email: email,
          password: password,
          birth: "",
          description: "",
          country: "",
          profilePic: "",
          backgroundPic: "",
        },
        { merge: true }
      );
    })
    .then((user) => {
      return res.status(200).json({
        user: user,
        message: 'request succed !',
        userToken: user.accessToken,
        status: res.status,
      })
    })
    .catch((error) => {
      return res.status(400).json({
        message: 'request failed !' + error.message,
        status: error.code,
      })
    });
});

app.post(
  "/login",
  (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    fb
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        return data.user.getIdToken(true);
      })
      .then((idToken) => {
        return res.status(200).json({
          message: "request succed !",
          token: idToken,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          message: "request failed !" + error.message,
          status: error.code,
        });
      });
  }
);

/* USER */
app.get("/user", validateFirebaseIdToken, getUserData);
app.post("/user", validateFirebaseIdToken, putUserData);

/* WATCHLIST */
app.post("/user/watchlist", validateFirebaseIdToken, postMyWatchlist);
app.get("/user/watchlist", validateFirebaseIdToken, getMyWatchlist);
// to do delete

/* TIMELINE */
app.get("/timeline", validateFirebaseIdToken, getTimeline);
app.post("/timeline", validateFirebaseIdToken, postTimeline);

exports.api = functions.region("europe-west1").https.onRequest(app);
