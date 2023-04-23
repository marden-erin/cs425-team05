import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import {
  H1,
  H2,
  H3,
  P,
  PageWrapper,
  Box,
  LargeRoundedButton,
  SnailImage,
  StarDisplay,
  SmallCloseButton,
  SubTitle,
} from '../components';
import { COLORS } from '../constants';
import { GetSnailImg, GetSnailStatusText } from '../utils';
import { useAuthUser } from 'react-auth-kit';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import ReactModal from 'react-modal';

const FlexWrapper = styled.div<{ $isModalOpen: boolean }>`
  display: flex;
  margin-block-start: 3rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 35px;

  ${(props) =>
    props.$isModalOpen &&
    css`
      pointer-events: none;
    `}
`;

const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  background: ${COLORS.PURPLE_LIGHT};
  border-radius: 15px;
`;
const ModalContentBox = styled(Box)`
  height: 20rem;
  width: 40rem;
  background-color: ${COLORS.PURPLE_XTRALIGHT};

  overflow: scroll;
`;

const SnailCard = styled.div`
  margin-top: 5%;
  width: 40rem;
  height: 50rem;
  padding: 20px 20px 25px;
  background-color: ${COLORS.PURPLE_XTRALIGHT};
  box-shadow: 10px 10px 10px #220d50;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin-block-start: 15px;
  }
`;
const SnailStatus = styled.div`
  margin-block-start: 10px;
  margin-top: 2.5rem;
  background-color: ${COLORS.PURPLE_LIGHT};
  width: 90%;
  padding: 15px 10px;
  border-radius: 15px;
  p {
    text-align: center;
    margin-block-end: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5rem;
  padding: 5px;
`;
const ModalButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 10rem;
  gap: 5rem;
`;
const ReviveSnail = styled(H3)`
  color: ${COLORS.BLACK};
  padding: 1rem;
`;

const ModalTitle = styled(H1)`
  font-size: 4rem;
`;
const SubHeader = styled(SubTitle)`
  color: ${COLORS.PURPLE_DARK};
  font-size: 1.8rem;
`;

function BurySnail() {
  const [isModalOpen, toggleIsModalOpen] = useState(false);
  ReactModal.setAppElement('*');
  const navigate = useNavigate();
  const auth = useAuthUser();
  const username = auth()?.username;
  const [snailName, setSnailName] = useState('');
  const [snailHealth, setSnailHealth] = useState(3);
  const [currency, setCurrency] = useState(9999);
  const [snailColor, setSnailColor] = useState('');
  const [goalsCompleted, setGoalsCompleted] = useState(0);
  const [goalsFailed, setGoalsFailed] = useState(0);
  const [snailAccessories, setSnailAccessories] = useState({});
  const [isSnailActive, setIsSnailActive] = useState(false);
  const [output, setOutput] = useState('');

  let snailInfo: any;
  useEffect(() => {
    const loadData = async () => {
      snailInfo = await OWServiceProvider.getSnailInfo(username);
      setSnailName(snailInfo.name);
      setSnailColor(snailInfo.color);
      setSnailHealth(snailInfo.health);
      setGoalsCompleted(snailInfo.goals_completed);
      setGoalsFailed(snailInfo.goals_failed);
      setSnailAccessories(snailInfo.accessories);
      setIsSnailActive(snailInfo.is_active);
      const stars = await OWServiceProvider.getUserInformation(username);
      setCurrency(stars.currency);
    };

    loadData();
  }, []);

  const handleRevive = async () => {
    let newCurrency = currency;

    if (currency >= 1000) {
      await OWServiceProvider.updateSnailInfo(
        username,
        snailName,
        snailColor,
        3,
        goalsCompleted,
        goalsFailed,
        snailAccessories,
        isSnailActive
      );
      newCurrency = currency - 1000;
      await OWServiceProvider.updateUserInformation(username, newCurrency);
      window.location.reload();
      toggleIsModalOpen(false);
    } else {
      setOutput('You do not have enough stars to revive this snail.');
      toggleIsModalOpen(false);
    }
  };

  return (
    <PageWrapper pageTitle="Bury Snail">
      <FlexWrapper $isModalOpen={isModalOpen}>
        <SnailCard>
          <SnailImage username={username} />
          <H2>{snailName}</H2>
          <SnailStatus>
            <P>
              <b>{snailName}</b> {GetSnailStatusText(snailHealth)}
            </P>
            <StarDisplay />
          </SnailStatus>
          {snailHealth === 0 && ( // Only show button if snail is dead
            <ButtonWrapper>
              <LargeRoundedButton
                onClick={() => {
                  navigate('/grave-adoption');
                }}
              >
                Bury Snail
              </LargeRoundedButton>
              <LargeRoundedButton onClick={() => toggleIsModalOpen(true)}>
                Revive Snail
              </LargeRoundedButton>
            </ButtonWrapper>
          )}
          <ReactModal
            isOpen={isModalOpen}
            className="modal-body"
            overlayClassName="modal-overlay"
          >
            <SmallCloseButton handler={toggleIsModalOpen} />
            <ModalContentWrapper>
              <ModalContentBox>
                <ModalTitle>Revive Snail?</ModalTitle>
                <ReviveSnail>
                  Reviving a snail will cost you 1000 stars.
                </ReviveSnail>
                <ReviveSnail>Do you still want to continue?</ReviveSnail>
                <ModalButtonWrapper>
                  <LargeRoundedButton onClick={() => handleRevive()}>
                    Yes
                  </LargeRoundedButton>
                  <LargeRoundedButton onClick={() => toggleIsModalOpen(false)}>
                    No
                  </LargeRoundedButton>
                </ModalButtonWrapper>
              </ModalContentBox>
            </ModalContentWrapper>
          </ReactModal>
          <SubHeader>{output}</SubHeader>
        </SnailCard>
      </FlexWrapper>
    </PageWrapper>
  );
}

export default BurySnail;
