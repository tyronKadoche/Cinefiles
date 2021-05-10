const admin = require("firebase-admin");

exports.validateFirebaseIdToken = (req, res, next) => {
  return new Promise((resolve, reject) => {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      console.error(
        "No Firebase ID token was passed as a Bearer token in the Authorization header.",
        "Make sure you authorize your request by providing the following HTTP header:",
        "Authorization: Bearer <Firebase ID Token>"
      );
      return reject({ code: 403, error: "Unauthorized" });
    }
    const idToken = req.headers.authorization.split("Bearer ")[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedIdToken) => {
        req.user = decodedIdToken;
        console.log("ID Token correctly decoded", decodedIdToken);
        req.user.userId = decodedIdToken.uid;
        return next();
  })
      .catch((error) => {
        console.error("Error while verifying Firebase ID token:", error);
        return reject({ code: 403, error: "Unauthorized" });
      });
  });
};