import config from "./config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, collection } from "firebase/firestore";
import { async } from "@firebase/util";
const auth = getAuth(config);
const db = getFirestore(config);

async function LoginStudent(user, password) {
  signInWithEmailAndPassword(auth, user, password)
    .then(async (e) => {
      const id = e.user.uid;
      createCookie("type" , "student")
      console.log(e);
      const docRef = doc(db, "students", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        signOut(auth)
        console.log("No such document!");
      }
    })
    .catch((e) => {
      console.log(e);
      return null;
    })
    .finally(() => {
      return null;
    });
  return null;
}

function LoginAdmin(user, password) {
  return null;
}

function checkAth() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      return user;
    } else {
      return null;
    }
  });
  return null;
}

function LogoutAuth() {
  signOut(auth)
    .then(() => {
      return true;
    })
    .catch((e) => {
      return false;
    });
  return false;
}

function createCookie(name, value) {
  var expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  var encodedValue = encodeURIComponent(value);
  document.cookie =
    name +
    "=" +
    encodedValue +
    "; expires=" +
    expirationDate.toUTCString() +
    "; path=/";
}

function removeCookie(name) {
  var expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() - 1);
  document.cookie =
    name + "=; expires=" + expirationDate.toUTCString() + "; path=/";
}

function getCookie(name) {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}


async function getDocumentbyId(id , name){
  const docRef = doc(db, name, id);
  const docSnap = await getDoc(docRef).then(e=>{
    return e.get("date")
  })
  return null
}

export {
  getDocumentbyId,
  LoginStudent,
  LoginAdmin,
  checkAth,
  createCookie,
  removeCookie,
  getCookie,
  LogoutAuth,
  db
};
