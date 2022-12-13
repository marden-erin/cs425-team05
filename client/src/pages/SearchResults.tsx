// TODO: Delete this file when actual pages are added
import React from 'react';
import styled ,  {css}from 'styled-components';
import { H2, P, PageWrapper, SubTitle } from '../components';
import { COLORS } from '../constants';


// const Options = styled.div`
//   width: 600px;
//   height: 600px;
//   background-color: ${COLORS.PURPLE_LIGHT};
//   border-radius: 10px 10px 10px 10px

// `;
const ColumnFlexCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const Selected = styled.div`
// ${ColumnFlexCss}

//   width: 600px;
//   height: 600px;
//   background-color: ${COLORS.PURPLE_LIGHT};
//   border-radius: 10px 10px 10px 10px

// `;

const Box_Wrapper = styled.div`
  display: flex;
  gap: 5rem;
  align-items: center;
  justify-content: center;
`;

const ResultsPrompt = styled(H2)`
  color: ${COLORS.BLACK};
  font-weight: 300;
  font-style: italic;
`;
const Temp_Results = styled.div`
  width: 250px;
  height: 100px;
  text-align: center;
  background-color: ${COLORS.WHITE};
`;


// *TODO: Remove header when logo is added
function SearchResults() {
  
  return (
    <PageWrapper pageTitle="Search Results" header="Search Results">
      <Box_Wrapper>
        {/* <Selected><ResultsPrompt>Here are your results!</ResultsPrompt>
        <Temp_Results/>
        </Selected> */}
      </Box_Wrapper>
    </PageWrapper>
  );
}

export default SearchResults;