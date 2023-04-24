import React from 'react';
import styled from 'styled-components';
import { BsStars } from 'react-icons/bs';
import { COLORS, FONTS_SECONDARY } from '../../../constants';

import {
  GetSnailImg,
  GetCroppedHatImg,
  GetCroppedGlassesImg,
  GetColorPrice,
  GetHatPrice,
  GetGlassesPrice,
} from '../../../utils';
import { VisuallyHiddenSpan } from '../../simple-components';

type ItemSelectCardTypes = {
  /**
   * The item name
   */
  item: string;
  /**
   * Type of this item
   */
  itemType: string;
  /**
   * If the item has been purchased or not
   */
  isPurchased?: boolean;
  /**
   * Function for changing active accessory
   */
  changeAccessory: any;
};

const CardWrapper = styled.div``;

const CardStyler = styled.div<{ itemType: string }>`
  width: 16rem;
  height: 18.5rem;
  padding: 30px 15px;
  background-color: ${COLORS.PURPLE_XTRALIGHT};
  box-shadow: 10px 10px 10px #220d50;
  transition: background-color 0.25s ease-out;
  border-radius: 15px;
  border: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  span {
    ${FONTS_SECONDARY};
    font-weight: bold;
    font-size: 2.2rem;
  }
`;

const Button = styled.button`
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
  font-size: 2rem;
  min-width: 10.5rem;
  height: 4rem;
  padding: 0.3rem;
  border-radius: 5px;

  :hover {
    background: ${COLORS.PURPLE_DARK};
  }

  svg {
    color: ${COLORS.WHITE};
  }
`;

export const ItemSelectCard = ({
  item,
  itemType,
  isPurchased,
  changeAccessory,
}: ItemSelectCardTypes) => {
  const capitalizedItem =
    item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(); // Proper capitalization for header

  function GetItemImg(capitalizedItem: string) {
    if (item == '') {
      return;
    }
    switch (itemType) {
      case 'color':
        return GetSnailImg(capitalizedItem);
      case 'hat':
        return GetCroppedHatImg(capitalizedItem);
      case 'glasses':
        return GetCroppedGlassesImg(capitalizedItem);
      default:
        return; // nothing
    }
  }

  function GetItemPrice(capitalizedItem: string) {
    if (item == '') {
      return;
    }
    switch (itemType) {
      case 'color':
        return GetColorPrice(capitalizedItem);
      case 'hat':
        return GetHatPrice(capitalizedItem);
      case 'glasses':
        return GetGlassesPrice(capitalizedItem);
      default:
        return; // nothing
    }
  }

  return (
    <CardWrapper>
      <CardStyler className="card" itemType={itemType}>
        <span>{capitalizedItem}</span>
        <img src={GetItemImg(capitalizedItem)} width="100" />
        {isPurchased ? (
          <Button
            onClick={() => {
              changeAccessory(item);
            }}
          >
            Wear
          </Button>
        ) : (
          <Button>
            <VisuallyHiddenSpan>
              Buy {item} {itemType} for{' '}
            </VisuallyHiddenSpan>
            {GetItemPrice(capitalizedItem)}
            <BsStars size="2rem" />
          </Button>
        )}
      </CardStyler>
    </CardWrapper>
  );
};

export default ItemSelectCard;
