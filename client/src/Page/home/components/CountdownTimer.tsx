import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { pallet } from "../../../layout/pallet";

interface props {
  secondsLeft:number
  setAvailable:React.Dispatch<SetStateAction<boolean>>
}
interface propsStyle {
    time:number
}

const CountdownTimer = ({secondsLeft , setAvailable}:props) => {
    const [seconds, setSeconds] = useState(secondsLeft);

  // Update the remaining time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // Calculate the hours, minutes, and seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Format the time as hh:mm:ss
  const time = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

  // Reset the timer to 00:00:00 when it reaches zero
  useEffect(() => {
    if (seconds <= 0) {
      setSeconds(0);
      setAvailable(false)
    }
  }, [seconds,setAvailable]);


  return (
    <>
    {seconds > 0 ? <Time time={Number(seconds)}>{time}</Time> : null}
    </>
  )
}

const Time = styled.span<propsStyle>`
width: 20%;
margin-left: 2.5%;
  text-align: center;
  color:${props=>props.time > 300 ? pallet.white : 'red'};
  @media (max-width:768px){
    width:30%;
  }
`;

export default CountdownTimer