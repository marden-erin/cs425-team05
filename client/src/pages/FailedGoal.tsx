import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

import { PageWrapper } from '../components';
import {
  SmallRoundedButton,
  SubTitle,
  H1,
} from '../components/simple-components';
import { ScrollBarStyle } from '../constants';
import { COLORS } from '../constants';
import { GoalCard } from '../components';
import { useNavigate } from 'react-router-dom';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { useAuthUser } from 'react-auth-kit';
import { FailedGoalButton } from '../components';

const GridWrapper = styled.div`
  height: 85vh;
  padding: 3vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 35px;
`;

const BigCard = styled.div`
  width: 70rem;
  padding: 20px 15px;
  background-color: ${COLORS.PURPLE_XTRALIGHT};
  box-shadow: 10px 10px 10px #220d50;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(H1)`
  font-size: 3rem;
`;

const SubHeader = styled(SubTitle)`
  color: ${COLORS.PURPLE_DARK};
  font-size: 2.5rem;
`;

const GoalsWrapper = styled.div`
  background-color: ${COLORS.PURPLE_LIGHT};
  border: 3px solid ${COLORS.PURPLE_LIGHT};

  margin-block-start: 2rem;
  display: flex;
  border-radius: 15px;

  width: 60rem;
  padding: 5px;
  overflow-x: auto;
  overflow-y: hidden;
  ${ScrollBarStyle};
`;
function FailedGoal() {
  const auth = useAuthUser();
  const username = auth()?.username;
  const navigate = useNavigate();

  const [failed, setFailed] = useState<any>([]);
  const [numFail, setNumFail] = useState(0);
  const [snailName, setSnailName] = useState('');
  const [snailColor, setSnailColor] = useState('');
  const [goalsComp, setGoalsComp] = useState(0);
  const [goalsFail, setGoalsFail] = useState(0);
  const [snailHealth, setSnailHealth] = useState(0);

  const [isActive, setIsActive] = useState(true);
  const [accessories, setAccessories] = useState({});
  useEffect(() => {
    const loadData = async () => {
      const snailInfo = await OWServiceProvider.getSnailInfo(username);
      setSnailName(snailInfo.name);
      setSnailColor(snailInfo.color);
      setGoalsComp(snailInfo.goals_completed);
      setIsActive(snailInfo.is_active);
      setAccessories(snailInfo.accessories);
      setGoalsFail(snailInfo.goals_failed);
      setSnailHealth(snailInfo.health);
      const goalInfo = await OWServiceProvider.getAllGoals(username);
      const failedArray: any[] = [];
      const today = new Date();
      for (const x of goalInfo) {
        const dueDate = new Date(x.deadline);
        if (dueDate < today) {
          setNumFail(numFail + 1);
          // If due date passed
          failedArray.push(x);
        } else {
          console.log('notFailed');
        }
      }
      setFailed(failedArray);
    };
    loadData();
  }, []);

  const handleDelete = async (e: number) => {
    let health = snailHealth - 1;
    let fail = goalsFail + 1;
    const updateHealth = await OWServiceProvider.updateSnailInfo(
      username,
      snailName,
      snailColor,
      health,
      goalsComp,
      fail,
      accessories,
      isActive
    );
    const confirmBox = window.confirm(
      'Do you really want to delete this goal? Or would you rather update and try again?'
    );
    if (confirmBox === true) {
      const deleteGoal = OWServiceProvider.deleteGoal(e);
      if (failed.length - 1 === 0) {
        navigate('/');
      } else {
        window.location.reload();
      }
    }
  };

  const goals = failed.map((x: any, i: any) => {
    const dueDate = new Date(x.deadline);
    let propsToFailPage = {
      cover: x.foundBook.cover,
      pageCount: x.foundBook.pageCount,
      author: [x.foundBook.authors],
      description: x.foundBook.description,
      title: x.foundBook.title,
      goal_id: x.goal_id,
    };

    return (
      <div key={i}>
        <GoalCard
          bookTitle={x.foundBook.title}
          bookCover={x.foundBook.cover}
          dueDate={dueDate}
          updateFunction={
            <FailedGoalButton {...propsToFailPage}></FailedGoalButton>
          }
          deleteFunction={
            <SmallRoundedButton onClick={() => handleDelete(x.goal_id)}>
              Delete Goal
            </SmallRoundedButton>
          }
        />
      </div>
    );
  });

  return (
    <PageWrapper pageTitle="Failed Goal" disableNav>
      <GridWrapper>
        <BigCard>
          <Title>Uh Oh! It looks like you failed a goal.</Title>
          <SubHeader>
            {' '}
            Would you like to extend the due date and try again, or delete this
            goal?
          </SubHeader>
          <GoalsWrapper>{goals}</GoalsWrapper>
        </BigCard>
      </GridWrapper>
    </PageWrapper>
  );
}

export default FailedGoal;
