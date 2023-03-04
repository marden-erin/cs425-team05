import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import {
  Login_RegisterPageWrapper,
  H2,
  ThickInput,
  LargeRoundedButton,
  AnimationPauseButton,
  P,
  Label,
} from '../components';
import { COLORS } from '../constants';
import YellowDefaultSnail from '../imgs/snails/yellow-default.png';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { useSignIn, useIsAuthenticated } from 'react-auth-kit';

const ColumnFlexCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const buttonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
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

const ErrorMessageP = styled(P)`
  color: red;
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/home');
    }
  }, []);

  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const res = await OWServiceProvider.authenticateUser(email, password);

    console.log(res);

    if (res.status === 200) {
      signIn({
        token: res.data.token,
        expiresIn: 1440,
        tokenType: 'Bearer',
        authState: { username: res.data.username },
      });

      navigate('/home');
    } else {
      setIsError(true);
      setErrorMessage('Error: Invalid Credentials');
    }
  };

  const handleRegister = async () => {
    navigate('/register');
  };

  return (
    <Login_RegisterPageWrapper pageTitle="Login">
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
            {isError && <ErrorMessageP>{errorMessage}</ErrorMessageP>}
            <LoginPromptH2>Let's Get Reading!</LoginPromptH2>
            <LoginInput
              id="email-input"
              type="text"
              value={email}
              onChange={updateEmail}
              placeholder="email"
            ></LoginInput>
            <LoginInput
              id="password-input"
              type="password"
              value={password}
              onChange={updatePassword}
              placeholder="password"
            ></LoginInput>
            <LargeRoundedButton id="login-button" onClick={handleSubmit}>
              Login
            </LargeRoundedButton>
            <button style={buttonStyle} onClick={handleRegister}>
              <P>
                Don't have an account?{' '}
                <Label style={{ cursor: 'pointer' }}>Register Now!</Label>
              </P>
            </button>
          </LoginContainer>
        </RightContentWrapper>
      </FlexBoxWrapper>
    </Login_RegisterPageWrapper>
  );
}
export default Login;
