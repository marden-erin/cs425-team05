import React from 'react';
import styled, { css } from 'styled-components';

import { COLORS } from '../../constants';

// *TODO: Replace with links to pages
const SnailImage = 'https://www.mindbounce.com/p/uploads/2020/05/ae6c6c09.jpg?height=200p&trim=2,2,2,2';

const LinkStyle = css`
    height: 6rem;
    padding: 0rem 3rem;
    border: none;
    background-color: ${COLORS.BLUE_MID};
    transition: background-color 0.75s ease-out;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.8rem;
    color: ${COLORS.WHITE};

    display: flex;
    align-items: center;

    :hover {
        background-color: ${COLORS.BLUE_DARK};
    }
`;

const NavWrapper = styled.div`
    height: 6rem;
    padding: 0rem 5rem;
    background-color: ${COLORS.BLUE_MID};

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LinkWrapper = styled.div`
    display: flex;
    gap: 2rem;
`;

// *TODO: Swap out with real logo
const _TEMP_Logo = styled.div`
    width: 20rem;
    height: 6rem;
    background-color: ${COLORS.PURPLE_MID};
`;

const NavLink = styled.a`
    ${LinkStyle}
`;

const _TEMP_SearchBar = styled.div`
    width: 55rem;
    height: 4.5rem;
    background-color: ${COLORS.PURPLE_MID};
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

const DropDownLink = ({}) => (
    <DropDownWrapper>
        <NavLink>Profile ↓</NavLink>
        <DropDownContentWrapper className="dropdown-content">
            <NavLink href={SnailImage}>Profile ↓</NavLink>
            <NavLink href={SnailImage}>Cluster ↓</NavLink>
            <NavLink href={SnailImage}>Books ↓</NavLink>
        </DropDownContentWrapper>
    </DropDownWrapper>
);

export const NavBar = ({}) => (
    <NavWrapper>
        <_TEMP_Logo />
        <LinkWrapper>
            <NavLink href={SnailImage}>About</NavLink>
            <DropDownLink />
            <NavLink href={SnailImage}>Cluster ↓</NavLink>
            <NavLink href={SnailImage}>Books ↓</NavLink>
        </LinkWrapper>
        <_TEMP_SearchBar />
    </NavWrapper>
);

export default NavBar;