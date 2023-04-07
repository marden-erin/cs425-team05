import React from 'react';
import styled from 'styled-components';
import { BsStars } from 'react-icons/bs';
import { COLORS, FONTS_SECONDARY } from '../../../constants';

// import { GetItemImg } from '../../../utils';

type ItemSelectCardTypes = {
  /**
   * The item name
   */
  item: string;
  /**
   * Name of the radio group
   */
  name: string;
  /**
   * Result so far
   */
  itemResult: string;
  /**
   * Type of this item
   */
  itemType: string;
  /**
   * Changes result when this radio is clicked
   */
  changeResult: React.Dispatch<React.SetStateAction<string>>;
  /**
   * Changes itemType when this radio is clicked
   */
  changeItemType: React.Dispatch<React.SetStateAction<string>>;
};

const CardWrapper = styled.div``;

const CardStyler = styled.div`
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

const Input = styled.input`
  position: absolute;
  height: 20rem;
  width: 22rem;
  margin-left: 0.5rem;
  z-index: 10;
  opacity: 0;
  :hover {
    cursor: pointer;
  }

  :hover + .card {
    background-color: ${COLORS.PURPLE_MID};
    cursor: pointer;
    span {
      color: ${COLORS.WHITE};
    }
    img {
      filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5));
    }
    div > svg {
      color: ${COLORS.WHITE};
    }
  }

  :checked + .card {
    background-color: ${COLORS.PURPLE_MID};
    border: 5px solid ${COLORS.PURPLE_LIGHT};
    span {
      color: ${COLORS.WHITE};
    }
    img {
      filter: drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5));
    }

    div > svg {
      color: ${COLORS.WHITE};
    }
  }
`;

const CostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.2rem;

  span {
    font-size: 2rem;
  }

  svg {
    color: ${COLORS.PURPLE_MID};
  }
`;

export const ItemSelectCard = ({
  item,
  name,
  itemResult,
  itemType,
  changeResult,
  changeItemType,
}: ItemSelectCardTypes) => {
  const capitalizedItem =
    item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(); // Proper capitalization for header
  const cost = 134; // TODO: Get cost

  return (
    <CardWrapper>
      <Input
        type="radio"
        name={`${name}-radio`}
        value={item}
        checked={itemResult === item}
        onChange={() => {
          changeResult(item);
          changeItemType(itemType);
        }}
      />
      <CardStyler className="card">
        <span>{capitalizedItem}</span>
        {/* <img src={GetItemImg(capitalizedItem)} width="275" /> */}
        <img
          src="https://clipartix.com/wp-content/uploads/2019/02/cowboy-hat-transparent-2019-2.png"
          width="100"
        />
        <CostWrapper>
          <span>{cost}</span>
          <BsStars size="2rem" />
        </CostWrapper>
      </CardStyler>
    </CardWrapper>
  );
};

export default ItemSelectCard;
