import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NativeStackNavigatorProps } from '@react-navigation/native-stack/lib/typescript/src/types';
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
//

const TEMP_DIV = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${COLORS.WHITE};
`;

export const Search = () => {
  // const [bookInfo, setBookInfo] = useState({} as Book);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  
  // just an example of how to use the API. If you don't include the bookTitle param you will be given an error
  const handleChange = () => {
    navigate('/search-results', {state: {input}})

  }
  // const loadData = async (e: any) => {
  //   e.preventDefault();
  //   const data = await OWServiceProvider.getBookInfo(input);
  //   setBookInfo(data[0]);
  //   // console.log(data);

  // };

  return (
    //<PageWrapper pageTitle="Search Results" header="Search Results">
    <>
      <form >
        <SearchBarWrapper>
          <ThinInput
            placeholder={"Search for books..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></ThinInput>
          <SmallHalfRoundedButton type = "button" onClick = {handleChange}>Search</SmallHalfRoundedButton>
        </SearchBarWrapper>
      </form>
      <div>
        {/* <BookData {...bookInfo}></BookData> */}
      </div>
    </>
    // </PageWrapper>
  );
};

export default Search;
