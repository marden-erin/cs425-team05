import styled from 'styled-components';

import { SmallHalfRoundedButton, ThinInput } from '../../simple-components';

const SearchBarWrapper = styled.div`
    display: flex;
    gap: 5px;
`;

// POST PROTOTYPE TODO: Add label
export const SearchBar = () => (
    <SearchBarWrapper>
        <ThinInput placeholder="Search for authors, books, clusters, or users" />
        <SmallHalfRoundedButton>Search</SmallHalfRoundedButton>
    </SearchBarWrapper>
);

export default SearchBar;