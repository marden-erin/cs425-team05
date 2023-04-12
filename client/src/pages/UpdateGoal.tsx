import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import { useAuthUser } from 'react-auth-kit';
import { useLocation } from 'react-router-dom';
import {
  FoodSelectCard,
  H2,
  Label,
  LargeBookCard,
  LargeRoundedButton, // TODO: Swap to link once other PR merged
  P,
  PageSlider,
  PageWrapper,
  SmallRoundedButton,
} from '../components';
import { COLORS, FONTS_SECONDARY } from '../constants';
import {
  GetSnailImg,
  GetEatingSnailImg,
  NumberOfDaysUntilDate,
  ApplyFoodAffect,
  GetFoodAffectText,
} from '../utils';
import OWServiceProvider from '../OuterWhorldServiceProvider';

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

const Radio = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
`;

const FoodModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  h2 {
    text-align: center;
    font-size: 2.6rem;
    margin-block-end: 0.6rem;
  }
  span {
    font-size: 1.8rem;
    margin-block-end: 2.5rem;
  }
  button {
    margin-block-start: 6.2rem;
  }
`;

const FeedingModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 40rem;
  padding: 2rem;
  text-align: center;
`;

const ProgressModalWrapper = styled.div``;

function UpdateGoal() {
  const navigate = useNavigate();
  const auth = useAuthUser();
  const username = auth()?.username;
  const [snailName, setSnailName] = useState('');
  const [snailColor, setSnailColor] = useState('');
  const [snailImage, setSnailImage] = useState('');
  const [eatingSnailImage, setEatingSnailImage] = useState('');
  const [snailHealth, setSnailHealth] = useState(3);
  const [foodColor, setFoodColor] = useState('');
  const [goalsCompleted, setGoalsCompleted] = useState(0);
  const [goalsFailed, setGoalsFailed] = useState(0);
  const [snailAccessories, setSnailAccessories] = useState({});
  const [isSnailActive, setIsSnailActive] = useState(false);

  const location = useLocation();

  const goalID = location.state.goalID;
  const tempGoalId = parseInt(goalID);
  const numPagesTotal = location.state.pageCount;
  const pagesRead = location.state.pagesRead;
  const cover = location.state.cover;
  const title = location.state.title;
  const author = location.state.author;
  const description = location.state.description;
  const deadline = location.state.deadline;
  const goalNotes = location.state.goalNotes;
  const [notes, setNotes] = useState(goalNotes);
  useEffect(() => {
    const loadData = async () => {
      const snailInfo = await OWServiceProvider.getSnailInfo(username);
      setSnailName(snailInfo.name);
      setSnailColor(snailInfo.color);
      setSnailHealth(snailInfo.health);
      setSnailImage(GetSnailImg(snailColor, snailHealth));
      setEatingSnailImage(GetEatingSnailImg(snailColor, foodColor));
      setGoalsCompleted(snailInfo.goals_completed);
      setGoalsFailed(snailInfo.goals_failed);
      setSnailAccessories(snailInfo.accessories);
      setIsSnailActive(snailInfo.is_active)
    };
    loadData();
  });
  const dueDate = new Date(deadline);
  const numDays = NumberOfDaysUntilDate(dueDate);
  const [numPagesRead, setNumPagesRead] = useState<number>(pagesRead);
  const pagesPerDay = Math.ceil((numPagesTotal - numPagesRead) / numDays);
  const pagesLeft = Math.ceil(numPagesTotal - numPagesRead);

  // NO CLOSE BUTTON ON MODALS - We don't want the user to "undo" feeding the snail
  const [isFoodChoiceModalOpen, toggleIsFoodChoiceModalOpen] = useState(false);
  const [isFeedingModalOpen, toggleIsFeedingModalOpen] = useState(false);
  ReactModal.setAppElement('*');

  //// slider temp fix
  const [sliderValue, setSliderValue] = useState(numPagesRead);

  const handleSubmit = async () => {
    const newPagesRead: number = +sliderValue;

    // If goal completed, close out goal
    if (newPagesRead === numPagesTotal[0]) {
      toggleIsFoodChoiceModalOpen(true);
    } else {
      // Not done - Update progress
      await OWServiceProvider.updateGoal(
        tempGoalId,
        notes,
        newPagesRead,
        false
      );
      navigate('/view-goals');
    }
  };

  return (
    <PageWrapper pageTitle="Create a Goal">
      <GridWrapper>
        <ReactModal
          isOpen={isFoodChoiceModalOpen}
          className="modal-body"
          overlayClassName="modal-overlay"
        >
          <FoodModalContentWrapper>
            <H2>Congrats! You completed your goal!</H2>
            <span>Select what you would like to feed your snail</span>
            <Radio>
              <FoodSelectCard
                color="red"
                name="food-selection"
                result={foodColor}
                changeResult={setFoodColor}
              />
              <FoodSelectCard
                color="purple"
                name="food-selection"
                result={foodColor}
                changeResult={setFoodColor}
              />
              <FoodSelectCard
                color="green"
                name="food-selection"
                result={foodColor}
                changeResult={setFoodColor}
              />
            </Radio>
            <LargeRoundedButton
              onClick={() => {
                toggleIsFoodChoiceModalOpen(false);
                toggleIsFeedingModalOpen(true);
                ApplyFoodAffect(
                  foodColor,
                  tempGoalId,
                  username,
                  snailName,
                  snailColor,
                  snailHealth,
                  goalsCompleted,
                  goalsFailed,
                  snailAccessories,
                  isSnailActive,
                  notes,
                  numPagesTotal,
                );
              }}
            >
              Continue
            </LargeRoundedButton>
          </FoodModalContentWrapper>
        </ReactModal>
        <ReactModal
          isOpen={isFeedingModalOpen}
          className="modal-body"
          overlayClassName="modal-overlay"
        >
          <FeedingModalContentWrapper>
            <img
              src={eatingSnailImage}
              alt={
                snailName + ' enjoying a yummy ' + { foodColor } + 'mushroom'
              }
              width="350"
              height="350"
            />
            <P>
              You did it! You completed your goal for reading <b>{title}</b>.
            </P>
            <P>You fed your snail a bright {foodColor} mushroom. Yum!</P>
            <P>{snailName + ' ' + GetFoodAffectText(foodColor)}</P>
            <SmallRoundedButton
              onClick={() => {
                navigate('/view-goals');
              }}
            >
              Return to Goals Page
            </SmallRoundedButton>
          </FeedingModalContentWrapper>
        </ReactModal>
        <LargeBookCard
          bookTitle={title}
          authorName={[author]}
          bookCover={
            <img
              src={cover}
              style={{ maxWidth: '100%', height: '100%' }}
              alt={title + ' book cover'}
            />
          }
          AddClusterFunction=""
          CreateGoalFunction=""
          description={description}
          tempFunction=""
          showButtons={false}
        />
        <GoalCard>
          <H1>Update Goal</H1>
          <GoalInfoWrapper>
            <DeadlineWrapper>
              <P>
                Due Date: <b>{deadline}</b>
              </P>
            </DeadlineWrapper>
            <P>
              You have <b>{numDays}</b> days left to finish this goal, and{' '}
              <b>{pagesLeft}</b> pages to read.
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
            <PageSlider
              label="Pages Read"
              min={pagesRead}
              max={numPagesTotal}
              sliderValue={sliderValue}
              setSliderValue={setSliderValue}
            />
            <div className="textarea-wrapper">
              <Label htmlFor="goal-notes">Notes</Label>
              <textarea
                name="goal-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
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
                  handleSubmit();
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
