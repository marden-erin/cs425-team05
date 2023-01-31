import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { PageWrapper, SubTitle, H2 } from '../components';
import { COLORS, FONTS_SECONDARY } from '../constants';
import {
  SmallHalfRoundedButton,
  SmallRoundedButton,
  ThinInput,
} from '../components/simple-components';
import OWServiceProvider from '../OuterWhorldServiceProvider';

const Description= styled(SubTitle)`
  text-align: center;
  font-size: 3.5rem;
  font-weight: 200;
  color: ${COLORS.WHITE};
  `;
  
const Box= styled.div`
position: absolute;
width: 503px;
height: 234px;
left: 468px;
top: 300px;
background-color: ${COLORS.PURPLE_LIGHT};
border-radius: 22px;
`;

const SmallButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100px;
  align-items: center;
  gap: 175px;
`;

const Name = styled.div`
font: ${FONTS_SECONDARY};
font-weight: 500;
font-size: 3rem;
text-align: left;
color: ${COLORS.PURPLE_DARK};
padding-left: 30px;
padding-top: 30px;
`;

const InputBarWrapper = styled.div`
  display: flex;
  gap: 5px;
  padding: 2px 30px 30px;
`;

const SmallBoxWords = styled.div`
  font-size: 4rem;
  font-weight: 200;
  color: ${COLORS.WHITE};
  text-align: center;
`;

const OutPut = styled(H2)`
    font-size: 2rem;
    font-weight: 200;
    color: ${COLORS.WHITE};
    padding: 10px
`



function CreateCluster(){
    const userName = "andrei"
    const [input, setInput] = useState("")
    const visibility = false
    const [outPut, setOutput] = useState("")

    const loadData = async(e: any) => {
      e.preventDefault()
      const create = await OWServiceProvider.createCluster(input, userName, visibility)
      console.log(create)
      setOutput(create)
    }


    return(
        <PageWrapper pageTitle="createCluster" header="Create Your Cluster">
                <Description>Your cluster will contain books you want to save for later.</Description>
                <form onSubmit={loadData}>
                <Box>

                    <SmallButtonWrapper>
                    <SmallRoundedButton>
                        <SmallBoxWords>Public</SmallBoxWords>
                    </SmallRoundedButton>
                    <SmallRoundedButton>
                        <SmallBoxWords>Private</SmallBoxWords>
                    </SmallRoundedButton>
                    </SmallButtonWrapper>
                    <Name>
                       Name:
                    </Name>
                    <InputBarWrapper>
                    <ThinInput placeholder="Enter Cluster Name" value={input} 
                    onChange={(e) => setInput(e.target.value)}></ThinInput>
                    <SmallHalfRoundedButton>Continue</SmallHalfRoundedButton>
                    </InputBarWrapper>
                <OutPut>{outPut}</OutPut></Box></form>
                \{' '}
        </PageWrapper>
    );
}

export default CreateCluster;
