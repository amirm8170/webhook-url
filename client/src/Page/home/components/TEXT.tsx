import styled from "styled-components";
import { pallet } from "../../../layout/pallet";

const TEXT = () => {
  return (
    <Container>
      <Title1>First Title</Title1>
      <Title2>Second Title</Title2>
      <Title3>Third Title</Title3>
      <Txt>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </Txt>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 200px 50px 0px 100px;
  color:${pallet.white};
  @media (max-width:1200px){
    padding: 200px 30px 0px 50px;
  }
  @media (max-width:768px){
    padding: 200px 20px 70px 20px;
    min-height: auto;
  }
`;

const Title1 = styled.h1`
  font-size: clamp(40px ,10vw,65px);
`;
const Title2 = styled.h2`
font-size: clamp(40px ,10vw,65px);
`;
const Title3 = styled.h3`
font-size: clamp(40px ,10vw,65px);
`;
const Txt = styled.p`
font-size: clamp(13px ,3vw,17px);
  line-height:1.5;
  padding-left:7px;
`;

export default TEXT;
