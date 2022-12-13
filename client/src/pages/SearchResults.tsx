// TODO: Delete this file when actual pages are added
import React from 'react';
import styled ,  {css}from 'styled-components';
import { H2, P, PageWrapper, SubTitle } from '../components';
import { COLORS } from '../constants';



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

const Results = styled.div`
  ${ColumnFlexCss}
  justify-content: center;
  width: 600px;
  height: 600px;
  background-color: ${COLORS.PURPLE_LIGHT};
  border-radius: 25px;

  position: absolute;
  right: 420px;
  top: 185px;
  padding: 10px

`;

const Title = styled.div`
    font-size: 4rem;
    font-weight: 200;
    color: ${COLORS.BLUE_DARK};
    text-align: center;
`;


const PageCount = styled.div`
    font-size: 1.25rem;
    font-weight: 50;
    color: ${COLORS.BLUE_DARK};
    text-align: center;
`
const Author = styled.div`
    font-size: 2rem;
    font-weight: 100;
    color: ${COLORS.BLUE_DARK};
    text-align: center;
`


// *TODO: Remove header when logo is added
function SearchResults() {


  

  return (
    <PageWrapper pageTitle="Search Results" header="Search Results">
      <Box_Wrapper>
     
      </Box_Wrapper>
    </PageWrapper>
  );
}

export default SearchResults;