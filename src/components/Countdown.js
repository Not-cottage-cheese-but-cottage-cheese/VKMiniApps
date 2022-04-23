import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTimerText } from "../store/features/timer";

const CountDown = ({ minutes = 0, seconds = 0 }) => {
  const [over, setOver] = useState(false);
  const [[m, s], setTime] = useState([minutes, seconds]);

  const tick = () => {
    if (over) return;

    if (m === 0 && s === 0) {
      setOver(true);
    } else if (s == 0) {
      setTime([m - 1, 59]);
    } else {
      setTime([m, s - 1]);
    }
    useDispatch()(
      setTimerText(
        `${Math.trunc(m).toString().padStart(2, "0")}:${s
          .toString()
          .padStart(2, "0")}`
      )
    );
  };

  const reset = () => {
    setTime([parseInt(minutes), parseInt(0)]);
    setOver(false);
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });
};

export default CountDown;
