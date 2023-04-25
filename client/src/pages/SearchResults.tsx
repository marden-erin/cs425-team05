import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import styled from 'styled-components';
import { PageWrapper } from '../components';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { Book } from '../../../server/src/utils/Types';
import BookData from '../components/complex-components/BookResult/BookData';
import { LoadingPage } from '../components/complex-components/Loading';

const GridWrapper = styled.div`
  height: 85vh;
  padding: 3vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 35px;
`;

function SearchResults() {
  const [bookInfo, setBookInfo] = useState({} as Book);
  const [allBooks, setAllBooks] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  // userInput is what the user typed into search bar
  var userInput = location.state.input;
  const [myState, setMystate] = useState(userInput);

  if (userInput != myState) {
    window.location.reload();
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 4000);

    const loadData = async (e: any) => {
      const data = await OWServiceProvider.getBookInfo(userInput);
      setBookInfo(data[0]);
      const temp = data.map((x, index) => {
        return {
          key: index,
          title: x.title,
          author: x.authors + ' ',
          cover: x.cover,
          description: x.description,
          pageCount: x.pageCount,
        };
      });
      setAllBooks([...temp]);
    };
    loadData(userInput);
  }, [myState]);

  let props = {
    book: bookInfo,
    allBooks: allBooks,
  };

  return (
    <>
      {' '}
      {loading === false ? (
        <PageWrapper pageTitle="Search Results">
          <GridWrapper>
            <BookData {...props}></BookData>
          </GridWrapper>
        </PageWrapper>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

export default SearchResults;
