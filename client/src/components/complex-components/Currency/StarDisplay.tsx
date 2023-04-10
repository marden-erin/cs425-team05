import React, { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import styled, { css } from 'styled-components';
import OWServiceProvider from '../../../OuterWhorldServiceProvider';
import { BsStars } from 'react-icons/bs';
import { COLORS } from '../../../constants';

type StarDisplayProps = {
  /**
   * Whether the display is showing in the NavBar
   */
  nav?: boolean;
};

const DisplayWrapper = styled.a<{ nav?: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  text-decoration: none;
  transition: background-color 0.25s ease-out;

  b {
    font-size: inherit;
  }

  ${(props) =>
    props.nav
      ? css`
          background: none;
          color: ${COLORS.WHITE};
          font-size: 1.6rem;
          min-width: 10.5rem;
          height: 4rem;
          padding: 0.3rem;
          border-radius: 5px;
          svg {
            min-width: 1.6rem;
            min-height: 1.6rem;
            width: 1.6rem;
            height: 1.6rem;
          }

          :hover {
            background: ${COLORS.WHITE};
            color: ${COLORS.PURPLE_MID};
          }
        `
      : css``}
`;

export const StarDisplay = ({ nav }: StarDisplayProps) => {
  const auth = useAuthUser();
  const username = auth()?.username;
  const [starBalance, setStarBalance] = useState(9999);

  useEffect(() => {
    const loadData = async () => {
      let userInfo = await OWServiceProvider.getUserInformation(username);
      //setStarBalance(userInfo.currency);
    };
    loadData();
  }, []);
  return (
    <DisplayWrapper href="/shop" nav={nav}>
      <b>Stars:</b> {starBalance}
      <BsStars />
    </DisplayWrapper>
  );
};

export default StarDisplay;
