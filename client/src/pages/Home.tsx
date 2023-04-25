import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { updateSnailStatus } from '../utils/SnailHealthUtils';
import { useAuthUser } from 'react-auth-kit';
import OWServiceProvider from '../OuterWhorldServiceProvider';

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

const WelcomeContainer = styled.div`
  ${ColumnFlexCss}
  justify-content: center;
  width: 450px;
  height: 225px;
  background-color: ${COLORS.PURPLE_XTRALIGHT};
  border-radius: 25px;
  gap: 0.4rem;
  margin-top: 25px;
`;

const WelcomePromptH2 = styled(H2)`
  color: ${COLORS.BLACK};
  font-weight: 300;
  font-style: italic;
`;

const Link = styled.a`
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.8rem;
  font-weight: bold;
  padding: 1.2rem 2rem;
  transition: background-color 0.3s ease-out;
  :hover {
    background-color: ${COLORS.PURPLE_LIGHT};
  }
`;

function Home() {
  const auth = useAuthUser();
  const username = auth()?.username;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await updateSnailStatus(username);

      switch (res) {
        case 'dne':
          navigate('/snail-adoption');
          break;
        case 'dead':
          navigate('/bury-snail');
          break;
        case 'failed':
          navigate('/failed-goal');
          break;
        default:
          break;
      }
    };

    fetchData();
  }, []);

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
          <WelcomeContainer>
            <WelcomePromptH2>Let's get Reading!</WelcomePromptH2>
            <Link href="/">Account 🡪</Link>
            <Link href="/view-clusters">View Clusters 🡪</Link>
            <Link href="/view-goals">View Goals 🡪</Link>
          </WelcomeContainer>
        </RightContentWrapper>
      </FlexBoxWrapper>
    </PageWrapper>
  );
}

export default Home;
