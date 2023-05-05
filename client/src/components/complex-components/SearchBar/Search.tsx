import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  SmallHalfRoundedButton,
  SearchInput,
  VisuallyHiddenSpan,
} from '../../simple-components';
import { FiSearch } from 'react-icons/fi';

type SearchProps = {
  /**
   * What to override the id with
   */
  overrideId?: string;
};

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: baseline;
  gap: 5px;
  max-height: 3rem;
  width: 45rem;
  padding-bottom: 1rem;
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
          <div>
            <VisuallyHiddenSpan>
              <label htmlFor={overrideId ? overrideId : 'book-search-input'}>
                Book Search
              </label>
            </VisuallyHiddenSpan>

            <FiSearch
              style={{
                color: 'grey',
                fontSize: '25px',
                transform: 'translate(130%, 25%)',
              }}
            />
            <SearchInput
              id={overrideId ? overrideId : 'book-search-input'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></SearchInput>
          </div>
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
