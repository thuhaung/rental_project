import React from 'react'
import { useState, useEffect } from 'react';

const Timer = ({ minute, second, onFinish }) => {
    const [minutes, setMinutes] = useState(minute);
    const [seconds, setSeconds] =  useState(second);

    useEffect(() => {
    let myInterval = setInterval(() => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        }
        if (seconds === 0) {
            if (minutes === 0) {
                onFinish();
                clearInterval(myInterval)
            } else {
                setMinutes(minutes - 1);
                setSeconds(59);
            }
        } 
    }, 1000)

    return () => {
        clearInterval(myInterval);
    };

    });

    return (
        <div>
        { minutes === 0 && seconds === 0
            ? null
            : <h1 className="verification-popup-timer"> in {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )
}

export default Timer;