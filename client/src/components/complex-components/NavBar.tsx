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
    color: ${COLORS.WHITE};
    transition: background-color 0.75s ease-out;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.6rem;

    display: flex;
    align-items: center;

    :hover {
        background-color: ${COLORS.WHITE};
        color: ${COLORS.BLUE_DARK};
    }
`;

const NavWrapper = styled.div`
    height: 6rem;
    padding: 0rem 5rem;
    background-color: ${COLORS.BLUE_MID};
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.1);

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

const DropDownWrapper = styled.div`
    :hover .dropdown-content {
        display: block;
    }
`;

const DropDownContentWrapper = styled.div`
    display: none;
    position: absolute;
    z-index: 1;

    .dropdown-link {
        height: 4.5rem;
        background-color: ${COLORS.WHITE};
        color: ${COLORS.BLUE_DARK};
    }
    .dropdown-link:hover {
        background-color: ${COLORS.PURPLE_LIGHT}
    }
`;

const SampleItems = [
    {
        linkLabel: 'Option 1',
        linkURL: SnailImage
    },
    {
        linkLabel: 'Option 2',
        linkURL: SnailImage
    },
    {
        linkLabel: 'Option 3',
        linkURL: SnailImage
    }
];

// *TODO: Get map function working
const DropDownLink = ({
    linkLabel,
    linkURL,
    dropDownItems
    }: DropDownProps) => (
    <DropDownWrapper>
        <NavLink href={linkURL}>{linkLabel}</NavLink>
        <DropDownContentWrapper className="dropdown-content">
            {//dropDownItems.map((item) => {
                //<NavLink className="dropdown-link" href={item.linkURL}>{item.linkLabel}</NavLink>
            //})
        }
        </DropDownContentWrapper>
    </DropDownWrapper>
);

export const NavBar = () => (
    <NavWrapper>
        <_TEMP_Logo />
        <LinkWrapper>
            <NavLink href={SnailImage}>About</NavLink>
            <DropDownLink linkLabel='Profile ↓' linkURL={SnailImage} dropDownItems={SampleItems} />
            <DropDownLink linkLabel='Cluster ↓' linkURL={SnailImage} dropDownItems={SampleItems} />
            <DropDownLink linkLabel='Books ↓' linkURL={SnailImage} dropDownItems={SampleItems} />
        </LinkWrapper>
        <_TEMP_SearchBar />
    </NavWrapper>
);

export default NavBar;