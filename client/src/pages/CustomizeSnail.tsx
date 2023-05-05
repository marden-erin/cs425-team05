import React, { useState, useEffect } from 'react';
import { useAuthUser } from 'react-auth-kit';

import styled, { css } from 'styled-components';
import {
  ItemSelectCard,
  P,
  PageWrapper,
  SnailImage,
  StarDisplay,
  VisuallyHiddenSpan,
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

const CustomizeSnailCard = styled.div`
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

const UnequipButton = styled.button`
  margin-block-start: 0.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  transition: background-color 0.25s ease-out;
  border: none;
  color: ${COLORS.WHITE};

  background: ${COLORS.PURPLE_MID};
  font-size: 1.6rem;
  height: 3rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;

  :hover {
    background: ${COLORS.PURPLE_DARK};
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: end;
  margin-block-end: 1rem;
`;

function CustomizeSnail() {
  useEffect(() => {
    const loadData = async () => {
      const foundAccessories = await OWServiceProvider.getAllAccessories(
        username
      );
      setOwnedAccessories(foundAccessories);
      const snailInfo = await OWServiceProvider.getSnailInfo(username);
      setSnailName(snailInfo.name);
      const userInfo = await OWServiceProvider.getUserInformation(username);
      setStarBalance(userInfo.currency);
      setSnailHealth(snailInfo.health);
    };
    loadData();
  }, []);

  const auth = useAuthUser();
  const username = auth()?.username;
  const [snailName, setSnailName] = useState('');
  const [snailHealth, setSnailHealth] = useState(3);

  const [ownedAccessories, setOwnedAccessories] = useState([]);
  const [starBalance, setStarBalance] = useState(0);

  const buyAccessory = async (
    accessoryType: string,
    accessoryName: string,
    accessoryCost: number
  ) => {
    if (accessoryCost && starBalance < accessoryCost) {
      // If user doesn't have enough stars, don't let them purchase
      window.alert("You don't have enough stars for this item!");
    } else {
      const confirmBox = window.confirm(
        'Purchase ' +
          accessoryName +
          ' ' +
          accessoryType +
          ' for ' +
          accessoryCost +
          ' stars?'
      );
      if (confirmBox === true) {
        await OWServiceProvider.addAccessory(
          username,
          accessoryType,
          accessoryName
        );
        const newCurrency = starBalance - accessoryCost;
        await OWServiceProvider.updateUserInformation(username, newCurrency);
        window.location.reload();
      }
    }
  };

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
    <PageWrapper pageTitle="Customize Snail">
      <SnailCard>
        <SnailTitle>{snailName}</SnailTitle>
        <SnailImage username={username} snailHealth={snailHealth} width={30} />
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
      <CustomizeSnailCard>
        <H1>{snailName}'s Closet</H1>
        <ItemsWrapper>
          <ItemSection>
            <H2>Snail Colors</H2>
            <RadioWrapper>
              <ItemSelectCard
                item="blue"
                itemType="color"
                ownedAccessories={ownedAccessories}
                changeAccessory={setColor}
                handlePurchase={buyAccessory}
              />
              <ItemSelectCard
                item="pink"
                itemType="color"
                ownedAccessories={ownedAccessories}
                changeAccessory={setColor}
                handlePurchase={buyAccessory}
              />
              <ItemSelectCard
                item="yellow"
                itemType="color"
                ownedAccessories={ownedAccessories}
                changeAccessory={setColor}
                handlePurchase={buyAccessory}
              />
            </RadioWrapper>
          </ItemSection>
          <ItemSection>
            <HeaderWrapper>
              <H2>Hats</H2>
              <UnequipButton onClick={() => setHat('')}>
                Remove<VisuallyHiddenSpan> Hat</VisuallyHiddenSpan>
              </UnequipButton>
            </HeaderWrapper>
            <RadioWrapper>
              <ItemSelectCard
                item="party"
                itemType="hat"
                ownedAccessories={ownedAccessories}
                changeAccessory={setHat}
                handlePurchase={buyAccessory}
              />
              <ItemSelectCard
                item="cowboy"
                itemType="hat"
                ownedAccessories={ownedAccessories}
                changeAccessory={setHat}
                handlePurchase={buyAccessory}
              />
              <ItemSelectCard
                item="astronaut"
                itemType="hat"
                ownedAccessories={ownedAccessories}
                changeAccessory={setHat}
                handlePurchase={buyAccessory}
              />
            </RadioWrapper>
          </ItemSection>
          <ItemSection>
            <HeaderWrapper>
              <H2>Glasses</H2>
              <UnequipButton onClick={() => setGlasses('')}>
                Remove<VisuallyHiddenSpan> Glasses</VisuallyHiddenSpan>
              </UnequipButton>
            </HeaderWrapper>
            <RadioWrapper>
              <ItemSelectCard
                item="round"
                itemType="glasses"
                ownedAccessories={ownedAccessories}
                changeAccessory={setGlasses}
                handlePurchase={buyAccessory}
              />
              <ItemSelectCard
                item="square"
                itemType="glasses"
                ownedAccessories={ownedAccessories}
                changeAccessory={setGlasses}
                handlePurchase={buyAccessory}
              />
              <ItemSelectCard
                item="sun"
                itemType="glasses"
                ownedAccessories={ownedAccessories}
                changeAccessory={setGlasses}
                handlePurchase={buyAccessory}
              />
            </RadioWrapper>
          </ItemSection>
        </ItemsWrapper>
      </CustomizeSnailCard>
    </PageWrapper>
  );
}

export default CustomizeSnail;
