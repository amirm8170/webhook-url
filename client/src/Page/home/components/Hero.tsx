import { memo, SetStateAction, useCallback } from "react";
import styled from "styled-components";
import Button from "../../../components/button/Button";
import Logo from "../../../components/logo/Logo";
import CopyCut from "../../../icons/copy-cut";
import { pallet } from "../../../layout/pallet";
import notif from "../../../utils/notif";
import FORM from "./FORM";
import TEXT from "./TEXT";

interface show {
  show:string
}

interface props {
  id:string,
  setId:React.Dispatch<SetStateAction<string>>
}

const Hero = ({ id , setId}:props) => {

  // to copy Id when user Enter
  const CopyHandler = useCallback(()=>{
    navigator.clipboard.writeText(id);
    notif('The id was copied' , 'info')
  },[id])

  
  return (
    <Container>
      <Logo />
      <ImageContainer style={{ backgroundImage: "url(/images/bg.webp)" }}>
      </ImageContainer>
      <Content>
        <Text>
          <TEXT />
        </Text>
        <Form>
          <Modal show={id}>
            <ModalTextContainer>
              <ModalText>Your Timer Id</ModalText>
              <ModalText>{id}</ModalText>
              <div onClick={CopyHandler}><CopyCut width={20} height={20}/></div>
              <Button onClick={()=>setId('')}>OK</Button>
            </ModalTextContainer>
          </Modal>
          <FORM setId={setId} />
        </Form>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
`;

const ImageContainer = styled.div`
  width: 100vw;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: blur(60px);
`;

const Content = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  @media (max-width: 769px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Text = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  @media (max-width: 1500px) {
    width: 60%;
  }
  @media (max-width: 769px) {
    width: 100%;
  }
`;
const Form = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  padding-right: 100px;
  @media (max-width: 1500px) {
    width: 40%;
  }
  @media (max-width: 1200px) {
    padding-right: 30px;
  }
  @media (max-width: 769px) {
    width: 100%;
    padding-right: 0px;
  }
`;

const Modal = styled.div<show>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity:${props=>props.show.length>0 ? 1 : 0};
  visibility:${props=>props.show.length>0 ? 'visible' : 'hidden'};
  transition:.5s;
  &:after {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    content: "";
    background-color: rgb(0, 0, 0, 0.4);
    filter: blur(30px);
    z-index:-1;
  }
`;

const ModalTextContainer = styled.div`
  width: 300px;
  background-color: ${pallet.grayDark};
  border:2px solid ${pallet.lightBlue};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-bettwen;
  align-items: center;
  padding:10px;
  padding-bottom:0px;
  box-shadow: rgba(255, 255, 255, 0.25) 0px 54px 55px,
    rgba(255, 255, 255, 0.45) 0px -12px 30px,
    rgba(255, 255, 255, 0.45) 0px 4px 6px,
    rgba(255, 255, 255, 0.45) 0px 12px 13px,
    rgba(255, 255, 255, 0.5) 0px -3px 5px;
`;

const ModalText = styled.span`
color:${pallet.white};
margin-bottom:10px;
`

export default memo(Hero);
