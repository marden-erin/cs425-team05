import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { COLORS, ScrollBarStyle } from '../constants';
import { GetSnailImg } from '../utils';
import { useAuthUser } from 'react-auth-kit';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import ReactModal from 'react-modal';
import {
  H1,
  H2,
  P,
  PageWrapper,
  LargeRoundedButton,
  CloseButton,
  SnailImage,
  H3,
} from '../components';
import { FONTS_MAIN } from '../constants';
import { LoadingPage } from '../components/complex-components/Loading';

const FlexWrapper = styled.div<{
  $isModalOpen: boolean;
  $isModalOpen2: boolean;
}>`
  display: flex;
  margin-block-start: 3rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 35px;

  ${(props) =>
    props.$isModalOpen &&
    css`
      pointer-events: none;
    `}
`;

const AllSnailCard = styled.div`
  background: ${COLORS.PURPLE_LIGHT};
  box-shadow: 5px 5px 5px #220d50;
  border-radius: 15px;
  width: 85rem;
  height: 35rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4rem;
  gap: 3rem;
  overflow-x: auto;
  overflow-y: hidden;
  ${ScrollBarStyle}
`;
const ContentWrapper = styled.div`
  background: ${COLORS.PURPLE_XTRALIGHT};
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const SnailCard = styled.button`
width: 30rem;
height: 32.5rem;
padding: 30px 15px;
background-color: ${COLORS.PURPLE_XTRALIGHT};
box-shadow: 10px 10px 10px #220d50;
transition: background-color 0.25s ease-out;
border-radius: 15px;
border: none;

display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;

:hover {
  background-color: ${COLORS.PURPLE_MID};
  cursor: pointer;
  .snail-name {
      color: ${COLORS.WHITE};
  }
  img {
      filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5));
  }
}
}
`;

const Status = styled.div`
  background-color: ${COLORS.PURPLE_LIGHT};
  width: 90%;
  border-radius: 10px;
  padding: 20px 10px;

  p {
    text-align: center;
  }
`;
const HeadingCss = css`
  font-family: ${FONTS_MAIN};
  font-style: italic;
  font-weight: 600;
  font-size: 2.4rem;
  line-height: 2.9rem;
  margin-bottom: 4px;
`;
const SnailTitle = styled.span`
  ${HeadingCss};
`;
const ModalContentWrapper = styled.div`
  display: flex;
  padding: 20px;
  gap: 4rem;
  align-items: center;
  justify-content: center;
`;

const RightModalContentWrapper = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h2 {
    text-align: center;
  }
`;
const RightModalContentWrapper2 = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h2 {
    text-align: center;
  }
  p {
    text-align: center;
  }
  button {
    margin-left: 4rem;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  padding-top: 2rem;
  margin-left: 5rem;
`;
const SingleButtonWrapper = styled.div`
  display: flex;
  padding-top: 2rem;
  margin-left: 3rem;
`;
const InputWrapper = styled.div`
  background-color: ${COLORS.PURPLE_LIGHT};
  padding: 2rem;
  border-radius: 5px;
`;

function AllSnails() {
  const auth = useAuthUser();
  const username = auth()?.username;
  let snailInfo;
  const [isModalOpen, toggleIsModalOpen] = useState(false);
  const [isModalOpen2, toggleIsModalOpen2] = useState(false);

  const [allAliveSnails, setAllAliveSnails] = useState<any>([]);
  const [current, setCurrent] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  ReactModal.setAppElement('*');
  const [index, setIndex] = useState(0);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [snailHealth, setSnailHealth] = useState(3);
  const [complete, setComplete] = useState(0);
  const [failed, setFailed] = useState(0);
  const [snailAccessories, setSnailAccessories] = useState({});

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

    const loadData = async () => {
      const allSnails = await OWServiceProvider.getAllSnails(username);
      const allSnailArray: any[] = [];
      const activeSnail: any[] = [];
      for (const x of allSnails) {
        if (x.health > 0 && (x.date_died === null || x.date_died === 'null')) {
          allSnailArray.push(x);
          if (x.is_active === 1) {
            allSnailArray.pop();
            activeSnail.push(x);
          }
        }
      }

      setCurrent([...activeSnail]);
      setAllAliveSnails([...allSnailArray]);

      snailInfo = await OWServiceProvider.getSnailInfo(username);
    };

    loadData();
  }, []);

  const handleClick = async (
    name: string,
    color: string,
    failed: number,
    complete: number,
    snailAccessories: Object,
    snailHealth: number
  ) => {
    const currentSnail = await OWServiceProvider.getSnailInfo(username);

    if (currentSnail) {
      const updateCurrent = await OWServiceProvider.updateSnailInfo(
        username,
        currentSnail.name,
        currentSnail.color,
        currentSnail.health,
        currentSnail.goals_completed,
        currentSnail.goals_failed,
        currentSnail.accessories,
        false
      );
    }

    const newCurrent = await OWServiceProvider.updateSnailInfo(
      username,
      name,
      color,
      snailHealth,
      complete,
      failed,
      snailAccessories,
      true
    );
    const currentSnail2 = await OWServiceProvider.getSnailInfo(username);
    window.location.reload();
  };
  const active = current.map((x: any, i: any) => {
    return (
      <div key={i}>
        <SnailCard
          className="card"
          onClick={() => {
            toggleIsModalOpen2(true);
          }}
        >
          <SnailTitle className="snail-name">{x.name}</SnailTitle>
          <img
            src={GetSnailImg(x.color, x.health)}
            alt="Your currently active snail"
            width={200}
          />

          <Status>
            <P>
              <b>{x.name}</b> is currently active!
            </P>
          </Status>
        </SnailCard>
        <ReactModal
          isOpen={isModalOpen2}
          className="modal-body"
          overlayClassName="modal-overlay"
        >
          <CloseButton handler={toggleIsModalOpen2} />
          <ModalContentWrapper>
            <SnailImage username={username} snailHealth={x.health} />

            <RightModalContentWrapper2>
              <InputWrapper>
                <H2>{x.name} is already active!</H2>
                <br />
                <P>
                  If you still want to change snails, you'll have to pick
                  another one!
                </P>
                <SingleButtonWrapper>
                  <LargeRoundedButton onClick={() => toggleIsModalOpen2(false)}>
                    Continue
                  </LargeRoundedButton>
                </SingleButtonWrapper>
              </InputWrapper>
            </RightModalContentWrapper2>
          </ModalContentWrapper>
        </ReactModal>
      </div>
    );
  });

  const snails = allAliveSnails.map((x: any, i: any) => {
    return (
      <div key={i}>
        <SnailCard
          className="card"
          onClick={() => {
            toggleIsModalOpen(true);
            setIndex(i);
            setName(x.name);
            setColor(x.color);
            setFailed(x.goals_failed);
            setComplete(x.goals_completed);
            setSnailAccessories(x.accessories);
            setSnailHealth(x.health);
          }}
        >
          <SnailTitle className="snail-name">{x.name}</SnailTitle>
          <img
            src={GetSnailImg(x.color, x.health)}
            alt="one of your alive snails"
            width={200}
          />

          <Status>
            <P>
              <b>{x.name}</b> is ready to join you again!
            </P>
          </Status>
        </SnailCard>
        <ReactModal
          isOpen={isModalOpen}
          className="modal-body"
          overlayClassName="modal-overlay"
        >
          <CloseButton handler={toggleIsModalOpen} />
          <ModalContentWrapper>
            <img
              src={GetSnailImg(color, snailHealth)}
              alt={{ name } + ' is ready to be an active snail again'}
              width="200"
            />
            <RightModalContentWrapper>
              <InputWrapper>
                <H2>Do you want to set {name} as your active snail?</H2>
                <ButtonWrapper>
                  <LargeRoundedButton
                    onClick={() =>
                      handleClick(
                        name,
                        color,
                        failed,
                        complete,
                        snailAccessories,
                        snailHealth
                      )
                    }
                  >
                    Yes
                  </LargeRoundedButton>
                  <LargeRoundedButton onClick={() => toggleIsModalOpen(false)}>
                    No
                  </LargeRoundedButton>
                </ButtonWrapper>
              </InputWrapper>
            </RightModalContentWrapper>
          </ModalContentWrapper>
        </ReactModal>
      </div>
    );
  });

  return (
    <>
      {' '}
      {loading === false ? (
        <PageWrapper pageTitle="All Snails">
          <FlexWrapper $isModalOpen={isModalOpen} $isModalOpen2={isModalOpen2}>
            <ContentWrapper>
              <H1>Your Snails</H1>
              <H2>
                Here you can decide which snail you would like to actively
                follow you on your reading goals.
              </H2>
              <H3>
                They have put their accessories back in the closet while they
                are away and resting.
              </H3>
              <H3>
                Don't worry though, they will put them back on when they are
                active again.
              </H3>
              <AllSnailCard>
                {' '}
                {active}
                {snails}
              </AllSnailCard>
            </ContentWrapper>
          </FlexWrapper>
        </PageWrapper>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
export default AllSnails;
