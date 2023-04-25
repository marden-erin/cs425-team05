import React from 'react';
import styled, { css } from 'styled-components';
import { PageWrapper } from '../PageWrapper';
import { COLORS } from '../../../constants';
import YellowDefaultSnail from '../../../imgs/snails/yellow-default.png';
import PinkDefaultSnail from '../../../imgs/snails/pink-default.png';
import BlueDefaultSnail from '../../../imgs/snails/blue-default.png';
import { H1 } from '../../simple-components';
import { AnimationPauseButton } from '../Media';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${COLORS.BLUE_DARK};

  .loading {
    position: absolute;
    margin-left: 42%;
    margin-top: 30rem;
    width: 10%;
    animation: circle 3s linear infinite;
  }
  .one {
    animation-delay: -1s;
  }

  .two {
    animation-delay: -2s;
  }

  .three {
    animation-delay: -3s;
  }

  @keyframes circle {
    0% {
      transform: rotate(0deg) translateX(-100px);
    }
    100% {
      transform: rotate(360deg) translateX(-100px) rotate(-360deg);
    }
  }
`;

const Loading = styled(H1)`
  color: ${COLORS.WHITE};
  position: absolute;
  bottom: 0;
  left: 40%;
  padding-bottom: 6rem;
`;
const PauseButton = styled.div`
  position: absolute;
  top: 55rem;
  right: 55rem;
`;

export const LoadingPage = () => {
  return (
    <Background>
      <div>
        <PauseButton>
          <AnimationPauseButton />
        </PauseButton>
        <img
          src={YellowDefaultSnail}
          alt="A happy yellow snail"
          width="100"
          className="loading animated one"
        />
        <img
          src={PinkDefaultSnail}
          alt="A happy pink snail"
          width="100"
          className="loading animated two"
        />
        <img
          src={BlueDefaultSnail}
          alt="A happy blue snail"
          width="100"
          className="loading animated three"
        />
      </div>
      <Loading>Loading...</Loading>
    </Background>
  );
};
