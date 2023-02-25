import React, { useState } from "react";
import Down from "../../image/down.svg";

export default function () {
  const [showSlide, setShowSlider] = useState(false);

  const handleShow = () => {
    setShowSlider(showSlide == false ? true : false);
  };

  return (
    <div className="mt-3">
      <div className="border-2 border-gray-300 ml-10 w-11/12 h-10 rounded-t-lg bg-green-200 pt-2 pl-5">
        <span
          onClick={handleShow}
          className="cursor-pointer hover:text-gray-700 flex w-80 items-center space-x-2"
        >
          <img src={Down} className="w-4" />
          <p className="text-sm">
            Artificial Intelligence Programming Languages
          </p>
        </span>
      </div>
      {showSlide == true ? 
        <div className="text-sm flex items-center space-x-10 border-2 border-gray-100 ml-10 w-11/12 h-10  bg-gray-100 pt-1 pl-5">
          <div className="flex items-center space-x-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> <span>Presence</span></div>
          <div>Mon, 13/02/2023</div>
          <div>Join at <span className="font-bold">7:23AM</span></div>
          <div className="text-blue-700 cursor-pointer">Mohammed Janati</div>
          <div className="text-red-500 cursor-pointer">he/she did not left yet</div>
        </div>
       : 
        ""
      }
      <div className="flex items-center space-x-3 border-2 border-gray-300 ml-10 w-11/12 h-10 rounded-b-lg bg-white pt-1 pl-5">
        <div>
          <span className="text-gray-600 text-sm">Groub B</span>
          <span className="ml-2 font-semibold text-sm text-white pl-3 pr-3 h-1 bg-orange-400 rounded-xl">
            Abs: 0 of 1
          </span>
        </div>
        <div>
          <span className="text-gray-600 text-sm">SubGroup: B4</span>
          <span className="ml-2 font-semibold text-sm text-white pl-3 pr-3 h-1 bg-orange-400 rounded-xl">
            Abs: 0 of 1
          </span>
        </div>
      </div>
    </div>
  );
}
