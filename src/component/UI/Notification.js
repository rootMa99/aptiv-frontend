import { Tilt } from "react-tilt";
import c from "./Notification.module.css";
/* const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 25, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};*/
const Notification = (p) => {
  return (
    <div className={c.formatter}>
      <Tilt style={{ height: 150, width: 450 }} options={{ scale: 1, max: 25 }}>
        <div className={c.card}>
          <p>no record found</p>
        </div>
      </Tilt>
    </div>
  );
};

export default Notification;
