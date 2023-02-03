import React, { useState } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../constants';
import BookData from '../../simple-components/Book';
import { SmallHalfRoundedButton, ThinInput } from '../../simple-components';
import { Book } from '../../../../../server/src/utils/Types';
import OWServiceProvider from '../../../OuterWhorldServiceProvider';

const SearchBarWrapper = styled.div`
  display: flex;
  gap: 5px;
  width: 55rem;
`;
//

const TEMP_DIV = styled.div`
  width: 600px;
  height: 600px;

  background-color: ${COLORS.WHITE};
`;

const Search = () => {
  const [bookInfo, setBookInfo] = useState({} as Book);
  const [input, setInput] = useState('');

  // just an example of how to use the API. If you don't include the bookTitle param you will be given an error
  const loadData = async (e: any) => {
    e.preventDefault();
    const data = await OWServiceProvider.getBookInfo(input);
    setBookInfo(data[0]);
  };

  return (
    //<PageWrapper pageTitle="Search Results" header="Search Results">
    <>
      <form onSubmit={loadData}>
        <SearchBarWrapper>
          <ThinInput
            placeholder="Search for authors, books, clusters, or users"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></ThinInput>
          <SmallHalfRoundedButton>Search</SmallHalfRoundedButton>
        </SearchBarWrapper>
      </form>
      <div>
        <BookData {...bookInfo}></BookData>
      </div>
    </>
    // </PageWrapper>
  );
};

export default Search;
