// TODO: once linked to backend-loop through all dead snails to create gravewrapper and modal for each

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { COLORS, GraveScrollBarStyle } from '../constants';
import { useLocation } from 'react-router-dom';
import ReactModal from 'react-modal';

import Grave1 from './../imgs/graveyard/Grave stone.png';
import Grave2 from './../imgs/graveyard/Grave stone 2.png';
import Grave3 from './../imgs/graveyard/Grave stone 3.png';
import PinkSnail from './../imgs/snails/pink-default.png';

import { H1, H2, Box, GraveyardPageWrapper, CloseButton } from '../components';

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
  flex-direction: row;
  gap: 3rem;
  margin-top: 2rem;
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
const SnailH2 = styled(H2)`
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
  const location = useLocation();
  const [isModalOpen, toggleIsModalOpen] = useState(false);
  ReactModal.setAppElement('*');

  //userInput is what the user typed into search bar
  // var userInput = location.state.selected;
  // console.log(userInput);
  var tempGrave = Grave1;
  const graves = [];
  graves.push(tempGrave);
  console.log(graves);

  const temp = graves.map((x) => {
    return (
      <ScrollableDiv>
        <AllGraveWrapper>
          <GraveWrapper
            onClick={() => {
              toggleIsModalOpen(true);
            }}
          >
            <img src={x} alt="Spooky grave" height="150px" />
            <SnailH2>Snail</SnailH2>
          </GraveWrapper>
          <GraveWrapper>
            <img src={Grave2} alt="Spooky grave" height="150px" />
            <SnailH2>Snailiosaurus</SnailH2>
          </GraveWrapper>
          <GraveWrapper>
            <img src={Grave3} alt="Spooky grave" height="150px" />
            <SnailH2>Mike</SnailH2>
          </GraveWrapper>
          <GraveWrapper>
            <img src={Grave1} alt="Spooky grave" height="150px" />
            <SnailH2>boo</SnailH2>
          </GraveWrapper>
          <GraveWrapper>
            <img src={Grave3} alt="Spooky grave" height="150px" />
            <SnailH2>Mike</SnailH2>
          </GraveWrapper>
          <GraveWrapper>
            <img src={Grave1} alt="Spooky grave" height="150px" />
            <SnailH2>boo</SnailH2>
          </GraveWrapper>
        </AllGraveWrapper>

        <ReactModal
          isOpen={isModalOpen}
          className="modal-body"
          overlayClassName="modal-overlay"
        >
          <CloseButton handler={toggleIsModalOpen} />
          <ModalContentWrapper>
            {/* TODO: snail name */}
            <Title>Here lies Snail</Title>{' '}
            <ModalContentBox>
              <Snail>
                <img src={PinkSnail} alt="snail who passed away" width="200" />
              </Snail>

              <SnailH2>
                Snail passed away when you failed your reading goal.
              </SnailH2>
            </ModalContentBox>
          </ModalContentWrapper>
        </ReactModal>
      </ScrollableDiv>
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
