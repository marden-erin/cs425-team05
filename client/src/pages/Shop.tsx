import React, { useState, useEffect } from 'react';
import { useAuthUser } from 'react-auth-kit';

import styled, { css } from 'styled-components';
import {
  ItemSelectCard,
  LargeRoundedButton,
  P,
  PageWrapper,
  SnailImage,
  StarDisplay,
} from '../components';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { COLORS, FONTS_MAIN } from '../constants';
import { GetSnailImg } from '../utils';

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
  padding: 15px 10px;

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
      setSnailColor(snailInfo.color);
      const userInfo = await OWServiceProvider.getUserInformation(username);
      setStarBalance(userInfo.currency);
    };
    loadData();
  }, []);

  const auth = useAuthUser();
  const username = auth()?.username;
  const [snailName, setSnailName] = useState('');
  const [snailColor, setSnailColor] = useState('');

  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('hat');
  const [starBalance, setStarBalance] = useState(0);

  return (
    <PageWrapper pageTitle="Shop">
      <SnailCard>
        <SnailTitle>{snailName}</SnailTitle>
        <SnailImage
          username={username}
          width={30}
          overrideGlasses="Round"
          overrideHat="Party"
        />
        <Status>
          <StarDisplay />
        </Status>
        <Status>
          <P>
            <b>{snailName}</b> is checking out{' '}
            {itemType === 'glasses' ? 'these' : 'this'} cool new {itemName}{' '}
            {itemType}. They wish they could wear{' '}
            {itemType === 'glasses' ? 'them' : 'it'} forever!
          </P>
        </Status>
        {
          // TODO: Buy item, then go to snail page
        }
        <LargeRoundedButton>Buy Item</LargeRoundedButton>
      </SnailCard>
      <ShopCard>
        <H1>Shop</H1>
        <ItemsWrapper>
          <ItemSection>
            <H2>Snail Colors</H2>
            <RadioWrapper>
              <ItemSelectCard
                item="blue"
                name="accessory"
                itemResult={itemName}
                itemType="color"
                changeResult={setItemName}
                changeItemType={setItemType}
              />
              <ItemSelectCard
                item="pink"
                name="accessory"
                itemResult={itemName}
                itemType="color"
                changeResult={setItemName}
                changeItemType={setItemType}
              />
              <ItemSelectCard
                item="yellow"
                name="accessory"
                itemResult={itemName}
                itemType="color"
                changeResult={setItemName}
                changeItemType={setItemType}
              />
            </RadioWrapper>
          </ItemSection>
          <ItemSection>
            <H2>Hats</H2>
            <RadioWrapper>
              <ItemSelectCard
                item="party"
                name="accessory"
                itemResult={itemName}
                itemType="hat"
                changeResult={setItemName}
                changeItemType={setItemType}
              />
              <ItemSelectCard
                item="cowboy"
                name="accessory"
                itemResult={itemName}
                itemType="hat"
                changeResult={setItemName}
                changeItemType={setItemType}
              />
              <ItemSelectCard
                item="astronaut"
                name="accessory"
                itemResult={itemName}
                itemType="hat"
                changeResult={setItemName}
                changeItemType={setItemType}
              />
            </RadioWrapper>
          </ItemSection>
          <ItemSection>
            <H2>Glasses</H2>
            <RadioWrapper>
              <ItemSelectCard
                item="round"
                name="accessory"
                itemResult={itemName}
                itemType="glasses"
                changeResult={setItemName}
                changeItemType={setItemType}
              />
              <ItemSelectCard
                item="square"
                name="accessory"
                itemResult={itemName}
                itemType="glasses"
                changeResult={setItemName}
                changeItemType={setItemType}
              />
              <ItemSelectCard
                item="sun"
                name="accessory"
                itemResult={itemName}
                itemType="glasses"
                changeResult={setItemName}
                changeItemType={setItemType}
              />
            </RadioWrapper>
          </ItemSection>
        </ItemsWrapper>
      </ShopCard>
    </PageWrapper>
  );
}

export default Shop;
