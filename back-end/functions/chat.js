const { admin, db, fb } = require("./admin")

exports.postMessages = async (req, res) => {
    const userId = req.user.userId;
    const destUserId = req.body.destUserId;
    const chatId = req.body.chatId;
    const text = req.body.text;
    const createdAt = Date.now();
    const message = {
        userId,
        text,
        createdAt,
    };
    try {
        await db.collection(`/user/${userId}/chats`).doc(chatId).update({
            messages: admin.firestore.FieldValue.arrayUnion(message)
        })
        await db.collection(`/user/${destUserId}/chats`).doc(chatId).update({
            messages: admin.firestore.FieldValue.arrayUnion(message)
        })
    }
    catch {
        console.log('error catch')
    }
    const chat = await db.collection(`/user/${userId}/chats`).doc(chatId).get()
    return res.status(200).json(chat.data())
}

// cette fonction get tt les chats
exports.getChats = (req, res) => {
    const userId = req.user.userId;
    let chats = []
    db.collection(`/user/${userId}/chats`).get()
        .then((doc) => {
            doc.forEach((chat) => {
                chats.push({
                    destName: chat.data().destName,
                    destPic: chat.data().destPic,
                    destUserId: chat.data().destUserId,
                    messages: chat.data().messages,
                    docId: chat.id,
                })
            })
            return res.status(200).json(chats);
        })
        .catch(err => console.error(err))
}

// cette fonction crée une room
exports.postChat = async (req, res) => {
    const userId = req.user.userId;
    const destUserId = req.body.destUserId;
    const destName = req.body.destName;
    const destPic = req.body.destPic;
    const name = req.body.name;
    const profilePic = req.body.profilePic;
    const chats = await db.collection(`/user/${userId}/chats`).get();
    for (const chat of chats.docs) {
        if (chat.data().destUserId === destUserId) {
            return res.status(200).json({
                chatId: chat.id,
            });
        }
    }

    const doc = await db.collection(`/user/${userId}/chats`).add({
        destUserId: destUserId,
        destPic: destPic,
        destName: destName,
        messages: []
    })
    await db.collection(`/user/${destUserId}/chats`).doc(doc.id).set({
        destUserId: userId,
        destPic: profilePic,
        destName: name,
        messages: []
    })
    return res.status(200).json({
        chatId: doc.id,
    });
}

// cette fonction je sais pas a quoi elle sert mais vsy
exports.getChat = async (req, res) => {
    const userId = req.user.userId;
    const chatId = req.body.chatId;
    const chat = await db.collection(`/user/${userId}/chats`).doc(chatId).get()
    return res.status(200).json(chat.data())
}