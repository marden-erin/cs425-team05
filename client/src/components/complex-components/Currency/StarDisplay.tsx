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

  color: ${COLORS.BLACK};
  b {
    color: ${COLORS.PURPLE_MID};
    font-size: inherit;
  }
  svg {
    color: ${COLORS.PURPLE_MID};
  }

  ${(props) =>
    props.nav
      ? css`
          background: none;
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
            background: ${COLORS.PURPLE_LIGHT};
          }
        `
      : css`
          pointer-events: none;
          font-size: 2rem;
          svg {
            min-width: 2rem;
            min-height: 2rem;
            width: 2rem;
            height: 2rem;
          }
        `}
`;

export const StarDisplay = ({ nav }: StarDisplayProps) => {
  const auth = useAuthUser();
  const username = auth()?.username;
  const [starBalance, setStarBalance] = useState(1234);

  useEffect(() => {
    const loadData = async () => {
      let userInfo = await OWServiceProvider.getUserInformation(username);
      setStarBalance(userInfo.currency);
    };
    loadData();
  }, []);
  return (
    <DisplayWrapper href="/customize-snail" nav={nav}>
      <b>Stars:</b> {starBalance}
      <BsStars />
    </DisplayWrapper>
  );
};

export default StarDisplay;
