import React, { useEffect } from "react";
import { useState } from "react";

export default function () {

    const [time, setime] = useState(0)
    const [timeD, settimeD] = useState(0)
    const [title, settitle] = useState()


    function startCalcul(time){
        var times = ((time) / 1000) 
        times = Math.floor (times)
        setInterval(()=>{
            times--
            setime(Math.floor(times/60))
            if(times > 1) return;
        } , 1000)
    }

    useEffect(() => {
        var settingTime = 24*60*60*10000
        fetch('http://localhost:3001/api/schedule')
            .then(response => response.json())
            .then(data => {
                data.map(e => {
                    var givenDate = new Date(e.startDate)
                    var currentDateTime = new Date()
                    if (
                        givenDate.getFullYear() === currentDateTime.getFullYear() &&
                        givenDate.getMonth() === currentDateTime.getMonth() &&
                        givenDate.getDay() === currentDateTime.getDay()) {
                        console.log(givenDate +" "+currentDateTime);
                        console.log(givenDate - currentDateTime);
                        if(givenDate-currentDateTime > 0){
                            settingTime = Math.min(settingTime , givenDate-currentDateTime )
                            startCalcul(settingTime)
    
                            return 
                        }
                    } else {
                    }
                })
            })
            .catch(error => {
                // handle the error here
            });
    }, [])

    return (
        <div className="flex items-center text-green-800 space-x-3 w-full bg-white pb-4">
            <p className="font-medium text-normal">Next session :</p>
            <spa className="ml-2 animate-pulse text-green-600 font-bold">{time}m</spa>
            <div className="text-sm font-normal">{title}</div>
        </div>
    )
}