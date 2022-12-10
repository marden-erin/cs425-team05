import React from 'react';
import styled from 'styled-components';

import PageWrapper from '../components/complex-components/PageWrapper/PageWrapper'; // *TODO: Fix so it imports from components
import { COLORS, FONTS_SECONDARY } from '../constants';
import {SmallHalfRoundedButton, SmallRoundedButton, Input } from "../components/simple-components"

const HEADER= styled.div`
  text-align: center;
  font-size: 4rem;
  font-weight: 200;
  color: ${COLORS.WHITE};
  `;

const BOX= styled.div`
position: absolute;
width: 503px;
height: 234px;
left: 468px;
top: 300px;
background: rgba(202, 200, 231, 0.8);
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

const NAME = styled.div`
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

function CreateCluster(){
    return(
        <PageWrapper pageTitle="createCluster" header="Create Your Cluster">
            <HEADER>
                Your Cluster will contain the books you would like to save for later.
                <BOX>
                    <SmallButtonWrapper>
                    <SmallRoundedButton>
                        <SmallBoxWords>Public</SmallBoxWords>
                    </SmallRoundedButton>
                    <SmallRoundedButton>
                        <SmallBoxWords>Private</SmallBoxWords>
                    </SmallRoundedButton>
                    </SmallButtonWrapper>
                    <NAME>
                       Name:
                    </NAME>
                    <InputBarWrapper>
                    
                    <Input placeholder="Enter Cluster Name" />
                    <SmallHalfRoundedButton>Continue</SmallHalfRoundedButton>

                    </InputBarWrapper>
                </BOX>

            </HEADER>
        </PageWrapper>
    );
}

export default CreateCluster;
