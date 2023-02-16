import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Label,
  LargeBookCard,
  LargeRoundedButton, // TODO: Swap to link once other PR merged
  P,
  PageWrapper,
} from '../components';
import { COLORS, FONTS_MAIN, FONTS_SECONDARY } from '../constants';
import { NumberOfDaysUntilDate } from '../utils';
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
  margin-bottom: 8px;
`;

const NotesWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  padding: 20px;
  label {
    white-space: nowrap; // Prevents text wrapping
    font-weight: bold;
    margin-bottom: 4px;
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

function CreateGoal() {
  const snailName = 'Snailosaurus'; // TODO: Get name from API
  const [startDate, setStartDate] = useState(new Date());
  const [numDays, setNumDays] = useState(0);
  const numPages = 392; // TODO: Get page number from book info
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
          <GoalInfoWrapper>
          <DeadlineWrapper>
            <Label htmlFor="deadline-datepicker">Goal Deadline</Label>
            <DatePicker // TODO: Look into console error
              name="deadline-datepicker"
              className="datepicker"
              selected={startDate}
              onChange={(newDate) => {
                if (newDate) {
                    const today = new Date();
                    if (newDate < today) { // If the new date is in the past, it's invalid
                        console.log("This date is in the past!");
                    }
                    else {
                        setStartDate(newDate);
                        setNumDays(NumberOfDaysUntilDate(newDate));
                    }
                }
              }}
            />
          </DeadlineWrapper>
          <P>
            With this deadline, you will have <b>{numDays} days</b> to complete
            your goal.
          </P>
          <P>
            On average, you will need to read <b>{numPages / numDays} pages</b>{' '}
            per day.
          </P>
          </GoalInfoWrapper>
          <NotesWrapper>
          <Label htmlFor="goal-notes">Notes (Optional)</Label>
          <textarea name="goal-notes" />
          </NotesWrapper>
          <SnailSection>
            <img
              src={SnailImage}
              alt="A happy yellow snail"
              width="190"
              className="snail animated"
            />
            <SnailSectionRightWrapper>
              <P>
                <b>{snailName}</b> is ready to help you on your journey. Don't
                let them down!
              </P>
              <LargeRoundedButton>Set Goal</LargeRoundedButton>
            </SnailSectionRightWrapper>
          </SnailSection>
        </GoalCard>
      </GridWrapper>
    </PageWrapper>
  );
}

export default CreateGoal;
