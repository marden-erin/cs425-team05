import styled, { css } from 'styled-components';
import {
  LoginPageWrapper,
  H2,
  ThickInput,
  LargeRoundedButton,
  AnimationPauseButton,
  SubTitle,
} from '../components';
import { COLORS } from '../constants';
import Logo from '../imgs/logo.png';
import YellowDefaultSnail from '../imgs/snails/yellow-default.png';

const ColumnFlexCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoStyle = {
  textAlign: 'center' as const,
};

const LoginContainer = styled.div`
  ${ColumnFlexCss}
  justify-content: center;
  width: 450px;
  height: 350px;
  background-color: ${COLORS.PURPLE_LIGHT};
  border-radius: 25px;
  gap: 20px;
  margin: auto;
  margin-top: 20%;
  box-shadow: 0 0.188em 1.55em ${COLORS.BLACK};
`;

const LoginPromptH2 = styled(H2)`
  color: ${COLORS.BLACK};
  font-weight: 300;
  font-style: italic;
`;

const LoginInput = styled(ThickInput)`
  flex-grow: 0;
  border-radius: 5px;
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

function Login() {
  return (
    <LoginPageWrapper pageTitle="Login">
      <div style={LogoStyle}>
        <h1>
          <img src={Logo} alt="OuterWhorld" width="400" />
        </h1>
        <SubTitle className="subtitle">
          Adopt and feed an astronaut snail by reading books you love!
        </SubTitle>
      </div>
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
          <LoginContainer>
            <LoginPromptH2>Let's Get Reading!</LoginPromptH2>
            <LoginInput type="text" placeholder="email"></LoginInput>
            <LoginInput type="password" placeholder="password"></LoginInput>
            <LargeRoundedButton>Login</LargeRoundedButton>
          </LoginContainer>
        </RightContentWrapper>
      </FlexBoxWrapper>
    </LoginPageWrapper>
  );
}
export default Login;
