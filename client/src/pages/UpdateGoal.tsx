import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Label,
  LargeBookCard,
  LargeRoundedButton, // TODO: Swap to link once other PR merged
  P,
  PageSlider,
  PageWrapper,
} from '../components';
import { COLORS, FONTS_SECONDARY } from '../constants';
import { GetSnailImg, NumberOfDaysUntilDate } from '../utils';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { useAuthUser } from 'react-auth-kit';


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
  padding: 20px 15px;
  background-color: ${COLORS.PURPLE_XTRALIGHT};
  box-shadow: 10px 10px 10px #220d50;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GoalInfoWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  align-items: center;
  height: 8.5rem;
`;

const DeadlineWrapper = styled.div`
  display: flex;
  align-items: center;
  label {
    white-space: nowrap; // Prevents text wrapping
    font-weight: bold;
  }
  .datepicker {
    font-size: 1.6rem;
  }
  * + * {
    margin-inline-start: 4px;
  }
`;

const SnailSection = styled.div`
  width: 100%;
  height: 19rem;
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
  font-style: italic;
  font-weight: 600;
  font-size: 2.4rem;
  line-height: 2.9rem;
  margin-block-end: 8px;
`;

const NotesWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding: 10px 0px 20px;
  label {
    white-space: nowrap; // Prevents text wrapping
    font-weight: bold;
    margin-block-end: 4px;
  }
  input {
    margin-block-end: 4px;
  }
  .textarea-wrapper {
    display: flex;
    flex-direction: column;
  }
  textarea {
    ${FONTS_SECONDARY};
    font-size: 1.6rem;
    width: 27rem;
    height: 15rem;
    border: 2px solid ${COLORS.PURPLE_MID};
    border-radius: 5px;
    resize: none; // Prevents from resizing so notes aren't too long to save
  }
`;

function UpdateGoal() {
  const navigate = useNavigate();
  const auth = useAuthUser();
  const username = auth()?.username;
  const [snailName, setSnailName] = useState('');
  const [snailImage, setSnailImage] = useState('');
  const [snailHealth, setSnailHealth] = useState(3);

  useEffect(() => {
    const loadData = async () => {
      const snailInfo = await OWServiceProvider.getSnailInfo(username);
      console.log(snailInfo);
      setSnailName(snailInfo.name);
      // setSnailHealth(snailInfo.health); // TODO
      setSnailImage(GetSnailImg(snailInfo.color, snailHealth));

     
      // TODO: Get goal info
    };
    loadData();
  });
  const dueDate = new Date('May 17, 2023'); // TODO
  const numDays = NumberOfDaysUntilDate(dueDate); // TODO
  const numPagesTotal = 392; // TODO: Get page number from book info
  const [numPagesRead, setNumPagesRead] = useState(140); // TODO: Get from goal
  const pagesPerDay = Math.ceil((numPagesTotal - numPagesRead) / numDays);


  
  return (
    <PageWrapper pageTitle="Create a Goal">
      <GridWrapper>
        <LargeBookCard
          bookTitle="This is the Title of a Book I could Write"
          authorName={['Joe Jonas']}
          bookCover={
            <img
              src="https://i.pinimg.com/originals/a1/f8/87/a1f88733921c820db477d054fe96afbb.jpg"
              style={{ maxWidth: '100%' }}
              alt={'' + ' book cover'}
            />
          }
          AddClusterFunction=''
           CreateGoalFunction=''
          description=""
          tempFunction=""
          showButtons={false}
        />
        <GoalCard>
          <H1>Update Goal</H1>
          <GoalInfoWrapper>
            <DeadlineWrapper>
              <P>
                Due Date: <b>{dueDate.toLocaleDateString()}</b>
              </P>
            </DeadlineWrapper>
            <P>
              You have <b>{numDays}</b> days left to finish this goal.
            </P>
            <P>
              On average, you need to read{' '}
              <b>
                {pagesPerDay} page{pagesPerDay !== 1 && 's'}
              </b>{' '}
              per day.
            </P>
          </GoalInfoWrapper>
          <NotesWrapper>
            <PageSlider label="Pages Read" max={numPagesTotal} />
            <div className="textarea-wrapper">
              <Label htmlFor="goal-notes">Notes</Label>
              <textarea name="goal-notes" />
            </div>
          </NotesWrapper>
          <SnailSection>
            <img
              src={snailImage}
              alt={snailName + ' cheering for you to complete your goal'}
              width="190"
              className="snail"
            />
            <SnailSectionRightWrapper>
              <P>
                <b>{snailName}</b> is cheering for you. Don't let them down!
              </P>
              <LargeRoundedButton
                onClick={() => {
                  navigate('/view-goals');
                }}
              >
                Update Goal
              </LargeRoundedButton>
            </SnailSectionRightWrapper>
          </SnailSection>
        </GoalCard>
      </GridWrapper>
    </PageWrapper>
  );
}

export default UpdateGoal;
