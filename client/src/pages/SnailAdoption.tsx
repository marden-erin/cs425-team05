import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import ReactModal from 'react-modal';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import {
  CloseButton,
  H2,
  Label,
  LargeRoundedButton,
  P,
  PageWrapper,
  SnailSelectCard,
  ThickInput,
} from '../components';
import { GetSnailImg } from '../utils';
import { COLORS } from '../constants';
import { useAuthUser } from 'react-auth-kit';

const FlexBoxWrapper = styled.div<{ $isModalOpen: boolean }>`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10rem;

  ${(props) =>
    props.$isModalOpen &&
    css`
      pointer-events: none;
    `}
`;

const Radio = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
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

const InputWrapper = styled.div`
  background-color: ${COLORS.PURPLE_LIGHT};
  padding: 2rem 4rem 3rem;
`;

/**
 * TODOS:
 * - Close modal on escape press
 */
function SnailAdoption() {
  const auth = useAuthUser();
  const userName = auth()?.username;
  const [snailColor, setSnailColor] = useState('blue');
  const [snailName, setSnailName] = useState('');
  const [isModalOpen, toggleIsModalOpen] = useState(false);
  const [allowContinue, setAllowContinue] = useState(false); // Used to ensure user names snail before continuing
  const navigate = useNavigate(); // Used to redirect after snail is adopted
  ReactModal.setAppElement('*');

  const handleSubmit = async (e: any) => {
    const date = new Date();
    const dateString = date.toDateString();
    e.preventDefault();
    const create = await OWServiceProvider.createSnail(
      userName,
      snailName,
      snailColor,
      dateString,
      true
    );
    console.log(create);
    navigate('/view-goals');
  };

  return (
    <PageWrapper pageTitle="Adopt A Snail" header="Adopt A Snail" disableNav>
      <FlexBoxWrapper $isModalOpen={isModalOpen}>
        <Radio>
          <SnailSelectCard
            color="blue"
            name="snail-color"
            result={snailColor}
            changeResult={setSnailColor}
          />
          <SnailSelectCard
            color="pink"
            name="snail-color"
            result={snailColor}
            changeResult={setSnailColor}
          />
          <SnailSelectCard
            color="yellow"
            name="snail-color"
            result={snailColor}
            changeResult={setSnailColor}
          />
        </Radio>
        <LargeRoundedButton
          onClick={() => {
            toggleIsModalOpen(true);
          }}
        >
          Continue
        </LargeRoundedButton>
        <ReactModal
          isOpen={isModalOpen}
          className="modal-body"
          overlayClassName="modal-overlay"
        >
          <CloseButton handler={toggleIsModalOpen} />
          <ModalContentWrapper>
            <img
              src={GetSnailImg(snailColor)}
              alt={
                'A ' +
                snailColor +
                ' snail waiting for you to choose their name'
              }
              width="250"
              height="250"
            />
            <RightModalContentWrapper>
              <H2>Name Your Snail!</H2>
              <InputWrapper>
                <Label htmlFor="snail-name">Name:</Label>
                <ThickInput
                  name="snail-name"
                  value={snailName}
                  onInput={(event) => {
                    const element = event.currentTarget as HTMLInputElement;
                    setSnailName(element.value);
                    setAllowContinue(snailName !== '');
                  }}
                />
              </InputWrapper>
              <P>
                <b>Warning:</b> You're responsible for your snail's wellbeing.
                By continuing, you accept responsibility for this snail's life.
              </P>
              <LargeRoundedButton
                disabled={!allowContinue}
                onClick={handleSubmit}
              >
                Adopt Snail
              </LargeRoundedButton>
            </RightModalContentWrapper>
          </ModalContentWrapper>
        </ReactModal>
      </FlexBoxWrapper>
    </PageWrapper>
  );
}

export default SnailAdoption;
