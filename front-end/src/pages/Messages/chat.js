import { db } from "../index";
import { firestore, auth } from "firebase";

// export interface IMessage {
//     id: string | number;
//     text: string;
//     createdAt: Date | number;
//     user: {
//         id: string | number;
//         name?: string;
//         avatar?: string;
//     }
// }

// export interface IMessages {
//     id: string;
//     userId1: string;
//     userId2: string;
//     messages: IMessage[];
// }

export class Chat {

    constructor(id, data) {
        Object.assign(this, data);
        this.id = id;
    }

    id;
    userId1;
    userId2;
    messages = [];

    static createWith = async (userId) => {
        const idMessages = Chat.hash(auth().currentUser.uid, userId);
        return db.collection("messages").withConverter(Chat.converter).doc(idMessages).set({
            userId1: auth().currentUser.uid,
            userId2: userId,
            messages: [],
        })
    }
    static hash = (id1, id2) => {
        if (id1 < id2) {
            return `${id1}${id2}`
        }
        return `${id2}${id1}`
    }

    static getMessagesWith = async (userId) => {
        const idMessages = Chat.hash(auth().currentUser.uid, userId);
        const messages = await db.collection("messages").withConverter(Chat.converter).doc(idMessages).get()
        return messages.data();
    }

    static async getAllConversations() {
        const uid = auth().currentUser.uid;
        const conversations1 = await db.collection("messages").withConverter(Chat.converter)
            .where("userId1", "==", uid).get();
        const conversations2 = await db.collection("messages").withConverter(Chat.converter)
            .where("userId2", "==", uid).get();
        return [
            ...conversations1.docs.map(e => e.data()),
            ...conversations2.docs.map(e => e.data())
        ];
    }

    get = () => {
        return this.messages;
    }

    send = (text) => {
        db.collection("messages").withConverter(Chat.converter)
            .doc(this.id)
            .update({
                messages: firestore.FieldValue.arrayUnion({
                    user: {
                        id: auth().currentUser.uid
                    },
                    text,
                    createdAt: Date.now()
                })
            })
    }

    subscribe = (callback) => {
        const unsubscribe = db
            .collection("messages")
            .withConverter(Chat.converter)
            .doc(this.id)
            .onSnapshot((doc) => {
                callback(doc.data().messages)
            });
        return unsubscribe;
    }

    static converter = {
        toFirestore: (post) => {
            return post;
        },
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            return new Chat(snapshot.id, data);
        }
    };
}

export default Chat;