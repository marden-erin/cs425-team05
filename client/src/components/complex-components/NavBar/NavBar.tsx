import React from 'react';
import styled, { css } from 'styled-components';

import { COLORS } from '../../../constants';
import { SearchBar } from '../SearchBar';

import { SampleItems, SnailImageURL } from './NAV_BAR_LINKS';
import Logo from '../../../imgs/logo.png';

const LinkStyle = css`
    height: 5rem;
    padding: 0rem 3rem;
    border: none;
    background-color: ${COLORS.BLUE_MID};
    transition: background-color 0.75s ease-out;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.6rem;
    color: ${COLORS.WHITE};

    display: flex;
    align-items: center;

    :hover {
        background-color: ${COLORS.BLUE_DARK};
    }
`;

const NavWrapper = styled.div`
    height: 5rem;
    padding: 0.5rem 6rem 0.5rem 3rem;
    background-color: ${COLORS.BLUE_MID};

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LinkWrapper = styled.div`
    display: flex;
    gap: 2rem;
`;

const LogoLinkWrapper = styled.a`
    width: 20rem;
    height: 5rem;
`;

const NavLink = styled.a`
    ${LinkStyle}
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
    linkURL: string;
    /**
     * An array of elements to be rendered under the dropdown
     */
    dropDownItems: DropDownItems;
};

const DropDownLink = ({
    linkLabel,
    linkURL,
    dropDownItems
    }: DropDownProps) => (
    <DropDownWrapper>
        <NavLink href={linkURL}>{linkLabel}</NavLink>
        <DropDownContentWrapper className="dropdown-content">
            {dropDownItems.map(({linkLabel, linkURL}, index) => {
                return(<NavLink className="dropdown-link" href={linkURL}>{linkLabel}</NavLink>);
            })}
        </DropDownContentWrapper>
    </DropDownWrapper>
);

export const NavBar = () => (
    <NavWrapper>
        <LogoLinkWrapper href="/">
            <img src={Logo} alt="" role="presentation" width="150px" />
        </LogoLinkWrapper>
        <LinkWrapper>
            <NavLink href={SnailImageURL}>About</NavLink>
            <DropDownLink linkLabel='Profile ↓' linkURL={SnailImageURL} dropDownItems={SampleItems} />
            <DropDownLink linkLabel='Cluster ↓' linkURL={SnailImageURL} dropDownItems={SampleItems} />
            <DropDownLink linkLabel='Books ↓' linkURL={SnailImageURL} dropDownItems={SampleItems} />
        </LinkWrapper>
        <SearchBarWrapper>
            <SearchBar />
        </SearchBarWrapper>
    </NavWrapper>
);

export default NavBar;