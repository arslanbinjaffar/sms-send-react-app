import React, { useEffect, useState, useRef, useCallback } from "react";

export default function CountDown({ setIsDisabled }) {

  const [timer, setTimer] = useState(60);

  const decrementTimer = useCallback(() => {
    setTimer((prevTimer) => {
      if (prevTimer <= 0) {
        clearInterval(increment.current);
        setIsDisabled(false); 
        return 0;
      } else {
        return prevTimer - 1;
      }
    });
  },[timer])

  const increment = useRef(null);
  
  useEffect(() => {
    increment.current = setInterval(decrementTimer, 1000);

    return () => clearInterval(increment.current);
  }, []);

  return <p className="font-extrabold text-white text-5xl">{timer}</p>;
}
