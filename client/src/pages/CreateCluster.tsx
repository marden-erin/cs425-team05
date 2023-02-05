import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import { H1, H2, P, PageWrapper, SubTitle } from '../components';
import { COLORS } from '../constants';
import {
  SmallHalfRoundedButton,
  LargeRoundedButton,
  ThinInput,
} from '../components/simple-components';
import OWServiceProvider from '../OuterWhorldServiceProvider';

const FlexBoxWrapper = styled.div`
  height: 85vh;
  padding: 3vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 35px;
`;
const ClusterBoxWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const PageTitle = styled(H1)`
  color: ${COLORS.WHITE};
  justify-content: center;
  text-align: center;
`;
const SmallHeading = styled(SubTitle)`
  font-size: 5rem;
`;

const ClusterBox = styled.div`
  width: 600px;
  height: 300px;
  background-color: ${COLORS.PURPLE_LIGHT};
  border-radius: 22px;
  margin-bottom: 250px;
`;
const InputBarWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 30px 30px;
`;

const SmallBoxWords = styled(H2)`
  font-size: 4rem;
  font-weight: 200;
  color: ${COLORS.WHITE};
  text-align: center;
`;
const LargeButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100px;
  align-items: center;
  gap: 200px;
  margin-top: 15px;
`;

const OutPut = styled(H2)`
  font-size: 2rem;
  font-weight: 200;
  color: ${COLORS.WHITE};
  padding: 10px;
`;

const Name = styled(H2)`
  font-size: 4rem;
  text-align: left;
  color: ${COLORS.PURPLE_DARK};
  margin-left: 30px;
  margin-top: 30px;
`;

function CreateCluster() {
  const userName = 'andrei';
  const [input, setInput] = useState('');
  const [visibility, setVisibilty] = useState(false);
  const [outPut, setOutput] = useState('');

  const loadData = async (e: any) => {
    e.preventDefault();
    const create = await OWServiceProvider.createCluster(
      input,
      userName,
      visibility
    );
    console.log(create);
    setOutput(create);
  };

  return (
    <PageWrapper pageTitle="Create Cluster">
      <FlexBoxWrapper>
        <HeadingWrapper>
          <PageTitle>Create Your Cluster</PageTitle>
          <SmallHeading>
            Your cluster will contain books you want to save for later.
          </SmallHeading>
        </HeadingWrapper>
        <ClusterBoxWrapper>
          <ClusterBox>
            <form onSubmit={loadData}>
              <LargeButtonWrapper>
                <LargeRoundedButton
                  type="button"
                  onClick={() => setVisibilty(true)}
                >
                  <SmallBoxWords>Public</SmallBoxWords>
                </LargeRoundedButton>

                <LargeRoundedButton
                  type="button"
                  onClick={() => setVisibilty(false)}
                >
                  <SmallBoxWords>Private</SmallBoxWords>
                </LargeRoundedButton>
              </LargeButtonWrapper>
              <Name>Name:</Name>
              <InputBarWrapper>
                <ThinInput
                  placeholder="Enter Cluster Name"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                ></ThinInput>
                <SmallHalfRoundedButton type="submit">
                  Continue
                </SmallHalfRoundedButton>
              </InputBarWrapper>
            </form>{' '}
            <OutPut>{outPut}</OutPut>
          </ClusterBox>
        </ClusterBoxWrapper>
      </FlexBoxWrapper>
    </PageWrapper>
  );
}
export default CreateCluster;
