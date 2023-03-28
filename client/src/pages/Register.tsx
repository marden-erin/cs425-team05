import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  LargeRoundedButton,
  Login_RegisterPageWrapper,
  ThickInput,
  H2,
  P,
  Label,
} from '../components';
import { COLORS } from '../constants';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { useIsAuthenticated } from 'react-auth-kit';

const RegisterContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0rem;
  width: 45rem;
  background-color: ${COLORS.PURPLE_LIGHT};
  border-radius: 25px;
  gap: 2rem;
  margin: auto;
  margin-block-start: 4rem;
  box-shadow: 0 0.188em 1.55em ${COLORS.BLACK};
`;

const RegisterInput = styled(ThickInput)`
  flex-grow: 0;
  border-radius: 5px;
`;

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  label {
    font-weight: bold;
  }
`;

const RegisterPromptH2 = styled(H2)`
  color: ${COLORS.BLACK};
  font-weight: 300;
`;

const ErrorMessageP = styled(P)`
  color: red;
`;

const buttonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disableContinue, toggleDisableContinue] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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

  const updateConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const checkPassword = () => {
    console.log(confirmPassword);
    console.log(password);
    console.log(confirmPassword === password);
    if (confirmPassword !== password) {
      setErrorMsg('Passwords must be matching!');
      setIsError(true);
      toggleDisableContinue(true);
    } else {
      setErrorMsg('');
      setIsError(false);
      toggleDisableContinue(false);
    }
  };

  const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await OWServiceProvider.registerUser(username, email, password);

    console.log(res.data);
    if (res.status === 200) {
      setIsRegistered(true);
    } else {
      setErrorMsg(res.data);
      setIsError(true);
      setIsRegistered(false);
    }

    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const redirectLogin = () => {
    navigate('/');
  };
  return (
    <Login_RegisterPageWrapper pageTitle="Register">
      <RegisterContainer onSubmit={handleSubmit}>
        {isRegistered ? (
          <>
            <RegisterPromptH2>Registration Successful!</RegisterPromptH2>
            <button
              id="register-redirect"
              onClick={redirectLogin}
              style={buttonStyle}
            >
              <RegisterPromptH2 style={{ color: COLORS.PURPLE_DARK }}>
                Login Now
              </RegisterPromptH2>
            </button>
          </>
        ) : (
          <>
            <RegisterPromptH2>Your Snail Awaits!</RegisterPromptH2>
            <RegisterWrapper>
              <Label htmlFor="register-email">Email</Label>
              <RegisterInput
                id="register-email"
                name="email"
                type="email"
                value={email}
                onChange={updateEmail}
              />
            </RegisterWrapper>
            <RegisterWrapper>
              <Label htmlFor="register-username">Username</Label>
              <RegisterInput
                id="register-username"
                name="username"
                type="text"
                value={username}
                onChange={updateUsername}
              />
            </RegisterWrapper>
            <RegisterWrapper>
              <Label htmlFor="register-password">Password</Label>
              <RegisterInput
                id="register-password"
                name="pwd"
                type="password"
                value={password}
                onChange={updatePassword}
              />
            </RegisterWrapper>
            <RegisterWrapper>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <RegisterInput
                id="confirm-password"
                name="confirm-pwd"
                type="password"
                value={confirmPassword}
                onChange={updateConfirmPassword}
                onBlur={checkPassword}
              />
            </RegisterWrapper>
            <LargeRoundedButton id="register-submit" disabled={disableContinue}>
              Create Account
            </LargeRoundedButton>
            {isError && <ErrorMessageP>{errorMsg}</ErrorMessageP>}
          </>
        )}
      </RegisterContainer>
    </Login_RegisterPageWrapper>
  );
}
export default Register;
