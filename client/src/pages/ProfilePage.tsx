import styled, { css } from 'styled-components';
import { PageWrapper, H1, Box, ThinInput, Label, H2 } from '../components';
import { COLORS } from '../constants';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { GetSnailImg } from '../utils';
import React, { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';

const FlexBoxWrapper = styled.div`
  height: 85vh;
  padding: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
`;

const PageTitle = styled(H1)`
  color: ${COLORS.WHITE};
  text-align: center;
  padding-top: 3rem;
`;

const AccountBox = styled(Box)`
  width: 50rem;
  height: 60rem;
  display: flex;
  flex-direction: row;
  margin-top: -10px;
`;
const AccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  height: 60rem;
  width: 20rem;
  border-radius: 10px;
  background-color: ${COLORS.BLUE_MID};
`;
const LabelInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
`;
const InputWrapper = styled.div`
  display: flex;
  gap: 5px;
  width: 20rem;
`;

const Img = styled.img`
  align-items: center;
  width: 20rem;
  height: 20rem;
  background-color: ${COLORS.PURPLE_LIGHTMID};
  border: 4px solid ${COLORS.PURPLE_MID};
  border-radius: 50%;
  margin-bottom: 3rem;
`;

const CurrentSnailState = styled.img`
  width: 10rem;
  height: 10rem;
  margin-left: 5rem;
`;

const AccountHeader = styled(H2)`
  display: inline;
  border-bottom: 2px solid;
  padding-right: 1rem;
  padding-left: 1rem;
  text-align: center;
`;
const StyledLabel = styled(Label)`
  font-size: 1.8rem;
`;
const LinkStyle = css`
  width: 15rem;
  height: 5rem;
  border: none;
  background-color: ${COLORS.BLUE_MID};
  transition: background-color 0.3s ease-out;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: ${COLORS.BLUE_DARK};
  }
`;
const SideBarHeaders = styled(H2)`
  ${LinkStyle};
  color: ${COLORS.WHITE};
  font-size: 3rem;
  margin-top: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  border-radius: 10px;

  background-color: ${COLORS.PURPLE_XTRALIGHT};
`;

// Used to limit the movement of the snail between Account and Snail changes
//TODO: Find a better way to do this and replace
const Temp = styled.div`
  display: flex;
  gap: 5px;
  width: 20rem;
  margin-bottom: 5rem;
`;

export const ProfilePage = () => {
  const auth = useAuthUser();
  const username: string = auth()?.username;
  const [email, setEmail] = useState('');
  const [proSnailImage, setProSnailImage] = useState(GetSnailImg('yellow', 3));
  const [snailName, setSnailName] = useState('');
  const [snailHealth, setSnailHealth] = useState(3);
  const [snailImage, setSnailImage] = useState(GetSnailImg('yellow', 3));
  const [goalsComp, setGoalsComp] = useState(0);
  const [goalsFail, setGoalsFail] = useState(0);

  const ProfileHealth = 3;

  const [accountShown, setAccountShown] = useState(true);
  const [snailShown, setSnailShown] = useState(false);
  const [statsShown, setStatsShown] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const snailInfo = await OWServiceProvider.getSnailInfo(username);
      setProSnailImage(GetSnailImg(snailInfo.color, ProfileHealth));
      setSnailName(snailInfo.name);
      setSnailHealth(snailInfo.health);
      setSnailImage(GetSnailImg(snailInfo.color, snailHealth));
      setGoalsComp(snailInfo.goals_completed);
      
      setGoalsFail(snailInfo.goals_failed);
      const userInfo = await OWServiceProvider.getUserInformation(username);
      setEmail(userInfo.email);
    };
    loadData();
  });

  const handleAccountClick = () => {
    setAccountShown(true);
    setSnailShown(false);
    setStatsShown(false);
  };
  const handleSnailClick = () => {
    setSnailShown(true);
    setAccountShown(false);
    setStatsShown(false);
  };
  const handleStatClick = () => {
    setStatsShown(true);
    setAccountShown(false);
    setSnailShown(false);
  };

  return (
    <PageWrapper pageTitle="Profile Page">
      <FlexBoxWrapper>
        <PageTitle>My Account</PageTitle>

        <AccountBox>
          <SideBarWrapper>
            <SideBarHeaders onClick={() => handleAccountClick()}>
              Account
            </SideBarHeaders>
            <SideBarHeaders onClick={() => handleSnailClick()}>
              Snails
            </SideBarHeaders>
            <SideBarHeaders onClick={() => handleStatClick()}>
              Stats
            </SideBarHeaders>
          </SideBarWrapper>
          <AccountWrapper>
            {accountShown && (
              <Wrapper>
                <Img
                  src={proSnailImage}
                  alt="the users current snail at full heath"
                />

                <AccountHeader>Account Information</AccountHeader>
                <LabelInputWrapper>
                  <StyledLabel>Username</StyledLabel>
                  <InputWrapper>
                    <ThinInput placeholder={username} disabled={true} />
                  </InputWrapper>
                </LabelInputWrapper>

                <LabelInputWrapper>
                  <StyledLabel>Email</StyledLabel>
                  <InputWrapper>
                    <ThinInput placeholder={email} disabled={true} />
                  </InputWrapper>
                </LabelInputWrapper>

                <LabelInputWrapper>
                  <StyledLabel>Password</StyledLabel>
                  <Temp>
                    <ThinInput placeholder="********" disabled={true} />
                  </Temp>
                </LabelInputWrapper>
              </Wrapper>
            )}

            {snailShown && (
              <Wrapper>
                <Img
                  src={proSnailImage}
                  alt="the users current snail at full heath"
                />

                <AccountHeader>Snail Information</AccountHeader>
                <LabelInputWrapper>
                  <StyledLabel>Snail Name</StyledLabel>
                  <InputWrapper>
                    <ThinInput placeholder={snailName} disabled={true} />
                  </InputWrapper>
                </LabelInputWrapper>

                <LabelInputWrapper>
                  <StyledLabel>Snail Health</StyledLabel>
                  <InputWrapper>
                    <ThinInput
                      placeholder={String(snailHealth)}
                      disabled={true}
                    />
                  </InputWrapper>
                </LabelInputWrapper>

                <LabelInputWrapper>
                  <StyledLabel>Your Snail's Current State</StyledLabel>
                  <InputWrapper>
                    <CurrentSnailState
                      src={snailImage}
                      alt="the users snail at their current health"
                    />
                  </InputWrapper>
                </LabelInputWrapper>
              </Wrapper>
            )}

            {statsShown && (
              <Wrapper>
                <Img
                  src={proSnailImage}
                  alt="the users current snail at full heath"
                />

                <AccountHeader>User Stats</AccountHeader>
                <LabelInputWrapper>
                  <StyledLabel>Goals Completed</StyledLabel>
                  <InputWrapper>
                    <ThinInput
                      placeholder={String(goalsComp)}
                      disabled={true}
                    />
                  </InputWrapper>
                </LabelInputWrapper>

                <LabelInputWrapper>
                  <StyledLabel>Goals Failed</StyledLabel>
                  <InputWrapper>
                    <ThinInput
                      placeholder={String(goalsFail)}
                      disabled={true}
                    />
                  </InputWrapper>
                </LabelInputWrapper>

                <LabelInputWrapper>
                  <StyledLabel>Snails Killed</StyledLabel>
                  <InputWrapper>
                    <ThinInput
                      placeholder="add number of dead snails here"
                      disabled={true}
                    />
                  </InputWrapper>
                </LabelInputWrapper>
              </Wrapper>
            )}
          </AccountWrapper>
        </AccountBox>
      </FlexBoxWrapper>
    </PageWrapper>
  );
};

export default ProfilePage;
