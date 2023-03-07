import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  LargeRoundedButton,
  Login_RegisterPageWrapper,
  ThickInput,
  H2,
  P,
} from '../components';
import { COLORS } from '../constants';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { useIsAuthenticated } from 'react-auth-kit';

const RegisterContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const RegisterInput = styled(ThickInput)`
  flex-grow: 0;
  border-radius: 5px;
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
            <RegisterInput
              id="register-email"
              type="text"
              value={email}
              onChange={updateEmail}
              placeholder="email"
            />
            <RegisterInput
              id="register-username"
              type="text"
              value={username}
              onChange={updateUsername}
              placeholder="username"
            />
            <RegisterInput
              id="register-password"
              type="password"
              value={password}
              onChange={updatePassword}
              placeholder="password"
            />
            <LargeRoundedButton id="register-submit">
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
