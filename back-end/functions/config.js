module.exports = {
  apiKey: "AIzaSyBptnhQV7qiUV-0b-wL5qh17BXls94KpcQ",
  authDomain: process.env.APP_AUTH_DOMAIN,
  databaseURL: `https://${process.env.APP_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.APP_PROJECT_ID,
  storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_APP_ID,
  // measurementId: "G-MEASUREMENT_ID",
};
