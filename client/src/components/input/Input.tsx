import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { pallet } from "../../layout/pallet";

interface InputProps {
  errpr?: string;
  label?: string;
}

const Input: React.FC<InputHTMLAttributes<HTMLInputElement> & InputProps> = ({
  errpr,
  label,
  ...props
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Inp {...props}/>
      <Err><Text>{errpr}</Text></Err>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom:5px;
`;

const Label = styled.label`
  font-size: 20px;
  height: 30px;
  width: 100%;
  text-align: left;
  margin-left: 30px;
  color:${pallet.white}
`;

const Inp = styled.input`
  font-size: 20px;
  width: 100%;
  height: 50px;
  border-radius: 1rem;
  padding: 10px;
  border: 1px solid transparent;
  outline: none;
  transition: 0.5s;
  :active {
    border: 1px solid green;
    transition: 0.5s;
  }
  :focus {
    transition: 0.5s;
    border: 1px solid green;
  }
`;
const Err = styled.span`
  font-size: 16px;
  width: 100%;
  height: 30px;
  text-align: left;
  margin-left: 30px;
  color: ${pallet.black};
  letter-spacing:1px;
`;

const Text = styled.span`
width:fit-content;
border-bottom:1px solid red;
padding-bottom:3px;
`

export default Input;
