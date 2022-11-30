import React from 'react';
import styled, { css } from 'styled-components';

import { COLORS } from '../../constants';

const TextStyle = css`
    font-size: 1.8rem;
    color: ${COLORS.WHITE};
`;

const NavWrapper = styled.div`
    height: 6rem;
    padding: 0rem 4rem;
    background-color: ${COLORS.BLUE_MID};

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// *TODO: Swap out with real logo
const _TEMP_Logo = styled.div`
    width: 20rem;
    height: 6rem;
    background-color: ${COLORS.PURPLE};
`;

// *TODO: Change to actual links and dropdowns
const _TEMP_NavLink = styled.text`
    ${TextStyle}
`;

const _TEMP_SearchBar = styled.div`
    width: 55rem;
    height: 4.5rem;
    background-color: ${COLORS.PURPLE};
`;

export const NavBar = ({}) => (
    <NavWrapper>
        <_TEMP_Logo />
            <_TEMP_NavLink>About</_TEMP_NavLink>
            <_TEMP_NavLink>Profile ↓</_TEMP_NavLink>
            <_TEMP_NavLink>Cluster ↓</_TEMP_NavLink>
            <_TEMP_NavLink>Books ↓</_TEMP_NavLink>
        <_TEMP_SearchBar />
    </NavWrapper>
);

export default NavBar;