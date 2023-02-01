import React from 'react';
import styled ,  {css}from 'styled-components';
import { H1, H2, P, PageWrapper, SubTitle, Author, PageCount, BookTitle } from '../components';
import { COLORS } from '../constants';

const ColumnFlexCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexBoxWrapper = styled.div`
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
  margin-right: 50px;

`;

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
  padding: 10px;
`;




function SearchResults() {
  return (
    <PageWrapper pageTitle="Search Results" header="Search Results">
      <FlexBoxWrapper><Box_Wrapper></Box_Wrapper></FlexBoxWrapper>
    </PageWrapper>
  );
}

export default SearchResults;
