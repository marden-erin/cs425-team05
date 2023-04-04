import React, { useState, useEffect } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { BsStars } from 'react-icons/bs';

import styled, { css } from 'styled-components';
import {
  ItemSelectCard,
  LargeRoundedLink,
  P,
  PageWrapper,
} from '../components';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { COLORS, FONTS_MAIN, ScrollBarStyle } from '../constants';
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

const StarsStatus = styled(Status)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.2rem;

  p {
    font-size: 2rem;
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
      // TODO: load available shop items
      const snailInfo = await OWServiceProvider.getSnailInfo(username);
      setSnailName(snailInfo.name);
      setSnailColor(snailInfo.color);
      setSnailImage(GetSnailImg(snailColor, 3));
      // TODO: load star balance
    };
    loadData();
  }, []);

  const auth = useAuthUser();
  const username = auth()?.username;
  const [snailName, setSnailName] = useState('');
  const [snailColor, setSnailColor] = useState('');
  const [snailImage, setSnailImage] = useState('');

  const [itemType, setItemType] = useState('hat'); // TODO: Get item type dynamically
  const [starBalance, setStarBalance] = useState(123); // TODO: Get item type dynamically

  return (
    <PageWrapper pageTitle="Shop">
      <SnailCard>
        <SnailTitle>{snailName}</SnailTitle>
        <img
          src={snailImage}
          alt={snailName + ' checking out the cool things in the shop'}
          width="300"
          className="snail"
        />
        <StarsStatus>
          <P>
            <b>Stars:</b> {starBalance}
          </P>
          <BsStars size="2rem" color={COLORS.PURPLE_MID} />
        </StarsStatus>
        <Status>
          <P>
            <b>{snailName}</b> is checking out this cool new {itemType}. They
            wish they could wear it forever!
          </P>
        </Status>
        {
          // TODO: Go to inventory
        }
        <LargeRoundedLink href="/">Go To Inventory</LargeRoundedLink>
      </SnailCard>
      <ShopCard>
        <H1>Shop</H1>
        <ItemsWrapper>
          <ItemSection>
            <H2>Snail Colors</H2>
            <RadioWrapper>
              <ItemSelectCard item="green" />
              <ItemSelectCard item="black" />
              <ItemSelectCard item="rainbow" />
            </RadioWrapper>
          </ItemSection>
          <ItemSection>
            <H2>Hats</H2>
            <RadioWrapper>
              <ItemSelectCard item="party" />
              <ItemSelectCard item="cowboy" />
              <ItemSelectCard item="astronaut" />
            </RadioWrapper>
          </ItemSection>
          <ItemSection>
            <H2>Glasses</H2>
            <RadioWrapper>
              <ItemSelectCard item="Reading" />
              <ItemSelectCard item="Radical" />
              <ItemSelectCard item="Alien" />
            </RadioWrapper>
          </ItemSection>
        </ItemsWrapper>
      </ShopCard>
    </PageWrapper>
  );
}

export default Shop;
