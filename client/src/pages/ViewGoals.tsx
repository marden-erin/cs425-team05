import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants';
import styled, { css } from 'styled-components';
import { CreateUpdateButton, PageWrapper } from '../components';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { GetSnailImg, GetSnailStatusText } from '../utils';
import { ScrollBarStyle } from '../constants';
import {
  BookSearchCard,
  GoalCard,
  H2,
  LargeRoundedButton,
  P,
  SmallRoundedButton,
} from '../components';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';

const FlexWrapper = styled.div`
  display: flex;
  margin-block-start: 3rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 35px;
`;

const SnailCard = styled.div`
  width: 40rem;
  min-height: 45rem;
  padding: 20px 15px 25px;
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
  margin-top: 20px;
  background-color: ${COLORS.PURPLE_LIGHT};
  width: 90%;
  padding: 15px 10px;

  p {
    text-align: center;
  }
`;

const GoalsCard = styled.div`
  width: 70rem;
  height: 45rem;
  padding: 20px 15px 25px;
  background-color: ${COLORS.PURPLE_XTRALIGHT};
  box-shadow: 10px 10px 10px #220d50;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const GoalsWrapper = styled.div<{ $hasGoals: boolean }>`
  background-color: ${COLORS.PURPLE_LIGHT};
  border: 3px solid ${COLORS.PURPLE_LIGHT};
  margin-block-start: 2rem;
  display: flex;

  ${(props) =>
    props.$hasGoals
      ? css`
          width: 65rem;
          overflow-x: scroll;
          overflow-y: hidden;
          ${ScrollBarStyle};
        ` // Only show scrollbar if there are goals
      : css`
          padding: 1rem 2rem 2rem;
          flex-direction: column;
          text-align: center;
          * + * {
            margin-block-start: 2rem;
          }
        `}
`;

function ViewGoals(this: any) {
  const navigate = useNavigate();
  const auth = useAuthUser();
  const username = auth()?.username;
  const [snailName, setSnailName] = useState('');
  const [snailImage, setSnailImage] = useState('');
  const [snailColor, setSnailColor] = useState('');
  const [snailHealth, setSnailHealth] = useState(3);
  const [allGoals, setAllGoals] = useState([]);
  const [indGoals, setIndGoals] = useState<any>([]);
  let temp: any;
  const goalID: any = [];
  let noDuplicatesID: number[];
  let snailInfo: any;
  useEffect(() => {
    const loadData = async () => {
      snailInfo = await OWServiceProvider.getSnailInfo(username);
      setSnailName(snailInfo.name);
      setSnailColor(snailInfo.color);
      setSnailHealth(snailInfo.health);
      setSnailImage(GetSnailImg(snailInfo.color, snailHealth));

      const goalArray: any[] = [];
      temp = await OWServiceProvider.getAllGoals(username);
      setAllGoals(temp);
      temp.map((x: any) => {
        var y: number = +x.goal_id;
        goalID.push(y);
      });
      //above map out puts duplicate of every goal_id
      //noDuplicatesID removes these
      noDuplicatesID = Array.from(new Set(goalID));
      for (const i of noDuplicatesID) {
        goalArray.push(await OWServiceProvider.getGoal(username, i));
      }
      setIndGoals(goalArray);
    };
    loadData();
  }, []);

  const handleDelete = async (e: any) => {
    await OWServiceProvider.deleteGoal(e);
  };
  const deleteGoal = (t: any) => {
    return (
      <SmallRoundedButton
        onClick={() => {
          const confirmBox = window.confirm(
            'Do you really want to delete this goal?'
          );
          if (confirmBox === true) {
            handleDelete(t);
            window.location.reload();
          }
        }}
      >
        Delete Goal
      </SmallRoundedButton>
    );
  };

  let propsToGoalPage;
  const goal = indGoals.map((x: any, i: any) => {
    const tempDate = new Date(x.deadline);
    const tempNotes = x.notes;
    const tempImg = x.foundBook.cover;
    const tempID = x.goal_id;
    const numberID = parseInt(tempID);
    const tempTotalPage = x.foundBook.pageCount;
    const tempAuthor = x.foundBook.authors;
    const tempDes = x.foundBook.description;
    const tempTitle = x.foundBook.title;
    const tempRead = x.goal_pageCount;

    propsToGoalPage = {
      cover: tempImg,
      pageCount: tempTotalPage,
      author: [tempAuthor],
      description: tempDes,
      title: tempTitle,
      goalID: tempID,
      deadline: tempDate.toLocaleDateString(),
      pagesRead: tempRead,
      goalNotes: tempNotes,
    };
    return (
      <div key={i}>
        <GoalCard
          bookTitle={tempTitle}
          bookCover={tempImg}
          dueDate={tempDate}
          updateFunction={
            <CreateUpdateButton {...propsToGoalPage}></CreateUpdateButton>
          }
          deleteFunction={deleteGoal(numberID)}
        />
      </div>
    );
  });

  return (
    <PageWrapper pageTitle="Goals" header="Goals">
      <FlexWrapper>
        <SnailCard>
          <img
            src={snailImage}
            width="300"
            height="300"
            alt={'An image of ' + snailName}
          />
          <H2>{snailName}</H2>
          <SnailStatus>
            <P>
              <b>{snailName}</b> {GetSnailStatusText(snailHealth)}
            </P>
          </SnailStatus>
          {snailHealth === 0 && ( // Only show button if snail is dead
            <LargeRoundedButton
              onClick={() => {
                navigate('/grave-adoption');
              }}
            >
              Bury Snail
            </LargeRoundedButton>
          )}
        </SnailCard>
        {snailHealth !== 0 && ( // Don't show Goals if snail is dead
          <GoalsCard>
            <H2>Active Goals</H2>
            <GoalsWrapper $hasGoals={indGoals.length !== 0}>
              {goal}
              {indGoals.length === 0 && (
                <BookSearchCard
                  cardKey={0}
                  additionalText="To set a goal, you need to first find a book."
                />
              )}
            </GoalsWrapper>
          </GoalsCard>
        )}
      </FlexWrapper>
    </PageWrapper>
  );
}

export default ViewGoals;
