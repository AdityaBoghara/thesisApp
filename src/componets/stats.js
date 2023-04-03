import { useEffect, useState } from "react";

export default function Example() {
  const [x_pos, setX] = useState(0);
  const [y_pos, setY] = useState(0);
  const [speed, setSpeed] = useState();
  const [stop, setStop] = useState();
  const [playing, setPlaying] = useState();
  //   useEffect(() => {
  //       let temp_data = 0
  //       const interval = setInterval(() => {
  //           fetch('/get_stats').then(res => res.json()).then(data => {
  //               temp_data = data
  //           }
  //           );
  //         //   setX(temp_data.x_pos)
  //         //   setY(temp_data.y_pos)
  //         //   setSpeed(temp_data.speed)
  //         //   console.log(temp_data)
  //           if (temp_data.playing) setPlaying("TRUE")
  //           else setPlaying("FALSE")
  //           if (temp_data.stop) setStop("TRUE")
  //           else setStop("FALSE")

  //       }, 100);
  //       return () => clearInterval(interval);
  //   },
  //       []);

  var timestamp = null;
  var lastMouseX = null;
  var lastMouseY = null;
  

  document.body.addEventListener("mousemove", function (e) {
    if (timestamp === null) {
      timestamp = Date.now();
      lastMouseX = e.screenX;
      lastMouseY = e.screenY;
      return;
    }

    var now = Date.now();
    var dt = now - timestamp;
    var dx = e.screenX - lastMouseX;
    var dy = e.screenY - lastMouseY;
    var speedX = Math.round((dx / dt) * 100);
    var speedY = Math.round((dy / dt) * 100);

    timestamp = now;
    lastMouseX = e.screenX;
    lastMouseY = e.screenY;
    setSpeed(Math.round(Math.sqrt(speedX * speedX + speedY * speedY)));
    setX(lastMouseX);
    setY(lastMouseY);

    // let timer;
    // document.body.addEventListener(`mousemove`, () => {
    //   clearTimeout(timer);
    //   timer = setTimeout(mouse_stopped, 300);

    // });
    // function mouse_stopped(){
    //   setStop("TRUE");
    // }

    // if (Math.abs(Math.sqrt(speedX * speedX + speedY * speedY)) === 0) {
    //   setStop("TRUE");
    //   setSpeed(0);
    // } else {
    //   setStop("FALSE");
    // }
  });

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-6">
      <div className=" col-span-2 px-6 py-3 bg-gray-50 border border-gray-200  rounded-lg overflow-hidden font-light">
        <p className="text-3xl font-light text-gray-500 truncate">Position</p>
        <p className="mt-1 text-xl  text-gray-900">x position: {x_pos}</p>
        <p className="mt-1 text-xl  text-gray-900">y position: {y_pos}</p>
      </div>
      <div className="col-span-2  px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden font-light">
        <p className="text-3xl font-light text-gray-500 truncate">Speed</p>
        <p className="mt-1 text-xl  text-gray-900">coord per 5 ms: {speed}</p>
        <p className="mt-1 text-xl  text-gray-900">Stop: {stop}</p>
      </div>
      <div className="col-span-2  px-6 py-3 bg-gray-50 border border-gray-200  rounded-lg overflow-hidden font-light">
        <p className="text-3xl font-light text-gray-500 truncate">Sounds</p>
        <p id="sound" className="mt-1 text-xl  text-gray-900">
          {" "}
        </p>
      </div>
    </div>
  );
}
