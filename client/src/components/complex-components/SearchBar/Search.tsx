import React, { useState} from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../constants';
import BookData from '../BookData';
import { SmallHalfRoundedButton, ThinInput } from '../../simple-components';
import { Book } from '../../../../../server/src/utils/Types';
import OWServiceProvider from '../../../OuterWhorldServiceProvider';

const SearchBarWrapper = styled.div`
    display: flex;
    gap: 5px;
    width: 55rem;

`;


const Search = () => {
    const [bookInfo, setBookInfo] = useState({} as Book)
    const [input, setInput] = useState("")
  
  
    // If you don't include the bookTitle param you will be given an error
    const loadData = async(e: any) => {
      e.preventDefault()
      const data = await OWServiceProvider.getBookInfo(input)
      setBookInfo(data[0])
    }

    return (
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
          <BookData {...bookInfo}></BookData>
        </div>
        </>
    );
  }
  
  export default Search;


  