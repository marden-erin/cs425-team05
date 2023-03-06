import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants';
import styled from 'styled-components';
import { CreateUpdateButton, PageWrapper } from '../components';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { GetSnailImg, GetSnailStatusText } from '../utils';
import { ScrollBarStyle } from '../constants';
import {
  GoalCard,
  H2,
  LargeRoundedButton,
  P,
  SmallRoundedButton,
} from '../components';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import { FaYCombinator } from 'react-icons/fa';

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
  border: 3px solid ${COLORS.PURPLE_LIGHT};
  margin-block-start: 2rem;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;

  ${ScrollBarStyle};
`;

function ViewGoals(this: any) {
  const navigate = useNavigate();
  const auth = useAuthUser();
  const username = auth()?.username;
  const [snailName, setSnailName] = useState('');
  const [snailImage, setSnailImage] = useState('');
  const [snailColor, setSnailColor] = useState('');
  const [snailHealth, setSnailHealth] = useState(3);
  const [allGoals, setAllGoals] = useState();
  const [indGoals, setIndGoals] = useState<any>([]);
  let temp: any;
  const goalID: any = [];
  let noDuplicatesID: number[];
  const goalArray: any[] = [];
  let snailInfo: any;
  useEffect(() => {
    const loadData = async () => {
      snailInfo = await OWServiceProvider.getSnailInfo(username);
      setSnailName(snailInfo.name);
      setSnailColor(snailInfo.color);
      // setSnailHealth(snailInfo.health); // TODO
      setSnailImage(GetSnailImg(snailInfo.color, snailHealth));
      //TODO: Set snail health
      temp = await OWServiceProvider.getAllGoals(username);

      setAllGoals(temp);
      const getID = temp.map((x: any) => {
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

  const handleUpdate = (e: any) => {
    return (
      <SmallRoundedButton
        onClick={() => navigate('/update-goal', { state: e })}
      ></SmallRoundedButton>
    );
  };

  const handleDelete = async (e: any) => {
    const goalDelete = await OWServiceProvider.deleteGoal(e);
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
            width="250"
            height="250"
            alt={'An image of ' + snailName}
          />
          <H2>{snailName}</H2>
          <SnailStatus>
            <P>
              <b>{snailName}</b> {GetSnailStatusText(snailHealth)}
            </P>
            {
              // TODO: DELETE AFTER DEMO
            }
            <input
              type="radio"
              id="3"
              name="snail-health"
              value="3"
              onChange={() => {
                setSnailHealth(3);
                setSnailImage(GetSnailImg(snailColor, 3));
              }}
            />
            <label htmlFor="html">3</label>
            <input
              type="radio"
              id="2"
              name="snail-health"
              value="2"
              onChange={() => {
                setSnailHealth(2);
                setSnailImage(GetSnailImg(snailColor, 2));
              }}
            />
            <label htmlFor="css">2</label>
            <input
              type="radio"
              id="1"
              name="snail-health"
              value="1"
              onChange={() => {
                setSnailHealth(1);
                setSnailImage(GetSnailImg(snailColor, 1));
              }}
            />
            <label htmlFor="javascript">1</label>
            <input
              type="radio"
              id="0"
              name="snail-health"
              value="0"
              onChange={() => {
                setSnailHealth(0);
                setSnailImage(GetSnailImg(snailColor, 0));
              }}
            />
            <label htmlFor="javascript">0</label>
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
            <GoalsWrapper>
              <> {goal}</>
            </GoalsWrapper>
          </GoalsCard>
        )}
      </FlexWrapper>
    </PageWrapper>
  );
}

export default ViewGoals;
