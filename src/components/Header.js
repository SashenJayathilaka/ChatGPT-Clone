import React, { useState } from 'react'
import styled from 'styled-components'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { selectCars } from '../features/Car/carSlice';
import { useSelector } from 'react-redux';

const Header = () => {

  const [burgersOpen, setBureStates] = useState(false);
  const cars = useSelector(selectCars)

  return (
    <Container>
      <a>
        <img src='https://drive.google.com/uc?id=1gHqC-87TFqAhzC3iZUgprTxxXo0b-m6L' alt='' />
      </a>
      <Menu>
        {cars && cars.map((car, index) => (
          <a key={index} href='#'>{car}</a>
        ))};
        <a href='#'>Solar Roof</a>
        <a href='#'>Solar Panels</a>
      </Menu>
      <RightMenue>
        <a href='#'>Shop</a>
        <a href='#'>Account</a>
        <CustomMenu onClick={() => setBureStates(true)} />
      </RightMenue>
      <BurgerNav show={burgersOpen}>
        <CloseWrapper>
          <CustomClose onClick={() => setBureStates(false)}/>
        </CloseWrapper>
        <li><a href='#'></a>Existing Inventory</li>
        <li><a href='#'></a>Used Inventory</li>
        <li><a href='#'></a>Trade-In</li>
        <li><a href='#'></a>Test Drive</li>
        <li><a href='#'></a>Insurance</li>
        <li><a href='#'></a>Cybertruck</li>
        <li><a href='#'></a>Roadster</li>
        <li><a href='#'></a>Semi</li>
        <li><a href='#'></a>Charging</li>
        <li><a href='#'></a>Powerwall</li>
      </BurgerNav>
    </Container>
  )
}

export default Header


const Container = styled.div`
  min-height: 60px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  a {
    margin: 10px;
    font-weight: 600;
    text-transform: uppercase;
    margin-right: 10px
    flex-wrap: nowrap;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const RightMenue = styled.div`
  display: flex;
  align-items: center;
  a {
    font-weight: 600;
    text-transform: uppercase;
    margin-right: 10px
  }
`

const CustomMenu = styled(MenuIcon)`
  cursor: pointer;
`


const BurgerNav = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  width: 300px;
  z-index: 16;
  list-style: none;
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: start;
  cursor: pointer;
  transform: ${props => props.show ? 'translateX(0)': 'translateX(100%)'};
  transition: transform 0.2s;

  li{
    padding: 15px 0;
    border-bottom: 1px solid rgba(0, 0, 0, .2);

    a {
      font-weight: 600;
    }
  }
`

const CustomClose = styled(CloseIcon)`
  cursor: pointer;
`

const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`