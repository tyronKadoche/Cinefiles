const { admin, db, fb } = require("./admin")

const cors = require("cors")({ origin: true });

exports.getTimeline = (req, res) => {
    admin
        .firestore()
        .collection("timeline")
        .orderBy("createAt", "desc")
        .get()
        .then((doc) => {
            return res.status(200).json(doc.docs.map(doc => doc.data()));
        })
        .catch(function (error) {
            return res.status(400).json({
                message: "request failed !" + error.message,
                status: error.code,
            });
        })
}

exports.postTimeline = (req, res) => {
    const comment = req.body.comment;
    const pseudo = req.body.pseudo;
    const profilePic = req.body.profilePic;
    const createAt = req.body.createAt;

    db.collection(`/timeline`).doc().set({ comment, pseudo, profilePic, createAt })
        .then((doc) => {
            return res.status(200).json({succes: "success !"});
        })
        .catch(function (error) {
            return res.status(400).json({
                message: "request failed !" + error.message,
                status: error.code,
            });
        })
}