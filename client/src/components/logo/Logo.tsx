import React from 'react'
import styled from 'styled-components'
import { pallet } from '../../layout/pallet'

const Logo = () => {
  return (
    <LOGO href='/'>Logo</LOGO>
  )
}


const LOGO = styled.a`
position:absolute;
top:10px;
left:40px;
font-family : FontLogo;
color:${pallet.pink};
font-size:70px;
z-index:10;
@media (max-width:400px){
  font-size:50px;
  left:20px;

}
`

export default Logo