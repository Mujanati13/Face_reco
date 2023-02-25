import React, { useState, useEffect } from "react";
import "../tailwind/output.css";
import logo from "../image/new-logo.png";
import { Navigate } from "react-router-dom";
import config from "../firebase/config";
import { getFirestore, doc, getDoc, collection } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  removeCookie,
  getCookie,
  LoginAdmin,
} from "../firebase/firebaseFuntions";
import {
  checkAth,
  createCookie,
  LoginStudent,
} from "../firebase/firebaseFuntions";
import formatRelativeWithOptions from "date-fns/esm/fp/formatRelativeWithOptions/index";

var stats = false;
const auth = getAuth(config);
const db = getFirestore(config);

export default function Login() {
  const [getemail, setemail] = useState("");
  const [getpassword, setpassword] = useState("");
  const [getauth, setauth] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingbtn, setIsLoadingbtn] = useState(false);
  const [type, settype] = useState("");
  const [loginauth, setloginauth] = useState("");

  //settype((type == "student" ? "student" : "teacher"))
  async function handleLogin() {
    
    if (getemail.length > 3 && getpassword.length > 7) {
      setIsLoading(true);
      if (type == "student") {
        signInWithEmailAndPassword(auth, getemail, getpassword)
          .then(async (e) => {
            console.log(e);
            const id = e.user.uid;
            const docRef = doc(db, "students", id);
            const docSnap = await getDoc(docRef);
            createCookie("type", "student");
            createCookie("id", id);
            stats = false
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
            } else {
              console.log("No such document!");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (type == "teacher") {
        signInWithEmailAndPassword(auth, getemail, getpassword)
          .then(async (e) => {
            const id = e.user.uid;
            console.log(e);
            stats = true
            const docRef = doc(db, "teachers", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              createCookie("id", id);
              createCookie("type", "teacher");
              console.log("Document data:", docSnap.data());
            } else {
              signOut(auth);
              console.log("No such document!");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }

  //signOut(auth)

  console.log(type);
  function handleEmail(e) {
    setemail(e.target.value);
  }
  function handlePassword(e) {
    setpassword(e.target.value);
  }

  function handleradio(e) {
    settype(e.target.value);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setIsLoading(false);
      } else {
        setCurrentUser(null);
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  var typeAuth = getCookie("type");

  return currentUser == null ? (
    isLoading ? (
      <h1 className=" mt-20 font-medium text-center text-7xl">Loading</h1>
    ) : (
      <div className="">
        <div className="h-32 p-5 ml-36">
          <img src={logo} width="300px"></img>
        </div>
        <div
          style={{ height: "80.3vh" }}
          className="bg-cover w-full bg-[url('../image/background.jpg')]"
        >
          <div className="p-10">
            <br />
            <input
              onChange={handleEmail}
              className="w-72 placeholder:font-normal font-normal h-9 p-3 shadow-sm mt-2 border outline-none"
              type="text"
              placeholder="User name"
              required
            />
            <br />
            <div className="mt-0 h-0 text-white font-normal">
              <span>
                <input
                  onChange={handleradio}
                  type="radio"
                  id="teacher"
                  value="teacher"
                  name="type"
                />
                <label for="staff" className="ml-1">
                  teacher
                </label>
              </span>
              <span className="ml-2">
                <input
                  onChange={handleradio}
                  type="radio"
                  id="student"
                  value="student"
                  name="type"
                  
                />
                <label for="student" className="ml-1">
                  Student
                </label>
              </span>
            </div>
            <br />
            <input
              onChange={handlePassword}
              className="w-72 h-9 p-3 font-normal shadow-sm mt-2 border outline-none focus:border-none"
              type="password"
              placeholder="Password"
              required
            />
            <br />
            <button
              onClick={handleLogin}
              className="w-72 h-8 bg-orange-400 text-lg font-medium mt-3"
            >
              {isLoadingbtn ? (
                <div
                  class="animate-spin inline-block w-6 h-6 mt-1 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                  role="status"
                  aria-label="loading"
                ></div>
              ) : (
                <spa>Login</spa>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  ) : stats ? (
    <Navigate to="/admin" />
  ) : <Navigate to="/schedule" />

}
