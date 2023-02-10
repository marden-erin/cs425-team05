
import { Book } from '../../../../server/src/utils/Types';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { COLORS, FONTS_MAIN, ScrollBarStyle  } from '../../constants';
import {
  P,
  Author,
  PageCount,
  BookTitle,
} from '../simple-components/TextComponents';
import { SmallRoundedButton } from '../simple-components/ButtonsLinks';
import OWServiceProvider from '../../OuterWhorldServiceProvider';
import { LargeBookCard, SmallBookCard } from './BookResult';
import { FilterDropdown } from './SearchBar';

const ColumnFlexCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Erin ToDO:: change this div to something else
const Results = styled.div`
  ${ColumnFlexCss}
  justify-content: center;
  width: 600px;
  height: 600px;
  background-color: ${COLORS.PURPLE_LIGHT};
  border-radius: 25px;

  position: absolute;
  right: 485px;
  top: 185px;
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100px;
  align-items: center;
  gap: 100px;
`;
// Erin ToDO:: change this div to something else

const OutPut = styled.div`
  font-size: 2rem;
  font-weight: 200;
  color: ${COLORS.WHITE};
  padding: 10px;
`;

const ResultsCard = styled.div`
  width: 50rem;
  height: 60rem;
  padding: 20px 15px;
  background-color: ${COLORS.PURPLE_XTRALIGHT};
  box-shadow: 10px 10px 10px #220d50;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScrollableDiv = styled.div`
  height: 52.5rem;
  width: 50rem;
  background-color: ${COLORS.PURPLE_LIGHT};
  // Makes the div scrollable
  overflow-y: scroll;
  overflow-x: hidden;
  .small-book-card {
    margin-inline-start: 5px;
    margin-block-start: 10px;
  }
  ${ScrollBarStyle}
`;

const H1 = styled.h1`
  font-family: ${FONTS_MAIN};
  font-style: italic;
  font-weight: 600;
  font-size: 2.4rem;
  line-height: 2.9rem;
  margin-bottom: 4px;
`;
const GridWrapper = styled.div`
  height: 85vh;
  padding: 3vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 35px;
`;

function BookData(book: Book) {
  const { title, authors, description, pageCount, cover } = book;
  console.log(title);
  console.log(authors);
  console.log(description);
  console.log(pageCount);
  console.log(cover);
  const shouldDisplay = title && authors && description && pageCount && cover;
  console.log(props.allBooks[1])
  const [add, setAdd] = useState('');
  const loadData = async (e: any) => {
    e.preventDefault();
    const response = await OWServiceProvider.addBookToCluster(
      'test',
      'andrei',
      props.book
    );
    console.log(response);
    setAdd(response);
  };
  

  return (
    <>
      <div>
        <GridWrapper>
         <ResultsCard> 
          <H1>Search Results</H1>
           <FilterDropdown />
          <ScrollableDiv>
            
                  <SmallBookCard
                    bookTitle={title}
                    authorName={authors}
                    bookCover={<img src={cover} alt ={title + " book cover"} />}

                    // selected={selected}
                    // key={index}
                  />
            
          </ScrollableDiv>
        </ResultsCard> 
      
        <LargeBookCard
         bookTitle={title}
         authorName={authors}
         bookCover={<img src={cover} alt ={title + " book cover"} />}
         genres={[
           'Horror',
           'Mystery',
           'Historical Fiction',
           "Children's Literature",
         ]} 
        description = {description}
        />
        {/* {shouldDisplay && (
          <Results>
            {' '}
            <BookTitle>{title}</BookTitle>
            {authors.map((item: string) => {
              return <Author> {item}</Author>;
            })}{' '}
            <br></br>
            <img src={cover} alt={title + ' cover'} />
            <PageCount>{pageCount} Pages</PageCount>
            <br></br>
            <P>{description}</P>
            <br></br>
            <ButtonWrapper>
              <SmallRoundedButton onClick={loadData}>
                Add to Cluster
              </SmallRoundedButton>
              <SmallRoundedButton>Add Review</SmallRoundedButton>
            </ButtonWrapper>
            <OutPut>{add}</OutPut>
          </Results>
        )} */}
      </GridWrapper></div>
    </>
  );
}
export default BookData;