import React, { useState } from "react";
import she, { ReactComponent as She } from "../image/she.svg";
import { ReactComponent as Absence } from "../image/absence.svg";
import { ReactComponent as More } from "../image/more.svg";
import { ReactComponent as Done } from "../image/done.svg";
import PresenceCard from "./PresenceCard";
import { Link, Navigate } from "react-router-dom"; 
import {
  checkAth,
  getCookie,
  LogoutAuth,
  removeCookie,
} from "../firebase/firebaseFuntions";
import { getAuth } from "firebase/auth";
import config from "../firebase/config";

export default function () {
  const [getlogin, setlogin] = useState(false);
  const handleLogin = () => {
    setlogin(getlogin == false ? true : false);
  };

  function logout() {
    var a = LogoutAuth();
    removeCookie("type");
    console.log(a);
    window.location.reload();
  }

  var typeAuth = getCookie("type");

  return getAuth(config).currentUser != null ? (
    typeAuth != "teacher" ? (
      <div className="w-full h-screen truncate">
        <div className="head flex justify-end space-x-3 shadow-md w-full h-14 bg-gray-800 p-1 pr-10 items-center">
          <p
            style={{}}
            className="font-bold text-lg text-orange-500 flex-auto pl-4"
          >
            MD SYSTEM
          </p>

          <div
            style={{ border: "0.5px solid white" }}
            className="w-10 h-10 bg-black border-white rounded-full"
          ></div>
          <span
            onClick={handleLogin}
            className="flex items-center cursor-pointer space-x-2"
          >
            <span className="text-white font-seimbold">
              @
              {getAuth(config)
                .currentUser.uid.toString()
                .toLowerCase()
                .substring(0, 6)}
            </span>
            <More className="fill-white font-normal w-4" />
          </span>
        </div>
        {getlogin == true ? (
          <span
            onClick={logout}
            className="hover:bg-gray-200 text-black absolute top-15 border-2 border-gray-200 border-solid font-normal cursor-pointer right-10 shadow-xl pl-1 pr-1 bg-gray-100 rounded-lg"
          >
            Logout
          </span>
        ) : (
          ""
        )}
        <div>
          <div className="flex space-x-6">
            <div className="w-52 h-screen bg-gray-600 ">
              <p className="h-8 cursor-pointer hover:bg-gray-700 shadow-lg bg-gray-500 border-white w-full">
                <Link to="/schedule">
                  <p className="pl-5 flex items-center font-normal space-x-3 justify-start text-gray-300 text-md h-8 text-center">
                    <She className="w-5 fill-white" />
                    <span className="font-bold">Schedule</span>
                  </p>
                </Link>
              </p>
              <p className="h-8 mt-0.5 cursor-pointer hover:bg-gray-700 shadow-lg bg-gray-500 border-white w-full">
                <Link to="/absence">
                  <p className="pl-5 flex items-center font-normal space-x-3 justify-start text-gray-300 text-md h-8 text-center">
                    <Absence className="w-6 fill-white" />
                    <span className="font-bold">Absence</span>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  </p>
                </Link>
              </p>
              <p className="h-8 mt-0.5 cursor-pointer hover:bg-gray-700 shadow-lg bg-gray-500 border-white w-full">
                <Link to="/presence">
                  <p className="h-8 mt-0.5 cursor-pointer hover:bg-gray-700 shadow-lg bg-gray-500 border-white w-full">
                    <p className="pl-5 flex items-center font-normal space-x-2 justify-start text-gray-300 text-md h-8 text-center">
                      <Done className="w-6 fill-white" />
                      <span className="font-bold">Presence</span>
                      {/*<div className="w-2 h-2 bg-green-500 rounded-full"></div>*/}
                    </p>
                  </p>
                </Link>
              </p>
            </div>
            <div
              style={{ width: "80%", height: "70vh", overflow: "auto" }}
              className="mt-10 bg-gray-100 "
            >
              <PresenceCard />
              <PresenceCard />
              <PresenceCard />
              <PresenceCard />
            </div>
          </div>
        </div>
      </div>
    ) : (
      ""
    )
  ) : (
    <Navigate to="/login" />
  );
}
