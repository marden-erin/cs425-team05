import OWServiceProvider from '../../../OuterWhorldServiceProvider';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { COLORS } from '../../../constants';
import { useSignOut, useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { SnailImage } from '../Snails';

const Img = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  margin-left: 4rem;
  background-color: ${COLORS.PURPLE_LIGHTMID};
  border: 1px solid ${COLORS.BLUE_DARK};
  border-radius: 50%;
`;

// Jodi's styling
const DropDownWrapper = styled.div`
  :hover .dropdown-content {
    display: block;
    margin-left: -1rem;
  }
`;
const LinkStyle = css`
  width: 15rem;
  height: 5rem;
  border: none;
  background-color: ${COLORS.PURPLE_XTRALIGHT};
  transition: background-color 0.3s ease-out;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.6rem;
  color: ${COLORS.BLUE_DARK};

  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: ${COLORS.PURPLE_LIGHT};
  }
`;
const DropDownItems = styled.button`
  ${LinkStyle}
  display: flex;
  gap: 4px;
`;
const DropDownContentWrapper = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  z-index: 1;
`;

export const ProfilePic = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const auth = useAuthUser();
  const username: string = auth()?.username;

  // andrei's signout code
  const handleSignOut = async () => {
    const username = auth()?.username;
    const date = new Date().toString();
    const res = await OWServiceProvider.signOutUser(username, date);
    signOut();
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile-page');
  };

  return (
    <>
      <DropDownWrapper>
        <Img>
          <SnailImage username={username} snailHealth={3} width={4.8} />
        </Img>
        <DropDownContentWrapper className="dropdown-content">
          <DropDownItems onClick={handleProfile}>My Account</DropDownItems>
          <DropDownItems onClick={handleSignOut}>Sign Out</DropDownItems>
        </DropDownContentWrapper>
      </DropDownWrapper>
    </>
  );
};
