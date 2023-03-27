import styled from 'styled-components';
import { PageWrapper, H1, Box, ThinInput, Label } from "../components";
import { COLORS } from '../constants';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { GetSnailImg } from '../utils';
import React, { useEffect, useState } from 'react';
import {useAuthUser } from 'react-auth-kit';

const FlexBoxWrapper = styled.div`
  height: 85vh;
  padding: 3vh;
  display: flex;
  flex-direction: column ;
  justify-content: center;
  align-items: center;
  gap: 35px;
`;

const PageTitle = styled(H1)`
  color: ${COLORS.WHITE};
  justify-content: center;
  text-align: center;
`;

const AccountBox = styled(Box)`
width: 40rem;
height: 60rem;
`
const AccountWrapper = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
justify-content: center;
align-items: center;
`
const LabelInputWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 5px;
`

const Img = styled.img`
  align-items: center;
  width: 15rem;
  height: 15rem;
  background-color: ${COLORS.PURPLE_LIGHTMID};
  border: 4px solid ${COLORS.PURPLE_MID};
  border-radius: 50%;
  margin: 10px
`;

export const ProfilePage = () => {
    const auth = useAuthUser();
    const username: string = auth()?.username;
    const [email, setEmail] = useState('');
    const [snailImage, setSnailImage] = useState('');
    const snailHealth = 3;
    const [isDisabled, setDisabled] = useState(true); 
    useEffect(() => {
        const loadData = async () => {
          const snailInfo = await OWServiceProvider.getSnailInfo(username);
          setSnailImage(GetSnailImg(snailInfo.color, snailHealth));
          const userInfo = await OWServiceProvider.getUserInformation(username);
        };
        loadData();
      });
return(
<PageWrapper pageTitle="Profile Page">
    <FlexBoxWrapper><PageTitle>My Account</PageTitle>
    <AccountBox>
    <AccountWrapper>
    <Img src={snailImage} alt="the users current snail"/>

        <LabelInputWrapper><Label>Username</Label>
        <ThinInput placeholder={username} disabled={isDisabled}/></LabelInputWrapper>

        <LabelInputWrapper><Label>Email</Label>
        <ThinInput placeholder={email} disabled={isDisabled}/></LabelInputWrapper>
        
        </AccountWrapper>
    </AccountBox>
    </FlexBoxWrapper>

</PageWrapper>
)

}

export default ProfilePage;