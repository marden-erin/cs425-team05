import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  LargeRoundedButton,
  Login_RegisterPageWrapper,
  ThickInput,
  H2,
  P,
  SmallRoundedButton,
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
  width: 450px;
  height: 600px;
  background-color: ${COLORS.PURPLE_LIGHT};
  border-radius: 25px;
  gap: 20px;
  margin: auto;
  margin-top: 4rem;
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

const ErrorMessageSpan = styled.span`
  font-size: 12px;
  color: red;
  font-weight: bold;
  align-self: start;
  margin-left: 115px;
  padding-right: 15px;

  &:invalid {
    display: none;
  }
`;

const RegisterLabel = styled(Label)`
  align-self: start;
  margin-left: 130px;
  font-weight: bold;
  margin-bottom: -15px;
`;

const OTPBox = styled.div`
  display: flex;
`;

const OTPInput = styled.input`
  width: 1em;
  padding: 0.75em;
  margin: 0.175em;
  text-align: center;
  border-radius: 0.35em;
  border: 0.175em solid ${COLORS.PURPLE_DARK};
  font-size: 2.5em;

  &:focus {
    border: 0.175em solid ${COLORS.BLACK};
    box-shadow: 0 0 0.1em 0.1em ${COLORS.PURPLE_MID};
    outline: none;
  }
`;

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [registerError, setRegisterError] = useState(false);
  const [registrationErrorMsg, setRegistrationErrorMsg] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const isAuthenticated = useIsAuthenticated();
  const [isOTP, setIsOTP] = useState(false);
  const [otpPin, setOtpPin] = useState<string[]>(Array(5).fill(''));
  const [isOTPButtonDisabled, setIsOTPButtonDisabled] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/home');
    }
  }, []);

  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const email = e.target.value;
    setEmail(email);

    if (re.test(email)) {
      setErrors({ ...errors, email: false });
    } else {
      setErrors({ ...errors, email: true });
    }
  };

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = new RegExp(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
    const password = e.target.value;
    setPassword(password);

    if (re.test(password)) {
      setErrors({ ...errors, password: false });
    } else {
      setErrors({ ...errors, password: true });
    }
  };

  const updateConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);

    if (confirmPassword === password) {
      setErrors({ ...errors, confirmPassword: false });
    } else {
      setErrors({ ...errors, confirmPassword: true });
    }
  };

  const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await OWServiceProvider.checkIfUserAlreadyRegistered(
      email,
      username
    );

    if (res.status === 200) {
      setIsOTP(true);
      setRegisterError(false);
    } else {
      setRegistrationErrorMsg(res.data);
      setRegisterError(true);
      setIsRegistered(false);
    }
  };

  const handleOTPSubmit = async (e: any) => {
    e.preventDefault();

    const parsedOTP = otpPin.join('');

    const res = await OWServiceProvider.validateOTP(email, parsedOTP);

    if (res.status === 200) {
      const res = await OWServiceProvider.registerUser(
        username,
        email,
        password
      );

      if (res.status === 200) {
        setIsRegistered(true);
      } else {
        setRegistrationErrorMsg(res.data);
        setRegisterError(true);
        setIsRegistered(false);
      }
    } else {
      setRegistrationErrorMsg('Error. Incorrect PIN, please try again');
      setRegisterError(true);
      setIsRegistered(false);
    }
  };

  const handleOTPChange = async (e: any, index: number) => {
    const newPin: string[] = Array.from(otpPin);

    newPin[index] = e.target.value;

    if (!newPin.includes('')) {
      setIsOTPButtonDisabled(false);
    } else {
      setIsOTPButtonDisabled(true);
    }

    setOtpPin(newPin);
  };

  useEffect(() => {
    const hasAllFields = email && username && password && confirmPassword;

    if (hasAllFields && Object.values(errors).every((v) => v === false)) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [errors, email, username, password, confirmPassword]);

  const redirectLogin = () => {
    navigate('/');
  };
  return (
    <Login_RegisterPageWrapper pageTitle="Register">
      <RegisterContainer onSubmit={handleSubmit}>
        {isRegistered ? (
          <>
            <RegisterPromptH2>Registration Successful!</RegisterPromptH2>
            <LargeRoundedButton id="register-redirect" onClick={redirectLogin}>
              Login Now
            </LargeRoundedButton>
          </>
        ) : (
          <>
            {isOTP ? (
              <>
                <RegisterPromptH2>Enter OTP</RegisterPromptH2>
                <OTPBox>
                  {[...Array(5)].map((e, i) => (
                    <OTPInput
                      onChange={(e) => handleOTPChange(e, i)}
                      type="text"
                      maxLength={1}
                    ></OTPInput>
                  ))}
                </OTPBox>
                <LargeRoundedButton
                  disabled={isOTPButtonDisabled}
                  onClick={handleOTPSubmit}
                >
                  Submit
                </LargeRoundedButton>
              </>
            ) : (
              <>
                <RegisterPromptH2>Your Snail Awaits!</RegisterPromptH2>
                <RegisterLabel htmlFor="register-email">Email</RegisterLabel>
                <RegisterInput
                  id="register-email"
                  type="email"
                  aria-describedby="email-error"
                  value={email}
                  placeholder="Email"
                  onChange={updateEmail}
                />
                {errors.email && (
                  <ErrorMessageSpan id="email-error">
                    Please enter a valid email
                  </ErrorMessageSpan>
                )}
                <RegisterLabel htmlFor="register-username">
                  Username
                </RegisterLabel>
                <RegisterInput
                  id="register-username"
                  type="text"
                  value={username}
                  placeholder="Username"
                  onChange={updateUsername}
                />
                <RegisterLabel htmlFor="register-password">
                  Password
                </RegisterLabel>
                <RegisterInput
                  id="register-password"
                  type="password"
                  aria-describedby="password-error"
                  value={password}
                  placeholder="Password"
                  onChange={updatePassword}
                />
                {errors.password && (
                  <ErrorMessageSpan id="password-error">
                    Password must have 6 to 16 characters and contain a special
                    character
                  </ErrorMessageSpan>
                )}
                <RegisterLabel htmlFor="register-confirm-password">
                  Confirm Password
                </RegisterLabel>
                <RegisterInput
                  id="register-confirm-password"
                  type="password"
                  aria-describedby="confirm-password-error"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={updateConfirmPassword}
                />
                {errors.confirmPassword && (
                  <ErrorMessageSpan id="confirm-password-error">
                    Passwords must match
                  </ErrorMessageSpan>
                )}

                <LargeRoundedButton
                  id="register-submit"
                  disabled={isButtonDisabled}
                >
                  Create Account
                </LargeRoundedButton>
              </>
            )}
            {registerError && (
              <ErrorMessageP>{registrationErrorMsg}</ErrorMessageP>
            )}
          </>
        )}
      </RegisterContainer>
    </Login_RegisterPageWrapper>
  );
}
export default Register;
