import React from 'react';
import styled, { css } from 'styled-components';
import { FiChevronDown } from 'react-icons/fi';

import { COLORS } from '../../../constants';
import Search from '../SearchBar/Search';
import { PrototypePages, ClusterPages, SnailPages } from './NAV_BAR_LINKS';
import Logo from '../../../imgs/logo.png';
import { useSignOut, useAuthUser } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import OWServiceProvider from '../../../OuterWhorldServiceProvider';

const LinkStyle = css`
  width: 15rem;
  height: 5rem;
  border: none;
  background-color: ${COLORS.GRAY_MID};
  transition: background-color 0.75s ease-out;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.6rem;
  color: ${COLORS.WHITE};

  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: ${COLORS.GRAY_MIDARK};
  }
`;

const NavWrapper = styled.nav`
  height: 5rem;
  padding: 0.5rem 6rem 0.5rem 3rem;
  background-color: ${COLORS.GRAY_MID};

  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999999;
`;

const LinkWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

const LogoLinkWrapper = styled.a`
  width: 20rem;
  height: 5rem;
`;

const NavLink = styled.a<{ noLink?: boolean }>`
  ${LinkStyle}
  ${(props) =>
    props.noLink &&
    css`
      pointer-events: none;
    `}
  display: flex;
  gap: 4px;
`;

const SearchBarWrapper = styled.div`
  width: 55rem;
`;

const DropDownWrapper = styled.div`
  :hover .dropdown-content {
    display: block;
  }
`;

const DropDownContentWrapper = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  z-index: 1;
`;

type DropDownItems = {
  /**
   * The clickable text shown on the link
   */
  linkLabel: string;
  /**
   * The url to link to
   */
  linkURL: string;
}[];

type DropDownProps = {
  /**
   * The clickable text shown on the link on the NavBar
   */
  linkLabel: string;
  /**
   * The url the link on the NavBar should go to
   */
  linkURL?: string;
  /**
   * An array of elements to be rendered under the dropdown
   */
  dropDownItems: DropDownItems;
};

const DropDownLink = ({ linkLabel, linkURL, dropDownItems }: DropDownProps) => {
  return (
    <DropDownWrapper>
      <NavLink noLink>
        {linkLabel}
        <FiChevronDown role="presentation" size="2rem" />
      </NavLink>
      <DropDownContentWrapper className="dropdown-content">
        {dropDownItems.map(({ linkLabel, linkURL }, index) => {
          return (
            <NavLink className="dropdown-link" href={linkURL} key={index}>
              {linkLabel}
            </NavLink>
          );
        })}
      </DropDownContentWrapper>
    </DropDownWrapper>
  );
};

// POST-PROTOTYPE TODO: Change 'Prototype' back to 'Profile'
export const GraveNavBar = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const auth = useAuthUser();

  const handleSignOut = async () => {
    const username = auth()?.username;
    const date = new Date().toString();
    const res = await OWServiceProvider.signOutUser(username, date);
    signOut();
    navigate('/');
  };

  return (
    <NavWrapper>
      <LogoLinkWrapper href="/">
        <img src={Logo} alt="" role="presentation" width="150px" />
      </LogoLinkWrapper>
      <LinkWrapper>
        <NavLink href="/about">About</NavLink>
        <DropDownLink linkLabel="Prototype" dropDownItems={PrototypePages} />
        <DropDownLink linkLabel="Cluster" dropDownItems={ClusterPages} />
        <DropDownLink linkLabel="Snails" dropDownItems={SnailPages} />
      </LinkWrapper>
      <SearchBarWrapper>
        <Search />
      </SearchBarWrapper>
      <NavLink onClick={handleSignOut}>Sign Out</NavLink>
    </NavWrapper>
  );
};

export default GraveNavBar;
