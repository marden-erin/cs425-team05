// TODO: Delete this file when actual pages are added
import React from 'react';
import styled from 'styled-components';

import PageWrapper from '../components/complex-components/PageWrapper/PageWrapper'; // *TODO: Fix so it imports from components
import { P } from '../components';
import { COLORS } from '../constants';
import Book from '../components/simple-components/Book';

const Options = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(202, 200, 231, 0.8);
  border-radius: 10px 10px 10px 10px

`;
const Selected = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(202, 200, 231, 0.8);
  border-radius: 10px 10px 10px 10px

`;
const Box_Wrapper = styled.div`
  display: flex;
  gap: 5rem;
  align-items: center;
  justify-content: center;
`;


// *TODO: Remove header when logo is added
function SearchResults() {
  return (
    <PageWrapper pageTitle="SearchvResults" header="Search Results">
      <Box_Wrapper>
        <Options></Options>
        <Selected></Selected>
      </Box_Wrapper>
    </PageWrapper>
  );
}

export default SearchResults;