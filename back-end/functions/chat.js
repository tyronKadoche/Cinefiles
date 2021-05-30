const { admin, db, fb } = require("./admin")

exports.postMessages = async (req, res) => {
    const userId = req.user.userId;
    const destUserId = req.body.userId;
    const chatId = req.body.chatId;
    const text = req.body.text;
    const createdAt = Date.now();
    const message = {
        userId,
        text,
        createdAt,
    };
    await db.collection(`/user/${userId}/chats`).doc(chatId).update({
        messages: admin.firestore.FieldValue.arrayUnion(message)
    })
    await db.collection(`/user/${destUserId}/chats`).doc(chatId).update({
        messages: admin.firestore.FieldValue.arrayUnion(message)
    })
    return res.status(200);
}

// exports.getMessages = (req, res) => {
//     const userId = req.user.userId;
//     let movieTable = []

//     db.collection(`/user/${userId}/chats`).get()
//         .then((doc) => {
//             doc.forEach((movie) => {
//                 movieTable.push(movie.data().movieId)
//             })
//             return res.status(200).json(movieTable);
//         })
//         .catch(err => console.error(err))
// }

exports.getChats = (req, res) => {
    const userId = req.user.userId;
    let chats = []
    db.collection(`/user/${userId}/chats`).get()
        .then((doc) => {
            doc.forEach((chat) => {
                chats.push(chat.data())
            })
            return res.status(200).json(chats);
        })
        .catch(err => console.error(err))
}

exports.postChat = async (req, res) => {
    const userId = req.user.userId;
    const destUserId = req.body.userId;
    const doc = await db.collection(`/user/${userId}/chats`).add({
        destUserId,
        messages: []
    })
    await db.collection(`/user/${destUserId}/chats`).doc(doc.id).set({
        destUserId: userId,
        messages: []
    })
    return res.status(200).json({
        chatId: doc.id,
    });
}

exports.getChat = async (req, res) => {
    const userId = req.user.userId;
    const chatId = req.body.chatId;
    const chat = await db.collection(`/user/${userId}/chats`).doc(chatId).get()
    return res.status(200).json(chat.data())
}