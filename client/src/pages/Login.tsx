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
  SmallRoundedButton,
  LargeRoundedLink,
} from '../components';
import { COLORS } from '../constants';
import YellowDefaultSnail from '../imgs/snails/yellow-default.png';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { useSignIn, useIsAuthenticated } from 'react-auth-kit';
import ReactModal from 'react-modal';
import { IoMdClose } from 'react-icons/io';
import { SmallHalfRoundedButton } from '../components';

const ColumnFlexCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginContainer = styled.div`
  ${ColumnFlexCss}
  justify-content: center;
  width: 450px;
  height: 400px;
  background-color: ${COLORS.PURPLE_LIGHT};
  border-radius: 25px;
  gap: 20px;
  margin: auto;
  margin-top: 20%;
  box-shadow: 0 0.188em 1.55em ${COLORS.BLACK};
`;

const LoginPromptH2 = styled(H2)`
  color: ${COLORS.BLACK};
  font-weight: normal;
`;

const LoginInput = styled(ThickInput)`
  flex-grow: 0;
  border-radius: 5px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  label {
    font-weight: bold;
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

const FlexBoxWrapper = styled.div`
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
  display: inline;
`;

const ForgotPasswordSpan = styled.span`
  font-size: 1.34rem;
  color: ${COLORS.PURPLE_DARK};
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const ModalContentWrapper = styled.div`
  display: flex;
  padding: 20px;
  gap: 4rem;
  align-items: center;
  justify-content: center;
`;

const RightModalContentWrapper = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h2 {
    text-align: center;
  }
`;

const OTPBox = styled.div`
  display: flex;
  justify-content: center;
`;

const OTPInput = styled.input`
  width: 0.5em;
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

const StyledSmallButton = styled(SmallRoundedButton)`
  position: fixed;
  right: 10px;
  top: 10px;
`;

const H2Clickable = styled(H2)`
  text-decoration: underline;
  color: ${COLORS.PURPLE_MID};

  &:hover {
    cursor: pointer;
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const [isModalOpen, toggleIsModalOpen] = useState(false);
  ReactModal.setAppElement('*');
  const [modalEmail, setModalEmail] = useState('');
  const [isOTP, setIsOTP] = useState(false);
  const [otpPin, setOtpPin] = useState<string[]>(Array(5).fill(''));
  const [isOTPButtonDisabled, setIsOTPButtonDisabled] = useState(true);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errors, setErrors] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isChangePasswordButtonDisabled, setIsChangePasswordButtonDisabled] =
    useState(true);
  const [isPasswordChanged, setIsPasswordChange] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/home');
    }
  }, []);

  useEffect(() => {
    const hasAllFields = newPassword && confirmNewPassword;

    if (hasAllFields && Object.values(errors).every((v) => v === false)) {
      setIsChangePasswordButtonDisabled(false);
    } else {
      setIsChangePasswordButtonDisabled(true);
    }
  }, [newPassword, confirmNewPassword]);

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

  const handleForgotPassword = () => {
    toggleIsModalOpen(true);
  };

  const handleModalSubmit = async () => {
    const res = await OWServiceProvider.createOTP(modalEmail);
    const { username } = await res.json();

    setUsername(username);

    setIsOTP(true);
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

  const handleOTPSubmit = async (e: any) => {
    e.preventDefault();

    const parsedOTP = otpPin.join('');

    const res = await OWServiceProvider.validateOTP(modalEmail, parsedOTP);

    if (res.status === 200) {
      setShowResetPassword(true);
    } else {
      setShowResetPassword(false);
    }
  };

  const handleModalClose = (e: any) => {
    e.preventDefault();

    toggleIsModalOpen(false);
    setIsOTP(false);
    setModalEmail('');
    setShowResetPassword(false);
    setIsPasswordChange(false);
  };

  const updateNewPassword = (e: any) => {
    const re = new RegExp(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
    const currVal = e.target.value;
    setNewPassword(currVal);

    if (re.test(currVal)) {
      setErrors({ ...errors, password: false });
    } else {
      setErrors({ ...errors, password: true });
    }
  };

  const updateConfirmNewPassword = (e: any) => {
    const currVal = e.target.value;
    setConfirmNewPassword(currVal);

    if (currVal === newPassword) {
      setErrors({ ...errors, confirmPassword: false });
    } else {
      setErrors({ ...errors, confirmPassword: true });
    }
  };

  const handleChangePassword = async (e: any) => {
    e.preventDefault();

    const { currency } = await OWServiceProvider.getUserInformation(username);
    const res = await OWServiceProvider.updateUserInformation(
      username,
      currency,
      newPassword
    );

    setIsPasswordChange(true);
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
            {isError && (
              <>
                <ErrorMessageP>{errorMessage}</ErrorMessageP>
              </>
            )}
            <LoginPromptH2>Let's Get Reading!</LoginPromptH2>
            <InputWrapper>
              <Label htmlFor="email-input">Email</Label>
              <LoginInput
                id="email-input"
                type="email"
                value={email}
                onChange={updateEmail}
              />
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="password-input">Password</Label>
              <LoginInput
                id="password-input"
                type="password"
                value={password}
                onChange={updatePassword}
              />
              <ForgotPasswordSpan onClick={handleForgotPassword}>
                Forgot password?
              </ForgotPasswordSpan>
            </InputWrapper>
            <LargeRoundedButton id="login-button" onClick={handleSubmit}>
              Login
            </LargeRoundedButton>
            <P>
              Don't have an account? <a href="/register">Register Now!</a>
            </P>
          </LoginContainer>
        </RightContentWrapper>
      </FlexBoxWrapper>
      <ReactModal
        isOpen={isModalOpen}
        className="modal-body"
        overlayClassName="modal-overlay"
      >
        <StyledSmallButton onClick={handleModalClose}>
          <IoMdClose />
        </StyledSmallButton>
        <ModalContentWrapper>
          <RightModalContentWrapper>
            {isOTP ? (
              <>
                {showResetPassword ? (
                  <>
                    {isPasswordChanged ? (
                      <>
                        <H2>Password Updated</H2>
                        <H2Clickable onClick={handleModalClose}>
                          Login Now!
                        </H2Clickable>
                      </>
                    ) : (
                      <>
                        {' '}
                        <H2> Enter New Password </H2>
                        <InputWrapper>
                          <Label htmlFor="new-password">New Password:</Label>
                          <ThickInput
                            name="new-password"
                            value={newPassword}
                            onChange={updateNewPassword}
                            type="password"
                          />
                        </InputWrapper>
                        {errors.password && (
                          <ErrorMessageP>
                            Password must have 6 to 16 characters and contain a
                            special character
                          </ErrorMessageP>
                        )}
                        <InputWrapper>
                          <Label htmlFor="confirm-new-password">
                            Confirm New Password:
                          </Label>
                          <ThickInput
                            name="confirm-new-password"
                            value={confirmNewPassword}
                            onChange={updateConfirmNewPassword}
                            type="password"
                          />
                        </InputWrapper>
                        {errors.confirmPassword && (
                          <ErrorMessageP>Passwords must match!</ErrorMessageP>
                        )}
                        <LargeRoundedButton
                          disabled={isChangePasswordButtonDisabled}
                          onClick={handleChangePassword}
                        >
                          Change Password
                        </LargeRoundedButton>{' '}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <H2>Enter OTP</H2>
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
                    </LargeRoundedButton>{' '}
                  </>
                )}
              </>
            ) : (
              <>
                <H2>Forgot Password</H2>
                <P>
                  We will send you a one time pin (OTP) to your email to reset
                  your password
                </P>
                <InputWrapper>
                  <Label htmlFor="snail-name">Email:</Label>
                  <ThickInput
                    name="email"
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                  />
                </InputWrapper>
                <LargeRoundedButton onClick={handleModalSubmit}>
                  Submit
                </LargeRoundedButton>
              </>
            )}
          </RightModalContentWrapper>
        </ModalContentWrapper>
      </ReactModal>
    </Login_RegisterPageWrapper>
  );
}
export default Login;
