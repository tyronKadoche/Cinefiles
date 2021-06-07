
const { admin, db, fb } = require("./admin")

const cors = require("cors")({ origin: true });

exports.getUserData = (req, res) => {
  let userId = req.user.userId;
    admin
    .firestore()
    .doc(`/user/${userId}`)
    .get()
      .then((doc) => {
        return res.status(200).json({...doc.data(), userId });
      })
      .catch(function (error) {
        return res.status(400).json({
          message: "request failed !" + error.message,
          status: error.code,
        });
      })
}

exports.putUserData = (req, res) => {
  let userId = req.user.userId;
  let pseudo = req.body.pseudo;
  let backgroundPic = req.body.backgroundPic;
  let profilePic = req.body.profilePic;
  let birth = req.body.birth;
  let country = req.body.country;
  let description = req.body.description;
  let password = req.body.password;

  db.doc(`/user/${userId}`).set(
    {
      userId,
      pseudo,
      backgroundPic,
      birth,
      country,
      description,
      profilePic,
    },
    { merge: true }
  )
  .then((doc) => {
    return res.status(200).json(doc.data());
  })
  .catch(err => console.error(err))
}

exports.postMyWatchlist = (req, res) => {
  const userId = req.user.userId;
  const movieId = req.body.movieId;

  db.collection(`/user/${userId}/watchlist`).doc().set({movieId})
    .then((doc) => {
      return res.status(200).json(doc.data());
    })
    .catch(err => console.error(err))
}

exports.getMyWatchlist = (req, res) => {
  const userId = req.user.userId;
  let movieTable = []

  db.collection(`/user/${userId}/watchlist`).get()
    .then((doc) => {
      doc.forEach((movie) => {
        movieTable.push(movie.data().movieId)
      })
      return res.status(200).json(movieTable);
    })
    .catch(err => console.error(err))
}

exports.deleteWatchlist = (req, res) => {
  const userId = req.user.userId;
  const movieId = req.params.movieId;
  let movieTable;
  db.collection(`/user/${userId}/watchlist`)
    .where("movieId", "==", +movieId)
    .get()
    .then((doc) => {
      doc.forEach((movie) => {
        movieTable = movie.id;
      });
      return db
        .doc(`/user/${userId}/watchlist/${movieTable}`)
        .delete()
    })
    .then((doc) => {
          return res.status(200).json({message: "success"});
        })
  .catch(err => {
    console.log('error = ', err)
    return res.status(500).json({message: err})
  })
}

exports.postNotification = (req, res) => {
  const userId = req.user.userId;
  const notificationStatus = req.body.notificationStatus;
  const notificationDate = req.body.notificationDate;

  db.collection(`/user/${userId}/notification`).doc().set({ notificationStatus, notificationDate })
    .then((doc) => {
      return res.status(200).json(doc.data());
    })
    .catch(err => console.error(err))
}

exports.getNotification = (req, res) => {
  console.log("cmoiwesh")
  let userId = req.user.userId;
  let notifications = []


  db.collection(`/user/${userId}/notification`).get()
    .then((doc) => {
      doc.forEach((notif) => {
        notifications.push(notif.data())
      })
      return res.status(200).json(notifications);
    })
    .catch(function (error) {
      return res.status(400).json({
        message: "request failed !" + error.message,
        status: error.code,
      });
    })
}

exports.deleteNotification = (req, res) => {
  const userId = req.user.userId;
  const notificationDate = req.params.notification;
  let notificationTable;
  db.collection(`/user/${userId}/notification`)
    .where("notificationDate", "==", notificationDate)
    .get()
    .then((doc) => {
      doc.forEach((notif) => {
        console.log('notif ?? =', notif)
        notificationTable = notif.id;
      });
      return db
        .doc(`/user/${userId}/notification/${notificationTable}`)
        .delete()
    })
    .then((doc) => {
      return res.status(200).json({ message: "success" });
    })
    .catch(err => {
      console.log('error = ', err)
      return res.status(500).json({ message: err })
    })
}