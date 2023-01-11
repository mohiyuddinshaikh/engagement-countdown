import React, { useState, useEffect } from "react";
import "./Countdown.css";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Get the current date and time
      const now = new Date();

      // Get the next Sunday at 8 PM
      const nextSunday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + (7 - now.getDay()), // Next sunday
        20,
        0,
        0
      );

      // Calculate the time left until 8 PM on the next Sunday
      const timeLeft = nextSunday.getTime() - now.getTime();

      if (timeLeft < 0) {
        // If the time left is negative, clear the interval
        clearInterval(intervalId);
        setTimeLeft(0);
      } else {
        // Update the state with the time left
        setTimeLeft(timeLeft);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (timeLeft === null) {
    return <div>Loading...</div>;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="countdown">
      <Confetti numberOfPieces={150} width={width} height={height} />
      <div className="bg-image"></div>
      <div className="container">
        {timeLeft === 0 ? (
          <div className="engaged">Congratulations, We are ENGAGED!!!</div>
        ) : (
          <div>
            <h5>Our Engagement</h5>
            <div className="count-container">
              <div className="countdown-item">
                {days} <span className="countdown-label">days</span>
              </div>
              <div className="countdown-item">
                {hours} <span className="countdown-label">hours</span>
              </div>
              <div className="countdown-item">
                {minutes} <span className="countdown-label">minutes</span>
              </div>
              <div className="countdown-item">
                {seconds} <span className="countdown-label">seconds</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Countdown;
