import React, { useState} from 'react';
import styled from 'styled-components';

import PageWrapper from '../PageWrapper/PageWrapper'; // *TODO: Fix so it imports from components
import { P } from '../..';
import { COLORS } from '../../../constants';
import Book from '../../simple-components/Book';
import { SearchBar } from '.';
import { SmallHalfRoundedButton, ThinInput } from '../../simple-components';


const SearchBarWrapper = styled.div`
    display: flex;
    gap: 5px;
    width: 55rem;

`;
type BookData = {
    title: string,
    authors: string[],
    description: string,
    pageCount: number,
    covers: {
      smallThumbnail: string,
      thumbnail: string
    }, 
    epub: {
      isAvailable: boolean,
      accTokenLink ?: string
    },
    pdf: {
      isAvailable: boolean,
      accTokenLink ?: string
    }

}


const TEMP_DIV = styled.div`
  width: 600px;
  height: 600px;

  background-color: ${COLORS.WHITE};
`;

const Search = () => {
    const [bookInfo, setBookInfo] = useState({} as BookData)
    const [input, setInput] = useState("")
  
  
    // just an example of how to use the API. If you don't include the bookTitle param you will be given an error
    const loadData = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const res = await fetch(`/api/book/${input}`);
      const data = await res.json();
  
      setBookInfo(data[0])
    }

    return (
      //<PageWrapper pageTitle="Search Results" header="Search Results">
       <>
        <form onSubmit={loadData}>
        <SearchBarWrapper>
          <ThinInput placeholder="Search for authors, books, clusters, or users"
            value={input} 
            onChange={(e) => setInput(e.target.value)}>
          </ThinInput>  
          <SmallHalfRoundedButton>
            Search
          </SmallHalfRoundedButton> 
          </SearchBarWrapper>
        </form>
        <div>
          <Book {...bookInfo}></Book>
        </div>
        </>
     // </PageWrapper>
    );
  }
  
  export default Search;


  