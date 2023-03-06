import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SmallHalfRoundedButton, ThinInput } from '../../simple-components';
const SearchBarWrapper = styled.div`
  display: flex;
  gap: 5px;
  width: 55rem;
`;

export const Search = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleChange = () => {
    // Only search if the user actually entered something
    if (input !== '') {
      navigate('/search-results', { state: { input } });
    }
  };
  return (
    <>
      <form>
        <SearchBarWrapper>
          <ThinInput
            placeholder={'Search for books...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></ThinInput>
          <SmallHalfRoundedButton type="button" onClick={handleChange}>
            Search
          </SmallHalfRoundedButton>
        </SearchBarWrapper>
      </form>
      <div></div>
    </>
  );
};

export default Search;
