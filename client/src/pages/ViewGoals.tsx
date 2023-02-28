import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { COLORS } from '../constants';
import styled from 'styled-components';
import { PageWrapper } from '../components';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { GetSnailImg, GetSnailStatusText } from '../utils';
import { GoalCard, H2, LargeRoundedButton, P } from '../components';

const FlexWrapper = styled.div`
  height: 75vh;
  padding: 3vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 35px;
`;

const SnailCard = styled.div`
  width: 40rem;
  padding: 25px 15px;
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
  background-color: ${COLORS.PURPLE_LIGHT};
  width: 90%;
  padding: 15px 10px;

  p {
    text-align: center;
  }
`;

const GoalsCard = styled.div`
  width: 70rem;
  padding: 20px 15px 25px;
  background-color: ${COLORS.PURPLE_XTRALIGHT};
  box-shadow: 10px 10px 10px #220d50;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GoalsWrapper = styled.div`
  width: 65rem;
  background-color: ${COLORS.PURPLE_LIGHT};
  margin-block-start: 2rem;
`;

function ViewGoals() {
  const [snailName, setSnailName] = useState('');
  const [snailImage, setSnailImage] = useState('');
  const [snailHealth, setSnailHealth] = useState(3);

  useEffect(() => {
    const loadData = async () => {
      const snailInfo = await OWServiceProvider.getSnailInfo('andrei');
      console.log(snailInfo);
      setSnailName(snailInfo.name);
      // setSnailHealth(snailInfo.health); // TODO
      setSnailImage(GetSnailImg(snailInfo.color, snailHealth));
      //TODO: Set snail health
    };
    loadData();
  });
  return (
    <PageWrapper pageTitle="Goals" header="Goals">
      <FlexWrapper>
        <SnailCard>
          <img
            src={snailImage}
            width="250"
            height="250"
            alt={'An image of ' + snailName}
          />
          <H2>{snailName}</H2>
          <SnailStatus>
            <P>
              <b>{snailName}</b> {GetSnailStatusText(snailHealth)}
            </P>
          </SnailStatus>
          {snailHealth === 0 && ( // Only show button if snail is dead
            <LargeRoundedButton>Go to the Graveyard</LargeRoundedButton>
          )}
        </SnailCard>
        {snailHealth !== 0 && ( // Don't show Goals if snail is dead
          <GoalsCard>
            <H2>Active Goals</H2>
            <GoalsWrapper>
              <GoalCard dueDate={new Date()}></GoalCard>
            </GoalsWrapper>
          </GoalsCard>
        )}
      </FlexWrapper>
    </PageWrapper>
  );
}

export default ViewGoals;
