import { useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { H1, Label, P, PageWrapper, SubTitle } from '../components';
import { COLORS } from '../constants';
import {
  SmallHalfRoundedButton,
  ThinInput,
} from '../components/simple-components';
import OWServiceProvider from '../OuterWhorldServiceProvider';

const FlexBoxWrapper = styled.div`
  height: 85vh;
  padding: 3vh;
  display: flex;
  flex-flow: column wrap;
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
  font-size: 2rem;
`;

const ClusterBox = styled.div`
  display: flex;
  justify-content: center;
  width: 45rem;
  height: 30rem;
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

const CustomLabel = styled(Label)`
  font-size: 2.4rem;
  font-weight: bold;
  text-align: left;
  color: ${COLORS.PURPLE_DARK};
  margin-left: 3rem;
`;

const Visibility = styled(P)`
  font-size: 2rem;
  text-align: left;
  color: ${COLORS.PURPLE_DARK};
  margin-left: 3rem;
  margin-bottom: 2rem;
`;

const VisibilityButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
  margin-top: 4rem;
`;
const ContentWrapper = styled.div`
  display: flex;
  padding: 3rem 5rem;
  height: 37rem;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  background: ${COLORS.PURPLE_LIGHT};
`;

function CreateCluster() {
  const auth = useAuthUser();
  const navigate = useNavigate();
  const userName = auth()?.username;
  const [input, setInput] = useState('');
  const [visibility, setVisibilty] = useState(false);

  const loadData = async (e: any) => {
    e.preventDefault();
    await OWServiceProvider.createCluster(input, userName, visibility);
    navigate('/view-clusters');
  };

  return (
    <PageWrapper pageTitle="Create Cluster">
      <FlexBoxWrapper>
        <HeadingWrapper>
          <PageTitle>Create Your Cluster</PageTitle>
          <SmallHeading>
            Clusters contain books you want to save for later.
          </SmallHeading>
        </HeadingWrapper>

        <ClusterBoxWrapper>
          {' '}
          <ContentWrapper>
            <ClusterBox>
              <QuestionWrapper>
                <form onSubmit={loadData}>
                  <CustomLabel htmlFor="visibility">
                    Cluster Visibility
                  </CustomLabel>
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
                  <CustomLabel htmlFor="cluster-name">Name</CustomLabel>
                  <InputBarWrapper>
                    <ThinInput
                      name="cluster-name"
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
            </ClusterBox>
          </ContentWrapper>
        </ClusterBoxWrapper>
      </FlexBoxWrapper>
    </PageWrapper>
  );
}
export default CreateCluster;
