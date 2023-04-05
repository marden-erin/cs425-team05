// TODO: once linked to backend-loop through all dead snails to create gravewrapper and modal for each

import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { COLORS, GraveScrollBarStyle } from '../constants';
import { useLocation } from 'react-router-dom';
import ReactModal from 'react-modal';
import { useAuthUser } from 'react-auth-kit';
import { GetSnailImg } from '../utils';

import {
  H1,
  H3,
  Box,
  GraveyardPageWrapper,
  CloseButton,
  SubTitle,
  P,
} from '../components';
import OWServiceProvider from '../OuterWhorldServiceProvider';

const GridWrapper = styled.div<{ $isModalOpen: boolean }>`
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
`;
const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 4rem;
  align-items: center;
  justify-content: center;
  background: ${COLORS.GRAY_MID};
  border-radius: 10px;
`;
const ModalContentBox = styled(Box)`
  height: 40rem;
  width: 38rem;
  background-color: ${COLORS.GRAY_LIGHT};
  overflow: scroll;
`;
const YardWrapper = styled(Box)`
  background-color: ${COLORS.GRAY_MID};
  border: 15px double ${COLORS.GRAY_LIGHT};
`;

const ScrollableDiv = styled.div`
  // Makes the div scrollable
  padding: 10px;
  overflow-y: hidden;
  overflow-x: scroll;
  ${GraveScrollBarStyle}
`;

const SignWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AllGraveWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 3rem;
  margin-top: 2rem;
  justify-content: center;
  align-items: center;
`;
const GraveWrapper = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20rem;
  border: 3px solid ${COLORS.GRAY_LIGHT};
  border-radius: 5px;
  background-color: ${COLORS.GRAY_DARK};
`;

const Title = styled(H1)`
  color: ${COLORS.BLACK};
`;
const SnailH2 = styled(H3)`
  color: ${COLORS.BLACK};
`;

const Snail = styled.div`
  padding: 20px;
  :hover {
    img {
      filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5));
    }
  }
`;

function Graveyard() {
  const [isModalOpen, toggleIsModalOpen] = useState(false);
  ReactModal.setAppElement('*');
  const auth = useAuthUser();
  const username: string = auth()?.username;

  const deathDate = 'March 28 2023 ';

  const GraveID: any = [];

  const [grave, setGrave] = useState<any>([]);
  const [snail, setSnail] = useState<any>([]);
  useEffect(() => {
    const loadData = async () => {
      const getGraves = await OWServiceProvider.getAllGraves(username);
      const snailArray: any[] = [];
      const graveArray: any[] = [];

      for (const temp of getGraves) {
        const snailInfo = await OWServiceProvider.getGrave(temp.graveyard_id);
        snailArray.push(snailInfo);
      }
      setSnail([...snailArray]);
      graveArray.push({ snail: snail, graveInfo: getGraves });
      setGrave([...graveArray]);
    };
    loadData();
  }, []);
  const temp = grave.map((x: any, i: any) => {
    return (
      <div key={i}>
        <ScrollableDiv>
          <AllGraveWrapper>
            {x.graveInfo.map((a: any, b: any) => (
              <div key={b}>
                <GraveWrapper
                  onClick={() => {
                    toggleIsModalOpen(true);
                  }}
                >
                  <img src={a.gravestone} alt="Spooky grave" height="150px" />
                  <SnailH2>{a.snail_name}</SnailH2>
                </GraveWrapper>
              </div>
            ))}
          </AllGraveWrapper>

          {x.snail.map((c: any, d: any) => {
            return (
              <div key={d}>
                <ReactModal
                  isOpen={isModalOpen}
                  className="modal-body"
                  overlayClassName="modal-overlay"
                >
                  <CloseButton handler={toggleIsModalOpen} />
                  <ModalContentWrapper>
                    <Title>Here lies {c.name} </Title>{' '}
                    <ModalContentBox>
                      <Snail>
                        <img
                          src={GetSnailImg(c.color, 3)}
                          alt="snail who passed away"
                          width="200"
                        />
                      </Snail>
                      <P>
                        {/* TODO:change deathdate to accurate day; manuaally added rn for presentation */}
                        {c.date_created} - {deathDate}
                      </P>
                      <br />
                      <SnailH2>
                        {c.name} passed away when you failed your reading goal.
                      </SnailH2>
                      <br />
                      <SnailH2>
                        Hopefully you will be more careful next time.
                      </SnailH2>
                    </ModalContentBox>
                  </ModalContentWrapper>
                </ReactModal>
              </div>
            );
          })}
        </ScrollableDiv>
      </div>
    );
  });
  return (
    <GraveyardPageWrapper pageTitle="Graveyard">
      <GridWrapper $isModalOpen={isModalOpen}>
        <YardWrapper>
          <SignWrapper>
            <Title>
              Welcome to the <br /> Graveyard
            </Title>
          </SignWrapper>
          {temp}
        </YardWrapper>
      </GridWrapper>
    </GraveyardPageWrapper>
  );
}

export default Graveyard;
