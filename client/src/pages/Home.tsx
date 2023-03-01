import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';

import {
  H2,
  P,
  PageWrapper,
  AnimationPauseButton,
  SubTitle,
} from '../components';
import { COLORS } from '../constants';
import Logo from '../imgs/logo.png';
import YellowDefaultSnail from '../imgs/snails/yellow-default.png';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { useAuthUser } from 'react-auth-kit';

const ColumnFlexCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexBoxWrapper = styled.div`
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
  margin-right: 50px;

  .snail {
    animation-name: floating;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }

  @keyframes floating {
    0% {
      transform: translate(0, 0px);
    }
    50% {
      transform: translate(0, 15px);
    }
    100% {
      transform: translate(0, -0px);
    }
  }
`;

const LeftContentWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse; // Swaps visual order - Keyboard users will tab onto pause button immediately and can quickly turn off motion.
  align-items: end;
`;

const RightContentWrapper = styled.div`
  ${ColumnFlexCss}
  gap: 10px;

  > .subtitle {
    width: 475px;
  }
`;

const LoginContainer = styled.div`
  ${ColumnFlexCss}
  justify-content: center;
  width: 450px;
  height: 225px;
  background-color: ${COLORS.PURPLE_LIGHT};
  border-radius: 25px;
  gap: 20px;
  margin-top: 25px;
`;

const LoginPromptH2 = styled(H2)`
  color: ${COLORS.BLACK};
  font-weight: 300;
  font-style: italic;
`;

function Home() {
  // const auth = useAuthUser();

  // const username = auth()?.username;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const user = await OWServiceProvider.getUserInformation(username);

  //     if (user?.last_login === null) {
  //       console.log("First time login, should redirect to snail adoption page");
  //     }
  //   };

  //   fetchData();
  // }, []);

  // TODO: Add quick links to important pages where login placeholder used to be
  return (
    <PageWrapper pageTitle="OuterWhorld">
      <FlexBoxWrapper>
        <LeftContentWrapper>
          <AnimationPauseButton />
          <img
            src={YellowDefaultSnail}
            alt="A happy yellow snail"
            width="400"
            className="snail animated"
          />
        </LeftContentWrapper>
        <RightContentWrapper>
          <h1>
            <img src={Logo} alt="OuterWhorld" width="400" />
          </h1>
          <SubTitle className="subtitle">
            Adopt and feed an astronaut snail by reading books you love!
          </SubTitle>
          <LoginContainer>
            <LoginPromptH2>Let's get Reading!</LoginPromptH2>
          </LoginContainer>
        </RightContentWrapper>
      </FlexBoxWrapper>
    </PageWrapper>
  );
}

export default Home;
