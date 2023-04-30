// TODO: once linked to backend-loop through all dead snails to create gravewrapper and modal for each

import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { COLORS, GraveScrollBarStyle } from '../constants';
import ReactModal from 'react-modal';
import { useAuthUser } from 'react-auth-kit';
import { GetSnailImg } from '../utils';
import DeadSnail from '../imgs/graveyard/deadSnail.png';
import { LoadingPage } from '../components/complex-components/Loading';
import { useNavigate } from 'react-router-dom';

import {
  H1,
  H3,
  Box,
  GraveyardPageWrapper,
  P,
  SmallCloseButton,
  H2,
  LargeRoundedButton,
  SubTitle,
} from '../components';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import Grave2 from '../imgs/graveyard/Grave stone 2.png';

const GridWrapper = styled.div<{
  $isModalOpen: boolean;
  $isModalOpen2: boolean;
  $isModalOpen3: boolean;
}>`
  height: 85vh;
  padding: 3vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 15rem;
  ${(props) =>
    props.$isModalOpen &&
    css`
      pointer-events: none;
    `}
  ${(props) =>
    props.$isModalOpen2 &&
    css`
      pointer-events: none;
    `}
    ${(props) =>
    props.$isModalOpen3 &&
    css`
      pointer-events: none;
    `}
`;
const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  background: ${COLORS.GRAY_MID};
  border-radius: 15px;
`;
const ModalContentBox = styled(Box)`
  height: 42rem;
  width: 38rem;
  background-color: ${COLORS.GRAY_LIGHT};
`;
const ModalContentBox2 = styled(Box)`
  height: 25rem;
  width: 35rem;
  background-color: ${COLORS.GRAY_LIGHT};
  overflow: scroll;
`;
const ModalContentBox3 = styled(Box)`
  height: 15rem;
  width: 35rem;
  background-color: ${COLORS.GRAY_LIGHT};
  overflow: scroll;
`;
const YardWrapper = styled(Box)`
  background-color: ${COLORS.GRAY_DARK};
`;
const YardBoxWrapper = styled.div`
  width: 107rem;
  height: 47rem;
  background-color: ${COLORS.GRAY_LIGHT};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

const ScrollableDiv = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: auto;
  ${GraveScrollBarStyle}
`;

const SignWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const AllGraveWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  margin-top: 2rem;
  padding: 10px;
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.GRAY_MID};
  border: 3px solid ${COLORS.GRAY_MID};
  border-radius: 15px;
`;
const GraveWrapper = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20rem;
  border: 3px solid ${COLORS.GRAY_MID};
  border-radius: 5px;
  background-color: ${COLORS.GRAY_LIGHT};

  :hover {
    cursor: pointer;
  }
`;

const Title = styled(H1)`
  color: ${COLORS.BLACK};
  padding-top: 2rem;
`;
const SnailH2 = styled(H2)`
  color: ${COLORS.BLACK};
  text-align: left;
  max-width: 15rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SnailH3 = styled(H3)`
  color: ${COLORS.BLACK};
  text-align: left;
  padding: 1rem;
`;

const Snail = styled.div`
  padding: 5px;
  img {
    filter: drop-shadow(0px 0px 10px ${COLORS.PURPLE_LIGHTMID});
  }
`;
const Img = styled.img`
  width: 13rem;
  height: 13rem;
`;
const ModalButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 8rem;
  margin-top: 2rem;
  gap: 5rem;
  padding-bottom: 2rem;
`;
const ReviveSnail = styled(H3)`
  color: ${COLORS.BLACK};
  padding: 1rem;
  padding-bottom: 1rem;
`;
const ModalTitle = styled(H1)`
  font-size: 3rem;
`;

function Graveyard() {
  const [isModalOpen, toggleIsModalOpen] = useState(false);
  const [isModalOpen2, toggleIsModalOpen2] = useState(false);
  const [isModalOpen3, toggleIsModalOpen3] = useState(false);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  ReactModal.setAppElement('*');
  const auth = useAuthUser();
  const username: string = auth()?.username;

  const [index, setIndex] = useState(0);
  const [graveID, setGraveID] = useState(0);

  const [grave, setGrave] = useState<any>([]);

  const [snail, setSnail] = useState<any>([]);

  const [currency, setCurrency] = useState(9999);
  const [output, setOutput] = useState('');
  const [noGraves, setNoGraves] = useState(false);
  let getGraves;

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);

    const loadData = async () => {
      getGraves = await OWServiceProvider.getAllGraves(username);
      if (getGraves.length === 0) {
        setNoGraves(true);
        toggleIsModalOpen3(true);
      }
      const snailArray: any[] = [];
      const graveArray: any[] = [];
      for (const temp of getGraves) {
        const snailInfo = await OWServiceProvider.getGrave(temp.graveyard_id);
        snailArray.push(snailInfo);
      }
      setSnail([...snailArray]);
      graveArray.push({ graveInfo: getGraves });
      setGrave([...graveArray]);

      const stars = await OWServiceProvider.getUserInformation(username);
      setCurrency(stars.currency);
    };

    loadData();
  }, []);

  const handleRevive = async (
    snailName: string,
    snailColor: string,
    goalsCompleted: number,
    goalsFailed: number,
    snailAccessories: Object,
    graveyard_id: number
  ) => {
    let newCurrency = currency;

    if (currency >= 1000) {
      //not set as active yet but instead sent to all snails page
      await OWServiceProvider.updateSnailInfo(
        username,
        snailName,
        snailColor,
        3,
        goalsCompleted,
        goalsFailed,
        snailAccessories,
        false,
        null
      );
      newCurrency = currency - 1000;
      await OWServiceProvider.deleteGrave(graveyard_id);
      await OWServiceProvider.updateUserInformation(username, newCurrency);
      toggleIsModalOpen(false);
      navigate('/all-snails');
    } else {
      setOutput('You do not have enough stars to revive this snail.');
    }
  };
  const temp = () => {
    if (noGraves) {
      return (
        <ReactModal
          isOpen={isModalOpen3}
          className="modal-body"
          overlayClassName="modal-overlay"
        >
          <ModalContentWrapper>
            {' '}
            <ModalContentBox3>
              <ModalTitle>The graveyard is empty!</ModalTitle>
              <ReviveSnail>Keep up the good work!</ReviveSnail>
              <LargeRoundedButton onClick={() => navigate('/')}>
                Return Home
              </LargeRoundedButton>
            </ModalContentBox3>
          </ModalContentWrapper>
        </ReactModal>
      );
    } else {
      return grave.map((x: any, i: any) => {
        return (
          <div key={i}>
            <ScrollableDiv>
              <AllGraveWrapper>
                {x.graveInfo.map((a: any, b: any) => {
                  return (
                    <div key={b}>
                      <GraveWrapper
                        onClick={() => {
                          toggleIsModalOpen(true);
                          setIndex(b);
                          setGraveID(a.graveyard_id);
                        }}
                      >
                        <img
                          src={a.gravestone}
                          alt="Spooky grave"
                          height="150px"
                        />
                        <SnailH2>{a.snail_name}</SnailH2>
                      </GraveWrapper>
                    </div>
                  );
                })}
                <ReactModal
                  isOpen={isModalOpen}
                  className="modal-body"
                  overlayClassName="modal-overlay"
                >
                  <SmallCloseButton handler={toggleIsModalOpen} />
                  <ModalContentWrapper>
                    <Title>Here lies {snail[index].name} </Title>
                    <ModalContentBox>
                      <Snail>
                        <img
                          src={GetSnailImg(snail[index].color, 3)}
                          alt="snail who passed away"
                          width="200"
                        />
                      </Snail>
                      <P>
                        {snail[index].date_created} - {snail[index].date_died}
                      </P>
                      <br />
                      <P>
                        {snail[index].name} passed away when you failed your
                        reading goal.
                      </P>

                      <SnailH3>
                        * Goals Completed: {snail[index].goals_completed}
                      </SnailH3>
                      <SnailH3>
                        * Goals Failed: {snail[index].goals_failed}
                      </SnailH3>
                      <LargeRoundedButton
                        onClick={() => {
                          toggleIsModalOpen2(true);
                          setOutput('');
                        }}
                      >
                        Revive Snail
                      </LargeRoundedButton>
                      <ReactModal
                        isOpen={isModalOpen2}
                        className="modal-body"
                        overlayClassName="modal-overlay"
                      >
                        <SmallCloseButton handler={toggleIsModalOpen2} />
                        <ModalContentWrapper>
                          <ModalContentBox2>
                            <ModalTitle>Revive Snail?</ModalTitle>
                            <ReviveSnail>
                              Reviving a snail will cost you 1000 stars.
                            </ReviveSnail>
                            <ReviveSnail>
                              Do you still want to continue?
                            </ReviveSnail>
                            <ModalButtonWrapper>
                              <LargeRoundedButton
                                onClick={() =>
                                  handleRevive(
                                    snail[index].name,
                                    snail[index].color,
                                    snail[index].goals_completed,
                                    snail[index].goals_failed,
                                    snail[index].accessories,
                                    graveID
                                  )
                                }
                              >
                                Yes
                              </LargeRoundedButton>
                              <LargeRoundedButton
                                onClick={() => toggleIsModalOpen2(false)}
                              >
                                No
                              </LargeRoundedButton>
                            </ModalButtonWrapper>
                            <P>{output}</P>
                          </ModalContentBox2>
                        </ModalContentWrapper>
                      </ReactModal>
                    </ModalContentBox>
                  </ModalContentWrapper>
                </ReactModal>
              </AllGraveWrapper>
            </ScrollableDiv>
          </div>
        );
      });
    }
  };

  return (
    <>
      {' '}
      {loading === false ? (
        <GraveyardPageWrapper pageTitle="Graveyard">
          <GridWrapper
            $isModalOpen={isModalOpen}
            $isModalOpen2={isModalOpen2}
            $isModalOpen3={isModalOpen3}
          >
            <YardBoxWrapper>
              <YardWrapper>
                <SignWrapper>
                  <Img src={DeadSnail} role="presentation" />
                  <Img src={DeadSnail} role="presentation" />

                  <Title>Snail Graveyard</Title>
                  <Img
                    src={DeadSnail}
                    role="presentation"
                    style={{ transform: 'scaleX(-1)' }}
                  />
                  <Img
                    src={DeadSnail}
                    role="presentation"
                    style={{ transform: 'scaleX(-1)' }}
                  />
                </SignWrapper>

                <>{temp()}</>
              </YardWrapper>
            </YardBoxWrapper>
          </GridWrapper>
        </GraveyardPageWrapper>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

export default Graveyard;
