import { SetStateAction, useCallback, useState } from "react";
import styled from "styled-components";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import SpinnerLoading from "../../../icons/SpinnerLoading";
import { pallet } from "../../../layout/pallet";
import Api from "../../../services/Api";
import notif from "../../../utils/notif";
import { validation } from "../../../utils/validation";

const initialState = {
  hour: "",
  minutes: "",
  seconds: "",
  url: "",
};

interface formProps {
  setId:React.Dispatch<SetStateAction<string>> 
}

const FORM = ({setId}:formProps) => {
  const [loading , setLoading] = useState(false)
  const [state, setState] = useState(initialState);
  const [err, setErr] = useState({
    hour: "",
    minutes: "",
    seconds: "",
    url: "",
  });

  // this function give value and name of each and check value in validation function 
  // if has error add {name : error} and also add data in state {name:value}
  // the error object involve the name of all inputs as key and their values are blanck string at the first
  const onChangeHandler = useCallback((e: any) => {
    const { value, name } = e.target;
    const error = validation(name, value);
    setErr({ ...err, [name]: error });
    setState({ ...state, [name]: value });
  },[state , err])

  // send data of state to backend and give id and show id in modal and after send data reset all data of state for another request
  const onSubmitHandler = useCallback(async (e: any) => {
    e.preventDefault();
    setLoading(true)
    const data = {
      hours:Number(state.hour) > 0 ? Number(state.hour) : 0,
      minutes:Number(state.minutes) > 0 ? Number(state.minutes) : 0,
      seconds:Number(state.seconds) > 0 ? Number(state.seconds) : 0,
      webhookUrl:state.url,
    }
    try {
      const response = await Api.post('/set-timer',{...data})
      setId(response?.data?.id)
      notif('The timer added' , "default")
      setState(initialState)
      setLoading(false)
    } catch (error:any) {
      const err = await error.response.data.error.messageError
      setLoading(false)
      notif(err , "danger")
      
    }
  },[state,setId])

  
  return (
    <Container onSubmit={onSubmitHandler}>
      <Input
      value={state.hour}
        type="text"
        name="hour"
        label="Hour"
        errpr={err.hour}
        onChange={onChangeHandler}
      />
      <Input
      value={state.minutes}
        type="text"
        name="minutes"
        label="Minutes"
        errpr={err.minutes}
        onChange={onChangeHandler}
      />
      <Input
      value={state.seconds}
        type="text"
        name="seconds"
        label="Seconds"
        errpr={err.seconds}
        onChange={onChangeHandler}
      />
      <Input
      value={state.url}
        type="text"
        name="url"
        label="Url"
        errpr={err.url}
        onChange={onChangeHandler}
      />
      <Button
        type="submit"
        disabled={
          loading ||
          (err?.hour.length > 0 ||
            err?.minutes.length > 0 ||
            err?.seconds.length > 0 ||
            err?.url.length > 0) ||
          (state?.hour.length <= 0 &&
            state?.minutes.length <= 0 &&
            state?.seconds.length <= 0) ||
          state?.url.length <= 0
        }
      >
        {loading ? <SpinnerLoading color={pallet.white} size={50}/> : 'Send'}
      </Button>
    </Container>
  );
};

const Container = styled.form`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 200px;
  @media (max-width:769px){
    padding-top: 0px;
    min-height: auto;
  }
`;

export default FORM;
