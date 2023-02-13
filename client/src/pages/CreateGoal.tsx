import React from 'react';
import styled from 'styled-components';
import {
  LargeBookCard,
  LargeRoundedButton, // TODO: Swap to link once other PR merged
  P,
  PageWrapper,
} from '../components';
import { COLORS, FONTS_MAIN } from '../constants';
import SnailImage from '../imgs/snails/yellow-default.png'; // TODO: Change to utility function once other PR merged

const GridWrapper = styled.div`
  height: 85vh;
  padding: 3vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 35px;
`;

const GoalCard = styled.div`
  width: 50rem;
  height: 60rem;
  padding: 20px 15px;
  background-color: ${COLORS.PURPLE_XTRALIGHT};
  box-shadow: 10px 10px 10px #220d50;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SnailSection = styled.div`
    width: 100%;
    height: 18rem;
    border-radius: 15px;
    padding: 5px;
    background-color: ${COLORS.PURPLE_LIGHT};

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
`;

const SnailSectionRightWrapper = styled.div`
    width: 50%;
    height: 85%;
    text-align: center;

    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
    align-items: center;
`;

const H1 = styled.h1`
  font-family: ${FONTS_MAIN};
  font-style: italic;
  font-weight: 600;
  font-size: 2.4rem;
  line-height: 2.9rem;
  margin-bottom: 4px;
`;

function CreateGoal() {
    const snailName = "Snailosaurus"; // TODO: Get name from API
  return (
    <PageWrapper pageTitle="Create a Goal">
      <GridWrapper>
        <LargeBookCard
          bookTitle="This is the Title of a Book I could Write"
          authorName="Joe Jonas"
          bookCover=""
          genres={[
            'Horror',
            'Mystery',
            'Historical Fiction',
            "Children's Literature",
          ]}
        />
        <GoalCard>
          <H1>Create a Goal</H1>
          <SnailSection>
            <img
                src={SnailImage}
                alt="A happy yellow snail"
                width="190"
                className="snail animated"
            />
            <SnailSectionRightWrapper>
                <P><b>{snailName}</b> is ready to help you on your journey. Don't let them down!</P>
                <LargeRoundedButton>Set Goal</LargeRoundedButton>
            </SnailSectionRightWrapper>
          </SnailSection>
        </GoalCard>
      </GridWrapper>
    </PageWrapper>
  );
}

export default CreateGoal;
