import React, {useState} from 'react';
import styled from 'styled-components';

import PageWrapper from '../components/complex-components/PageWrapper/PageWrapper'; // *TODO: Fix so it imports from components
import { COLORS, FONTS_SECONDARY } from '../constants';
import {SmallHalfRoundedButton, SmallRoundedButton,ThinInput } from "../components/simple-components"
import OWServiceProvider from '../OuterWhorldServiceProvider';

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
const OutPut = styled.div`
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

  
  
    // just an example of how to use the API. If you don't include the bookTitle param you will be given an error
    const loadData = async(e: any) => {
      e.preventDefault()
      const create = await OWServiceProvider.createCluster(input, userName, visibility)
      console.log(create)
      setOutput(create)
    }


    return(
        <PageWrapper pageTitle="createCluster" header="Create Your Cluster">
            <HEADER>
                Your Cluster will contain the books you would like to save for later.
                </HEADER>

                <form onSubmit={loadData}>
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
                    <ThinInput placeholder="Enter Cluster Name" value={input} 
                    onChange={(e) => setInput(e.target.value)}></ThinInput>
                    <SmallHalfRoundedButton>Continue</SmallHalfRoundedButton>
                    </InputBarWrapper>
                <OutPut>{outPut}</OutPut></BOX></form>
              

\        </PageWrapper>
    );
}

export default CreateCluster;
