import { useState } from 'react';
import styled from 'styled-components'
import Hero from './components/Hero'
import Table from './components/Table'

const Home = () => {
  const [id, setId] = useState<string>("");
  return (
    <Container>
        <Hero id={id} setId={setId}/>
        <Table id={id}/>
    </Container>
  )
}


const Container = styled.section`
width:100vw;

`


export default Home