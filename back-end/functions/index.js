const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors");
const firebase = require("firebase");
const admin = require('firebase-admin');
const app = express();


var firebaseConfig = {
  apiKey: "AIzaSyBptnhQV7qiUV-0b-wL5qh17BXls94KpcQ",
  authDomain: process.env.APP_AUTH_DOMAIN,
  databaseURL: `https://${process.env.APP_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.APP_PROJECT_ID,
  storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_APP_ID,
  // measurementId: "G-MEASUREMENT_ID",
};

admin.initializeApp();
firebase.initializeApp(firebaseConfig);

const firedb = admin.firestore();

app.use(cors({origin: true}));

app.post("/register",
  (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let userId;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      userId = userCredential.user.uid;
      return firedb.doc(`/user/${userId}`).set({
        email: email,
        password: password
      }, {merge: true})
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

app.post("/login",
(req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((data) => {
      return data.user.getIdToken(true)
    })
    .then((idToken) => {
      return res.status(200).json({
        message: 'request succed !',
        token: idToken,
      })
    })
    .catch((error) => {
      return res.status(400).json({
        message: 'request failed !' + error.message,
        status: error.code,
      })
    });
});

app.get("/user",
(req, res) => {
  firebase.auth().currentUser.getIdToken(true)
  .then(function (idToken) {
    return res.status(200).json({
      message: 'request succed !',
      token: idToken,
    })
  }).catch(function (error) {
    return res.status(400).json({
      message: 'request failed !' + error.message,
      status: error.code,
    })
  });
  // let userId;
  // console.log('userId = ', userId);
  // firedb.doc(`user/${userId}`)
  // .get()
  // .then((user) => {
  //   return res.status(200).json({
  //     data: user.doc(),
  //   })
  // })
})

exports.api = functions.region("europe-west1").https.onRequest(app);
