import React from 'react';
import styled from 'styled-components';
import {
  FilterDropdown,
  LargeBookCard,
  SmallBookCard,
  PageWrapper,
} from '../components';
import { COLORS, FONTS_MAIN, ScrollBarStyle } from '../constants';

// TODO: DELETE THIS - Just used to show how a map function works
const TEMPBOOKEXAMPLES = [
  {
    title: 'The Memoirs of a Slug with a Shell: An Extended Discussion',
    author: 'Barack Obama',
    cover: '',
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
  height: 60rem;
  padding: 20px 15px;
  background-color: ${COLORS.PURPLE_XTRALIGHT};
  box-shadow: 10px 10px 10px #220d50;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScrollableDiv = styled.div`
  height: 52.5rem;
  width: 50rem;
  background-color: ${COLORS.PURPLE_LIGHT};

  // Makes the div scrollable
  overflow-y: scroll;
  overflow-x: hidden;

  .small-book-card {
    margin-inline-start: 5px;
    margin-block-start: 10px;
  }

  ${ScrollBarStyle}
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
          <ScrollableDiv>
            {TEMPBOOKEXAMPLES.map(
              ({ title, author, cover, selected }, index) => {
                return (
                  <SmallBookCard
                    bookTitle={title}
                    authorName={author}
                    bookCover={cover}
                    selected={selected}
                    key={index}
                  />
                );
              }
            )}
          </ScrollableDiv>
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
