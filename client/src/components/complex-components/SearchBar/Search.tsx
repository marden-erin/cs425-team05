import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SmallHalfRoundedButton, ThinInput } from '../../simple-components';

type SearchProps = {
  /**
   * What to override the id with
   */
  overrideId?: string;
};

const SearchBarWrapper = styled.div`
  display: flex;
  gap: 5px;
  width: 55rem;
`;

export const Search = ({ overrideId }: SearchProps) => {
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
            id={overrideId ? overrideId : 'book-search-input'}
            placeholder={'Search for books...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></ThinInput>
          <SmallHalfRoundedButton
            id="book-search-button"
            type="button"
            onClick={handleChange}
          >
            Search
          </SmallHalfRoundedButton>
        </SearchBarWrapper>
      </form>
      <div></div>
    </>
  );
};

export default Search;
