import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { useLocation } from 'react-router-dom';
import { Book } from '../../../server/src/utils/Types';
import 'react-datepicker/dist/react-datepicker.css';

import { LargeBookCard } from '../components/complex-components/BookResult';
import { PageWrapper } from '../components';
import {
  Label,
  LargeRoundedButton,
  P,
  SmallRoundedButton,
  SubTitle,
} from '../components/simple-components';
import { ScrollBarStyle } from '../constants';
import { COLORS, FONTS_SECONDARY } from '../constants';
import { GoalCard } from '../components';
import { GetSnailImg } from '../utils';
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

const SubHeader = styled(SubTitle)`
  color: ${COLORS.BLUE_MID};
  font-size: 2.3rem;
`;
const Card = styled.div`
 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  overflow-y: hidden
  overflow-x: auto
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
      setSnailColor(snailInfo.color)
      setGoalsComp(snailInfo.goals_completed);
      setIsActive(snailInfo.is_active);
      setAccessories(snailInfo.accessories);
      setGoalsFail(snailInfo.goals_failed);
      setSnailHealth(snailInfo.health);
      const goalInfo = await OWServiceProvider.getAllGoals(username);
      const failedArray: any[] = [];
      const today = new Date();
      for(const x of goalInfo){
        const dueDate = new Date(x.deadline);
        if (dueDate < today) {
          setNumFail(numFail + 1);
          // If due date passed
          failedArray.push(x);
        } else {
          console.log('notFailed');
        }
      };
        setFailed(failedArray);

      
    };
    loadData();
  }, []);
 

  

  const handleDelete = async (e: number) => {
    let health = snailHealth-1;
    let fail = goalsFail+1;
    const updateHealth = await OWServiceProvider.updateSnailInfo(username, snailName, snailColor, health,  goalsComp, fail,accessories, isActive);
    const confirmBox = window.confirm(
      'Do you really want to delete this goal? Or would you rather update and try again?'
    );
    if (confirmBox === true) {
      const deleteGoal = OWServiceProvider.deleteGoal(e);
      if(failed.length-1 === 0){
        navigate('/')
      }
      else{window.location.reload();}
        
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
    <PageWrapper pageTitle="Failed Goal">
      <GridWrapper>
        <BigCard>
          <H1>Uh Oh! It looks like you failed a goal.</H1>
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
