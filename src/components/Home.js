import React from 'react'
import styled from 'styled-components'
import Section from './Section'

function Home() {
  return (
    <Container>
        <Section 
          tittle="Model 3"
          description="Order Online for Touchless Delivery"
          backgroundImage="https://drive.google.com/uc?id=1T-9meSoh1Lg1vP30TdClvYO0ks3gtUYP"
          leftButtonText="customer order"
          rightButtonText="Existing inventory"
          DownArrows="https://drive.google.com/uc?id=15i5Os5GL77AVoRR1uD9MNbF6aIWDDgkc"
        />
        <Section 
          tittle="Model Y"
          description="Order Online for Touchless Delivery"
          backgroundImage="https://drive.google.com/uc?id=1C3PKeQKoOmCRPyELeDCuZc2lO2AYKaXH"
          leftButtonText="customer order"
          rightButtonText="Existing inventory"
        />
        <Section 
          tittle="Model S"
          description="Order Online for Touchless Delivery"
          backgroundImage="https://drive.google.com/uc?id=1t03o-AW2HJsMSsSW6UDaaFkoWtzinsyu"
          leftButtonText="customer order"
          rightButtonText="Existing inventory"
        />
        <Section 
          tittle="Model X"
          description="Order Online for Touchless Delivery"
          backgroundImage="https://drive.google.com/uc?id=1k5fGaYFRNVSnLGlOcNvQmi-vOe8GNV86"
          leftButtonText="customer order"
          rightButtonText="Existing inventory"
        />
        <Section 
          tittle="Solar Panels"
          description="Lowest Cost Solar Panels in America"
          backgroundImage="https://drive.google.com/uc?id=15iQz3dhNOhAYUphMXq_pVFxw69jGRsFX"
          leftButtonText="order now"
          rightButtonText="learn more"
        />
        <Section 
          tittle="Solar Roof"
          description="Solar Roof"
          backgroundImage="https://drive.google.com/uc?id=1V7qJT4iUQXx8xVPhvk1mVNyQghl928Fw"
          leftButtonText="order now"
          rightButtonText="learn more"
        />
        <Section 
          tittle="Accessories"
          description=""
          backgroundImage="https://drive.google.com/uc?id=1_aO8aPvXVtzPfduk4yhJw4sGskc5KmeO"
          leftButtonText="Shop now"
        />
    </Container>
  )
}

export default Home

const Container = styled.div`
    height: 100vh;
`