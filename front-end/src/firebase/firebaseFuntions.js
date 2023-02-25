import config from "./config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const auth = getAuth(config);
const db = getFirestore(config);

function LoginStudent(user, password) {
  createUserWithEmailAndPassword(auth, user, password)
    .then((e) => {
      const id = e.user.uid;
      const docRef = db.collection('students').doc(id);
      docRef.get().then((doc) => {
        if (doc.exists) {
          return e.user
        } else {
          return null
        }
      })
    })
    .catch(() => {
      return null;
    })
    .finally(() => {
      return null;
    });
    return null
}

function LoginAdmin(user, password) {}
