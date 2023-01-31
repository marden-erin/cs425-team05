// TODO: Delete this file when actual pages are added
import React from 'react';
import styled, { css } from 'styled-components';
import { SmallBookCard, PageWrapper } from '../components';

function SearchResults() {
  return (
    <PageWrapper pageTitle="Search Results" header="Search Results">
      <SmallBookCard
        bookTitle="The Memoirs of a Slug with a Shell: An Extended Discussion"
        authorName="Barack Obama"
        bookCover=""
      />
    </PageWrapper>
  );
}

export default SearchResults;
