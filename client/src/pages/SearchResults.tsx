import React from 'react';
import styled, { css } from 'styled-components';
import { SmallBookCard, PageWrapper } from '../components';

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

function SearchResults() {
  return (
    <PageWrapper pageTitle="Search Results" header="Search Results">
      {TEMPBOOKEXAMPLES.map(({title, author, cover, selected}, index) => {
        return(
          <SmallBookCard bookTitle={title} authorName={author} bookCover={cover} selected={selected} key={index}/>
        )
      })}
    </PageWrapper>
  );
}

export default SearchResults;
