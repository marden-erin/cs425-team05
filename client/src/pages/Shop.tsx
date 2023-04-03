import React, { useState, useEffect } from 'react';
import { useAuthUser } from 'react-auth-kit';

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

const GridWrapper = styled.div`
  padding: 4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`;

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
`;

const ShopCard = styled.div`
  ${CardCss};
  height: 55rem;
  width: 75rem;
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
  margin-inline-start: 2rem;
  margin-block-start: 1rem;
  margin-block-end: 1rem;
`;

// Must be span since it shows before h1
const SnailTitle = styled.span`
  ${HeadingCss};
`;

const SnailStatus = styled.div`
  margin-block-start: 10px;
  margin-top: 20px;
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
  margin-block-start: 2rem;
  display: flex;

  width: 70rem;
  height: 45rem;
  overflow-y: scroll;
  overflow-x: hidden;
  ${ScrollBarStyle};
`;

function Shop() {
  useEffect(() => {
    const loadData = async () => {
      // TODO: load available shop items
      const snailInfo = await OWServiceProvider.getSnailInfo(username);
      setSnailName(snailInfo.name);
      setSnailColor(snailInfo.color);
      console.log(snailColor); // Don't delete this
      setSnailImage(GetSnailImg(snailColor, 3));
    };
    loadData();
  }, []);

  const auth = useAuthUser();
  const username = auth()?.username;
  const [snailName, setSnailName] = useState('');
  const [snailColor, setSnailColor] = useState('');
  const [snailImage, setSnailImage] = useState('');

  const [itemType, setItemType] = useState('hat'); // TODO: Get item type dynamically

  return (
    <PageWrapper pageTitle="Shop">
      <GridWrapper>
        <SnailCard>
          <SnailTitle>{snailName}</SnailTitle>
          <img
            src={snailImage}
            alt={snailName + ' checking out the cool things in the shop'}
            width="300"
            className="snail"
          />
          <SnailStatus>
            <P>
              <b>{snailName}</b> is checking out this cool new {itemType}. They
              wish they could wear it forever!
            </P>
          </SnailStatus>
          {
            // TODO: Go to inventory
          }
          <LargeRoundedLink href="/">Go To Inventory</LargeRoundedLink>
        </SnailCard>
        <ShopCard>
          <H1>Shop</H1>
          <ItemsWrapper>
            <ItemSection>
              <H2>Hats</H2>
              <ItemSelectCard item="hat" />
            </ItemSection>
          </ItemsWrapper>
        </ShopCard>
      </GridWrapper>
    </PageWrapper>
  );
}

export default Shop;
