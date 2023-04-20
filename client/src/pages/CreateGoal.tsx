import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { useLocation } from 'react-router-dom';
import { Book } from '../../../server/src/utils/Types';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Label,
  LargeBookCard,
  LargeRoundedButton, // TODO: Swap to link once other PR merged
  P,
  PageWrapper,
} from '../components';
import { COLORS, FONTS_SECONDARY } from '../constants';

import { GetSnailImg, NumberOfDaysUntilDate } from '../utils';
import { useNavigate } from 'react-router-dom';
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
  const auth = useAuthUser();
  const username: string = auth()?.username;

  const navigate = useNavigate();
  const today = new Date();
  const twoWeeksAhead = new Date();
  twoWeeksAhead.setDate(today.getDate() + 14);
  const [startDate, setStartDate] = useState(twoWeeksAhead); // Set start date to be two weeks ahead by default
  const [numDays, setNumDays] = useState(14); // Two weeks = 14 days
  const tempStart = startDate.toDateString();
  const [cardBook, setCardBook] = useState({} as Book);
  const [notes, setNotes] = useState('');

  const location = useLocation();
  //userInput is what the user typed into search bar
  const numPages = location.state.pageCount;
  const cover = location.state.cover;
  const title = location.state.title;
  const author = location.state.author;
  const description = location.state.description;
  const c = cover.toString();
  const p = numPages.toString();
  const t = title.toString();
  const d = description.toString();
  const a = author.toString();
  const [snailName, setSnailName] = useState('');
  const [snailImage, setSnailImage] = useState('');
  const [snailHealth, setSnailHealth] = useState(3);

  const bookTemp: Book = {
    title: t,
    authors: a,
    pageCount: p,
    description: d,
    cover: c,
  };

  useEffect(() => {
    const loadData = async () => {
      const snailInfo = await OWServiceProvider.getSnailInfo(username);
      setSnailName(snailInfo.name);

      // setSnailHealth(snailInfo.health); // TODO
      setSnailImage(GetSnailImg(snailInfo.color, snailHealth));

      // TODO: Get goal info
    };
    loadData();
  }, []);

  const handleSubmit = async () => {
    const goal = await OWServiceProvider.createGoal(
      bookTemp,
      username,
      notes,
      0,
      tempStart
    );
    navigate('/view-goals');
  };

  return (
    <PageWrapper pageTitle="Create a Goal">
      <GridWrapper>
        <LargeBookCard
          bookTitle={title}
          authorName={author}
          bookCover={
            <img
              src={cover}
              alt={title + ' book cover'}
              style={{ maxWidth: '100%', height: '100%' }}
            />
          }
          description={description}
          tempFunction=""
          CreateGoalFunction=""
          AddClusterFunction=""
          showButtons={false}
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
                    // if (newDate < today) {
                    //   // If the new date is in the past, it's invalid
                    //   console.log('This date is in the past!');
                    // } else {
                      setStartDate(newDate);
                      setNumDays(NumberOfDaysUntilDate(newDate));
                    }
                  //}
                }}
              />
            </DeadlineWrapper>
            <P>
              With this deadline, you will have{' '}
              <b>
                {Math.ceil(numDays)} day{Math.ceil(numDays) !== 1 && 's'}
              </b>{' '}
              to complete your goal.
            </P>
            <P>
              On average, you will need to read{' '}
              <b>{Math.ceil(numPages / numDays)} pages</b> per day.
            </P>
          </GoalInfoWrapper>
          <NotesWrapper>
            <Label htmlFor="goal-notes">Notes (Optional)</Label>
            <textarea
              name="goal-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </NotesWrapper>
          <SnailSection>
            <img
              src={snailImage}
              alt={snailName + ' , a happy'}
              width="190"
              className="snail"
            />
            <SnailSectionRightWrapper>
              <P>
                <b>{snailName}</b> is ready to help you on your journey. Don't
                let them down!
              </P>
              <LargeRoundedButton onClick={handleSubmit}>
                Set Goal
              </LargeRoundedButton>
            </SnailSectionRightWrapper>
          </SnailSection>
        </GoalCard>
      </GridWrapper>
    </PageWrapper>
  );
}

export default CreateGoal;
