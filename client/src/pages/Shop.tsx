import React, { useState, useEffect } from 'react';
import { useAuthUser } from 'react-auth-kit';

import styled, { css } from 'styled-components';
import {
  ItemSelectCard,
  P,
  PageWrapper,
  SnailImage,
  StarDisplay,
} from '../components';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { COLORS, FONTS_MAIN } from '../constants';

const CardCss = css`
  background: ${COLORS.PURPLE_XTRALIGHT};
  box-shadow: 10px 10px 10px #220d50;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 2rem 0rem 3rem;
`;

const SnailCard = styled.div`
  ${CardCss};
  height: 55rem;
  width: 40rem;
  position: fixed;
  left: 15rem;
  top: 15%;
`;

const ShopCard = styled.div`
  ${CardCss};
  width: 75rem;
  margin-inline-start: 60rem;
  margin-block-start: 4rem;
`;

const HeadingCss = css`
  font-family: ${FONTS_MAIN};
  font-style: italic;
  font-weight: 600;
  font-size: 2.4rem;
  line-height: 2.9rem;
  margin-bottom: 4px;
`;

const H1 = styled.h1`
  ${HeadingCss};
`;

const H2 = styled.h2`
  font-family: ${FONTS_MAIN};
  font-weight: 600;
  font-size: 2.6rem;
  color: ${COLORS.BLUE_DARK};
  margin-block-end: 1rem;
`;

const ItemSection = styled.div`
  padding: 1.5rem;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-block-end: 1.5rem;
`;

// Must be span since it shows before h1
const SnailTitle = styled.span`
  ${HeadingCss};
`;

const Status = styled.div`
  background-color: ${COLORS.PURPLE_LIGHT};
  width: 90%;
  padding: 20px 10px;

  p {
    text-align: center;
  }
`;

const ItemsWrapper = styled.div`
  background-color: ${COLORS.PURPLE_LIGHT};
  border: 3px solid ${COLORS.PURPLE_LIGHT};
  display: flex;
  flex-direction: column;
  padding: 1.5rem;

  width: 68rem;
`;

function Shop() {
  useEffect(() => {
    const loadData = async () => {
      // TODO: load items the user already has
      const snailInfo = await OWServiceProvider.getSnailInfo(username);
      setSnailName(snailInfo.name);
    };
    loadData();
  }, []);

  const auth = useAuthUser();
  const username = auth()?.username;
  const [snailName, setSnailName] = useState('');

  const setColor = async (newColor: string) => {
    const snailInfo = await OWServiceProvider.getSnailInfo(username);
    await OWServiceProvider.updateSnailInfo(
      username,
      snailInfo.name,
      newColor,
      snailInfo.health,
      snailInfo.goals_completed,
      snailInfo.goals_failed,
      snailInfo.accessories,
      snailInfo.is_active
    );
    window.location.reload();
  };

  const setHat = async (newHat: string) => {
    const snailInfo = await OWServiceProvider.getSnailInfo(username);
    let savedGlasses = snailInfo.accessories.glasses;
    savedGlasses = savedGlasses === undefined ? '' : savedGlasses; // Fix if undefined
    let newAccessories = {
      hat: newHat,
      glasses: savedGlasses,
    };
    await OWServiceProvider.updateSnailInfo(
      username,
      snailInfo.name,
      snailInfo.color,
      snailInfo.health,
      snailInfo.goals_completed,
      snailInfo.goals_failed,
      newAccessories,
      snailInfo.is_active
    );
    window.location.reload();
  };

  const setGlasses = async (newGlasses: string) => {
    const snailInfo = await OWServiceProvider.getSnailInfo(username);
    let savedHat = snailInfo.accessories.hat;
    savedHat = savedHat === undefined ? '' : savedHat; // Fix if undefined
    let newAccessories = {
      hat: savedHat,
      glasses: newGlasses,
    };
    await OWServiceProvider.updateSnailInfo(
      username,
      snailInfo.name,
      snailInfo.color,
      snailInfo.health,
      snailInfo.goals_completed,
      snailInfo.goals_failed,
      newAccessories,
      snailInfo.is_active
    );
    window.location.reload();
  };

  return (
    <PageWrapper pageTitle="Shop">
      <SnailCard>
        <SnailTitle>{snailName}</SnailTitle>
        <SnailImage username={username} width={30} />
        <Status>
          <StarDisplay />
        </Status>
        <Status>
          <P>
            <b>{snailName}</b> is checking out all of the cool accessories they
            could wear!
          </P>
        </Status>
      </SnailCard>
      <ShopCard>
        <H1>Shop</H1>
        <ItemsWrapper>
          <ItemSection>
            <H2>Snail Colors</H2>
            <RadioWrapper>
              <ItemSelectCard
                item="blue"
                itemType="color"
                isPurchased
                changeAccessory={setColor}
              />
              <ItemSelectCard
                item="pink"
                itemType="color"
                isPurchased
                changeAccessory={setColor}
              />
              <ItemSelectCard
                item="yellow"
                itemType="color"
                isPurchased
                changeAccessory={setColor}
              />
            </RadioWrapper>
          </ItemSection>
          <ItemSection>
            <H2>Hats</H2>
            {
              // TODO: Add unequip button
            }
            <RadioWrapper>
              <ItemSelectCard
                item="party"
                itemType="hat"
                isPurchased
                changeAccessory={setHat}
              />
              <ItemSelectCard
                item="cowboy"
                itemType="hat"
                isPurchased
                changeAccessory={setHat}
              />
              <ItemSelectCard
                item="astronaut"
                itemType="hat"
                isPurchased
                changeAccessory={setHat}
              />
            </RadioWrapper>
          </ItemSection>
          <ItemSection>
            <H2>Glasses</H2>
            {
              // TODO: Add unequip button
            }
            <RadioWrapper>
              <ItemSelectCard
                item="round"
                itemType="glasses"
                isPurchased
                changeAccessory={setGlasses}
              />
              <ItemSelectCard
                item="square"
                itemType="glasses"
                isPurchased
                changeAccessory={setGlasses}
              />
              <ItemSelectCard
                item="sun"
                itemType="glasses"
                isPurchased
                changeAccessory={setGlasses}
              />
            </RadioWrapper>
          </ItemSection>
        </ItemsWrapper>
      </ShopCard>
    </PageWrapper>
  );
}

export default Shop;
