// TODO: Delete this file when actual pages are added
import React from 'react';
import styled from 'styled-components';

import PageWrapper from '../components/complex-components/PageWrapper/PageWrapper'; // *TODO: Fix so it imports from components
import { COLORS } from '../constants';

const Options = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${COLORS.PURPLE_LIGHT};
  border-radius: 10px 10px 10px 10px

`;
const Selected = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${COLORS.PURPLE_LIGHT};
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
        <Options>TEST COMMIT</Options>
        <Selected></Selected>
      </Box_Wrapper>
    </PageWrapper>
  );
}

export default SearchResults;