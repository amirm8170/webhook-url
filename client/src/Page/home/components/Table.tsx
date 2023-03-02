import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../../components/button/Button";
import SpinnerLoading from "../../../icons/SpinnerLoading";
import { pallet } from "../../../layout/pallet";
import Api from "../../../services/Api";
import TableRow from "./TableRow";

interface itemType {
  _id: string;
  webhookUrl: string;
  secondsLeft: number;
}
interface Tableprops {
  id: string;
}

const Table = ({ id }: Tableprops) => {
  const [filterItem, setFilterItem] = useState({ id: "", url: "" });
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [finishedData, setFinishedData] = useState<number | null | string>(null);
  const filteredData = list?.filter(
    (item: any) =>
      item._id?.toLowerCase().includes(filterItem.id?.toLowerCase()) &&
      item?.webhookUrl?.toLowerCase().includes(filterItem?.url?.toLowerCase())
  );

  const changeHandler = useCallback(
    (e: any) => {
      const { name, value } = e.target;
      setFilterItem({ ...filterItem, [name]: value });
      if (!value && !filteredData.length) {
        setFinishedData(null);
      }
    },
    [filterItem, filteredData]
  );

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await Api.get("/get-all-timers");
        setList(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  const checkHandler = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        const response = await Api.get(`/get-timer-status/${filterItem.id}`);
        setFinishedData(response.data.secondsLeft);
      } catch (error: any) {
        setFinishedData(error.response.data.error.messageError);
      }
    },
    [setFinishedData, filterItem.id]
  );

  return (
    <Container>
      {loading ? (
        <SpinContainer>
          <SpinnerLoading color={pallet.pink} size={100} />
        </SpinContainer>
      ) : (
        <>
          <Title>Active Timers</Title>
          <Row1>
            <TitleId onChange={changeHandler} name="id" placeholder="id" />
            <TitleUrl onChange={changeHandler} name="url" placeholder="Url" />
            <TitleTime>Remain</TitleTime>
          </Row1>
          {filteredData.length ? (
            filteredData.map((item: itemType, index: number) => {
              return <TableRow key={index} item={item} setList={setList} />;
            })
          ) : finishedData === null && !filteredData.length  && filterItem.id.length ? (
            <Check>
              <Text>Your timer maybe finished before. Check it online</Text>
              <Button onClick={checkHandler}>Check Online</Button>
            </Check>
          ) : finishedData === "Invalid ID!" ? (
            <Check><ErrText>{finishedData}</ErrText></Check>
          ) :finishedData=== 0 ? (
            <Check>
              <Text>{filterItem.id}</Text>
              <Text2>Finished</Text2>
            </Check>
          ) :             <Check>
          <Text>You can search and check it online just with ID</Text>
        </Check>}
        </>
      )}
    </Container>
  );
};

const Container = styled.section`
  width: 100vw;
  margin-top: 200px;
  padding: 0px 30px;
  margin-bottom: 50px;
  @media (max-width: 500px) {
    padding: 0px 15px;
  }
`;

const Title = styled.h1`
  font-size: clamp(35px, 10vw, 70px);
  margin-bottom: 40px;
  color: ${pallet.pink};
  text-align: left;
  font-wight: 700;
  @media (max-width: 500px) {
    text-align: center;
  }
`;

const Row1 = styled.div`
  width: 100%;
  height: 50px;
  border-bottom: 0.1px solid #4873f2;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: 0.5s;
  cursor: pointer;
  color: ${pallet.white};
`;

const TitleId = styled.input`
  width: 40%;
  margin-right: 2.5%;
  height: 30px;
  border-radius: 1rem;
  text-align: left;
  padding-left: 20px;
  border: none;
  color: ${pallet.lightBlue};
  @media (max-width: 768px) {
    width: 70%;
    padding-left: -10px;
  }
`;
const TitleUrl = styled.input`
  width: 40%;
  margin-right: 2.5%;
  margin-left: 2.5%;
  height: 30px;
  border-radius: 1rem;
  text-align: left;
  padding-left: 20px;
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
  :placeholder {
    color: ${pallet.lightBlue};
  }
  color: ${pallet.lightBlue};
  @media (max-width: 768px) {
    display:none;
  }
`;
const TitleTime = styled.span`
  width: 20%;
  margin-left: 2.5%;
  height: 30px;
  text-align: center;
  color: ${pallet.lightBlue};
  @media (max-width: 768px) {
    width: 30%;
  }
`;
const ErrText = styled.span`
  color: red;
  font-size:20px;

`;

const SpinContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Check = styled.div`
  width: 100%;
  height: 100px;
  border-bottom: 0.1px solid #4873f2;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transition: 0.5s;
  cursor: pointer;
  color: ${pallet.white};
  @media (max-width:600px){
    padding-top:10px;
    flex-direction:column;
    justify-content: center;
  }
  &:hover {
    background-color: ${pallet.lightBlue};
    border-radius: 0px 0px 1rem 1rem;
  }
`;
const Text = styled.span`
  font-size: clamp(13px ,2.6vw , 25px);
`;
const Text2 = styled.span`
  font-size: 25px;
  color: red;
`;

export default Table;
