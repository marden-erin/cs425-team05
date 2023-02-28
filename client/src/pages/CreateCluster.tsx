import React, { useState } from 'react';
import styled from 'styled-components';
import { H1, H2, P, PageWrapper, SubTitle } from '../components';
import { COLORS } from '../constants';
import {
  SmallHalfRoundedButton,
  ThinInput,
} from '../components/simple-components';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { useAuthUser } from 'react-auth-kit';

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
  background-color: ${COLORS.PURPLE_XTRALIGHT};
  border-radius: 22px;
  border: 2px solid ${COLORS.PURPLE_MID};
`;
const InputBarWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 30px 30px;
`;

const LargeButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100px;
  align-items: center;
  gap: 200px;
`;

const OutPut = styled(H2)`
  font-size: 2rem;
  font-weight: 200;
  color: ${COLORS.PURPLE_DARK};
  padding: 35px;

  text-align: center;
`;

const Name = styled(H2)`
  font-size: 3rem;
  text-align: left;
  color: ${COLORS.PURPLE_DARK};
  margin-left: 30px;
`;

const VisWords = styled(H2)`
  font-size: 3rem;
  text-align: center;
  color: ${COLORS.PURPLE_DARK};
  margin-left: 50px;
`;
const Visibility = styled(P)`
  font-size: 2.5rem;
  text-align: left;
  color: ${COLORS.PURPLE_DARK};
  margin-left: 30px;
  margin-bottom: 20px;
`;

const VisibilityButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px;
  gap: 40px;
`;

const Input = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 4px solid ${COLORS.PURPLE_MID};
  border-radius: 50%;
  padding: 2px;
  background-clip: content-box;
  margin-bottom: -1px;
  cursor: pointer;

  :checked {
    background-color: ${COLORS.PURPLE_MID};
  }

  :hover {
    background-color: ${COLORS.PURPLE_MID};
  }
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;
const ContentWrapper = styled.div`
  display: flex;
  padding: 25px 50px;
  height: 350px;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  background: ${COLORS.PURPLE_LIGHT};
`;

function CreateCluster() {
  const auth = useAuthUser();

  const userName = auth()?.username;
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
          {' '}
          <ContentWrapper>
            <ClusterBox>
              <QuestionWrapper>
                <form onSubmit={loadData}>
                  <VisWords>Choose the visiblity for your cluster:</VisWords>
                  <LargeButtonWrapper>
                    <VisibilityButtonWrapper>
                      <Visibility>
                        <Input
                          type="radio"
                          value="true"
                          name="visibility"
                          onClick={() => setVisibilty(true)}
                        />
                        Public
                      </Visibility>
                      <Visibility>
                        <Input
                          type="radio"
                          value="false"
                          name="visibility"
                          onClick={() => setVisibilty(false)}
                        />
                        Private
                      </Visibility>
                    </VisibilityButtonWrapper>
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
              </QuestionWrapper>
              <OutPut>{outPut}</OutPut>
            </ClusterBox>
          </ContentWrapper>
        </ClusterBoxWrapper>
      </FlexBoxWrapper>
    </PageWrapper>
  );
}
export default CreateCluster;
