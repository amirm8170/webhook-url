import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { pallet } from "../../../layout/pallet";
import Api from "../../../services/Api";
import CountdownTimer from "./CountdownTimer";

interface props {
  item: {
    _id: string;
    webhookUrl: string;
    secondsLeft: number;
  };
  setList: React.Dispatch<SetStateAction<any>>;
}

const TableRow = ({ item, setList }: props) => {
  const { _id, secondsLeft, webhookUrl } = item;
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Api.get("/get-all-timers");
        setList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [available,setList]);

  return (
    <>
      {available ? (
        <Row>
          <Id>{_id}</Id>
          <Url>{webhookUrl}</Url>
          <CountdownTimer
            setAvailable={setAvailable}
            secondsLeft={secondsLeft+1}
          />
        </Row>
      ) : null}
    </>
  );
};

const Row = styled.div`
  width: 100%;
  height: 100px;
  border-bottom: 0.1px solid #4873f2;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: 0.5s;
  cursor: pointer;
  color: ${pallet.white};
  &:hover {
    background-color: ${pallet.lightBlue};
    border-radius: 0px 0px 1rem 1rem;
  }
`;

const Id = styled.span`
width: 40%;
margin-right: 2.5%;
  text-align: left;
  padding-left: 20px;
  @media (max-width: 768px) {
    width: 70%;
    padding-left: 0px;
  }
`;
const Url = styled.span`
width: 40%;
margin-right: 2.5%;
margin-left: 2.5%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 768px) {
    display:none;
  }
`;

export default TableRow;
