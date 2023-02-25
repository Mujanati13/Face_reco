import React from "react";
import "../tailwind/output.css";
import logo from "../image/new-logo.png";

export default function Login() {
  return (
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
            className="w-72 placeholder:font-normal font-normal h-9 p-3 shadow-sm mt-2 border outline-none"
            type="text"
            placeholder="User name"
            required
          /><br/>
          <div className="mt-0 h-0 text-white font-normal">
            <span>
              <input type="radio" id="staff" value="staff" name="type" />
              <label for="staff" className="ml-1">Staff</label>
            </span>
            <span className="ml-2">
              <input type="radio" id="student"  value="student" name="type"/>
              <label for="student" className="ml-1">Student</label>
            </span>
          </div>
          <br />
          <input
            className="w-72 h-9 p-3 font-normal shadow-sm mt-2 border outline-none focus:border-none"
            type="password"
            placeholder="Password"
            required
          />
          <br />
          <button className="w-72 h-8 bg-orange-400 text-lg font-medium mt-3">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
