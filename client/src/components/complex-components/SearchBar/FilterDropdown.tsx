import React from 'react';
import styled, { css } from 'styled-components';
import { COLORS, FONTS_MAIN } from '../../../constants';
import { HR } from '../../simple-components';

const Wrapper = styled.div`
    width: 45rem;
`;

const DropdownWrapper = styled.div`
    width: 45rem;
    height: 2.5rem;
    display: flex;
    justify-content: space-around;
`;

const Select = styled.select`
    font-size: 1.6rem;
    color: ${COLORS.PURPLE_MID};
    text-decoration: underline;
    border: none;
    border-radius: 15px;
    padding: 2px;
    background-color: transparent;

    transition: background-color 0.75s ease-out;
    :hover {
        background-color: ${COLORS.PURPLE_MID};
        color: ${COLORS.WHITE};
    }

    option {
        font-size: 1.6rem;
    }
`;

const Label = styled.label`
    font-family: ${FONTS_MAIN};
    color: ${COLORS.PURPLE_MID};
    font-size: 1.6rem;
    letter-spacing: 0.02em;
    margin-inline-end: 3px;
`;

export const FilterDropdown = ({}) => {
    return(
        <Wrapper>
        <DropdownWrapper>
            <div>
                <Label htmlFor="sort">Sort:</Label>
                <Select name="sort" id="sort">
                    <option value="recommended">Recommended</option>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="highest-rated">Highest Rated</option>
                </Select>
            </div>
            <div>
                <Label htmlFor="filter">Filter:</Label>
                <Select name="filter" id="filter">
                    <option value="not-read">Not Read</option>
                    <option value="read">Read</option>
                    <option value="in-progress">In Progress</option>
                </Select>
            </div>
        </DropdownWrapper>
        <HR />
        </Wrapper>
    );
}

export default FilterDropdown;
