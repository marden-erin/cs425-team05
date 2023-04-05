import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { LargeRoundedButton, GraveAdoptionPageWrapper } from '../components';
import { COLORS } from '../constants';
import { useAuthUser } from 'react-auth-kit';

import Grave1 from './../imgs/graveyard/Grave stone.png';
import Grave2 from './../imgs/graveyard/Grave stone 2.png';
import Grave3 from './../imgs/graveyard/Grave stone 3.png';

const FlexBoxWrapper = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10rem;
  margin-top: 5rem;
`;

const Radio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
`;

const CardWrapper = styled.div`
  width: 30rem;
  height: 32.5rem;
`;

const CardStyler = styled.div`
  width: 30rem;
  height: 32.5rem;
  padding: 30px 15px;
  background-color: ${COLORS.GRAY_LIGHT};
  box-shadow: 15px 15px 15px #101010;
  transition: background-color 0.25s ease-out;
  border-radius: 15px;
  border: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  :hover {
    background-color: ${COLORS.GRAY_MID};
    cursor: pointer;
    
    img {
        filter: drop-shadow(0px 0px 30px ${COLORS.WHITE});
    }
  }
}
`;

const Input = styled.input`
  position: absolute;
  height: 42rem;
  width: 32rem;
  margin-left: 0.5rem;
  z-index: 10;
  opacity: 0;
  :hover {
    cursor: pointer;
  }

  :hover + .card {
    background-color: ${COLORS.GRAY_MID};
    cursor: pointer;

    img {
      filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5));
    }
  }

  :checked + .card {
    background-color: ${COLORS.GRAY_MID};
    border: 5px solid ${COLORS.GRAY_DARK};

    img {
      filter: drop-shadow(0px 0px 40px ${COLORS.WHITE});
    }
  }
`;

const GraveWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
`;

function GraveAdoption() {
  const navigate = useNavigate(); // Used to redirect after grave is adopted
  const auth = useAuthUser();
  const username: string = auth()?.username;

  const [selected, setSelected] = useState(Grave1);
  const [graveType, setGraveType] = useState(0);

  const handleChange = async () => {
    const snails = await OWServiceProvider.getAllSnails(username);
    for (const snail of snails) {
      if (snail.health <= 0 && snail.date_died === 'null') {
        console.log(snail);
        const graveSelection = await OWServiceProvider.createGrave(
          snail.name,
          username,
          selected,
          graveType
        );
        console.log(graveSelection);
        navigate('/graveyard', { state: { selected } });
        break;
      }
    }
  };

  const handleGraveOne = () => {
    setSelected(Grave1);
    setGraveType(1);
  };
  const handleGraveTwo = () => {
    setSelected(Grave2);
    setGraveType(2);
  };
  const handleGraveThree = () => {
    setSelected(Grave3);
    setGraveType(3);
  };

  return (
    <GraveAdoptionPageWrapper
      pageTitle="Adopt A Grave Stone"
      header="Adopt A Grave Stone"
    >
      <FlexBoxWrapper>
        <Radio>
          <GraveWrapper>
            <CardWrapper>
              <Input
                type="radio"
                name="graveAdoption"
                onChange={() => handleGraveOne()}
              />{' '}
              <CardStyler className="card">
                <img src={Grave1} alt="First Spooky Grave" height="300px" />
              </CardStyler>{' '}
            </CardWrapper>
            <CardWrapper>
              <Input
                type="radio"
                name="graveAdoption"
                onChange={() => handleGraveTwo()}
              />{' '}
              <CardStyler className="card">
                <img src={Grave2} alt="First Spooky Grave" height="300px" />
              </CardStyler>
            </CardWrapper>
            <CardWrapper>
              <Input
                type="radio"
                name="graveAdoption"
                onChange={() => handleGraveThree()}
              />{' '}
              <CardStyler className="card">
                <img src={Grave3} alt="First Spooky Grave" height="300px" />
              </CardStyler>
            </CardWrapper>
          </GraveWrapper>
        </Radio>
        <LargeRoundedButton color="gray" onClick={handleChange}>
          Continue
        </LargeRoundedButton>
      </FlexBoxWrapper>
    </GraveAdoptionPageWrapper>
  );
}

export default GraveAdoption;
