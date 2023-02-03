import React from 'react';
import styled, { css } from 'styled-components';
import {
  FilterDropdown,
  LargeBookCard,
  SmallBookCard,
  PageWrapper,
} from '../components';
import { COLORS, FONTS_MAIN } from '../constants';

// TODO: DELETE THIS - Just used to show how a map function works
const TEMPBOOKEXAMPLES = [
  {
    title: 'The Memoirs of a Slug with a Shell: An Extended Discussion',
    author: 'Barack Obama',
    cover: '',
    selected: true,
  },
  {
    title: 'Wow! Cool snail!',
    author: 'Tony Hawk',
    cover: '',
  },
  {
    title: 'The Time A Snail Killed My Cousin',
    author: 'Murder Snail',
    cover: '',
  },
];

const GridWrapper = styled.div`
  height: 85vh;
  padding: 3vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 35px;
`;

const ResultsCard = styled.div`
  width: 50rem;
  height: 80vh;
  padding: 20px 15px;
  background-color: ${COLORS.PURPLE_XTRALIGHT};
  box-shadow: 10px 10px 10px #220d50;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H1 = styled.h1`
  font-family: ${FONTS_MAIN};
  font-style: italic;
  font-weight: 600;
  font-size: 2.4rem;
  line-height: 2.9rem;
  margin-bottom: 4px;
`;

function SearchResults() {
  return (
    <PageWrapper pageTitle="Search Results">
      <GridWrapper>
        <ResultsCard>
          <H1>Search Results</H1>
          <FilterDropdown />
          {TEMPBOOKEXAMPLES.map(({ title, author, cover, selected }, index) => {
            return (
              <SmallBookCard
                bookTitle={title}
                authorName={author}
                bookCover={cover}
                selected={selected}
                key={index}
              />
            );
          })}
        </ResultsCard>
        <LargeBookCard
          bookTitle="This is the Title of a Book I could Write"
          authorName="Joe Jonas"
          bookCover=""
          genres={[
            'Horror',
            'Mystery',
            'Historical Fiction',
            "Children's Literature",
          ]}
        />
      </GridWrapper>
    </PageWrapper>
  );
}

export default SearchResults;
