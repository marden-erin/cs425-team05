import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants';
import styled from 'styled-components';
import { PageWrapper } from '../components';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { GetSnailImg, GetSnailStatusText } from '../utils';
import { ScrollBarStyle } from '../constants';
import { GoalCard, H2, LargeRoundedButton, P } from '../components';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';


// TODO: Replace with actual goals
const placeholderCover =
  'https://i.pinimg.com/originals/a1/f8/87/a1f88733921c820db477d054fe96afbb.jpg';
const PlaceholderGoalInfo = [
  {
    bookTitle: 'title',
    bookCover: placeholderCover,
    dueDate: new Date(),
  },
  {
    bookTitle: 'title',
    bookCover: placeholderCover,
    dueDate: new Date(),
  },
  {
    bookTitle: 'title',
    bookCover: placeholderCover,
    dueDate: new Date(),
  },
  {
    bookTitle: 'title',
    bookCover: placeholderCover,
    dueDate: new Date(),
  },
  {
    bookTitle: 'title',
    bookCover: placeholderCover,
    dueDate: new Date(),
  },
  {
    bookTitle: 'title',
    bookCover: placeholderCover,
    dueDate: new Date(),
  },
];

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
  const [snailHealth, setSnailHealth] = useState(3);
  const [allGoals, setAllGoals] = useState();
  const [indGoals, setIndGoals] = useState<any>([]);
  const goalID:any = [];
  useEffect(() => {
    const loadData = async () => {
      const snailInfo = await OWServiceProvider.getSnailInfo(username);
      console.log(snailInfo);
      setSnailName(snailInfo.name);
      // setSnailHealth(snailInfo.health); // TODO
      setSnailImage(GetSnailImg(snailInfo.color, snailHealth));
      //TODO: Set snail health
      const temp = await OWServiceProvider.getAllGoals(username);
      console.log("here");
      setAllGoals(temp)
      console.log(allGoals);
      temp.map((x:any)=>{
          goalID.push(x.goal_id)
      })
      const goalArray: any = [];

      for(const i of goalID){
        const getGoals = await OWServiceProvider.getGoal(username, i);
          goalArray.push(getGoals)
    }
    console.log(goalArray)


      

      
  };
    
    loadData();
  }, []);
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
              {PlaceholderGoalInfo.map(
                ({ bookTitle, bookCover, dueDate }, index) => {
                  return (
                    <GoalCard
                      bookTitle={bookTitle}
                      bookCover={bookCover}
                      dueDate={dueDate}
                      key={index}
                    />
                  );
                }
              )}
            </GoalsWrapper>
          </GoalsCard>
        )}
      </FlexWrapper>
    </PageWrapper>
  );
}

export default ViewGoals;
