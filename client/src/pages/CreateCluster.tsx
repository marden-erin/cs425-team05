import { useState, useCallback } from 'react';
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

const InputBarWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 30px 30px;
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



const Input = styled.input`
  appearance: none;
  width: 15px;
  height: 15px;
  border: 2px solid ${COLORS.PURPLE_MID};
  padding: 1px;
  border-radius: 10%;
  background-clip: content-box;
  cursor: pointer;
  margin-right: 5px;

  :checked {
    background-color: ${COLORS.PURPLE_MID};
  }

  :hover {
    background-color: ${COLORS.PURPLE_LIGHTMID};
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
  height: 15rem;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  background: ${COLORS.PURPLE_LIGHT}; 
  border: 10px solid ${COLORS.PURPLE_XTRALIGHT}

`;

function CreateCluster() {
  const auth = useAuthUser();
  const navigate = useNavigate();
  const userName = auth()?.username;
  const [input, setInput] = useState('');
  const [visibility, setVisibilty] = useState(false);

  const toggle = useCallback(
    () => setVisibilty(state => !state),
    [setVisibilty],
  );

  const loadData = async (e: any) => {
    e.preventDefault();
    const create = await OWServiceProvider.createCluster(
      input,
      userName,
      visibility
    );
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
              <QuestionWrapper>
                <form onSubmit={loadData}>

                  <CustomLabel htmlFor="cluster-name">Name</CustomLabel>
                  <InputBarWrapper>
                    <ThinInput
                      name="cluster-name"
                      placeholder="Enter Cluster Name"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    ></ThinInput>
                    <SmallHalfRoundedButton type="submit">
                      Create Cluster
                    </SmallHalfRoundedButton>
                  </InputBarWrapper>
                      <Visibility>
                        <Input
                          type="checkbox"
                          value="true"
                          name="visibility"
                          onClick={toggle}
                        />
                        By checking this I agree to make this Cluster visible to other users.
                      </Visibility>
                </form>{' '}
              </QuestionWrapper>
          </ContentWrapper>
        </ClusterBoxWrapper>
      </FlexBoxWrapper>
    </PageWrapper>
  );
}
export default CreateCluster;
