const admin = require('firebase-admin');
const config = require("./config")
var firebase = require("firebase");

admin.initializeApp();
firebase.initializeApp(config);

const db = admin.firestore();
const fb = firebase.auth();

module.exports = { admin, db, fb };
