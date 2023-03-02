import React, { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import { pallet } from "../../layout/pallet";

interface btnProps {
  children: ReactNode;
}

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement> & btnProps> = ({
  children,
  ...props
}) => {
  return <Btn {...props}>{children}</Btn>;
};

const Btn = styled.button`
  font-size: 16px;
  width: 180px !important;
  height: 50px !important;
  border-radius: 1rem;
  border: 1px solid ${pallet.white};
  outline: none;
  margin: 15px 0px;
  background-color: ${pallet.lightBlue};
  color: ${pallet.white};
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: ${pallet.lightBlue};
    background-color: ${pallet.grayDark};
  }
  &:disabled {
    background-color: transparent;
    &:hover {
      color: ${pallet.white};
      cursor: no-drop;
    }
  }
`;

export default Button;
