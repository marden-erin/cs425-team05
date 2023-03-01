import { Book } from '../../../../../server/src/utils/Types';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { COLORS, FONTS_MAIN, ScrollBarStyle } from '../../../constants';
import OWServiceProvider from '../../../OuterWhorldServiceProvider';
import { LargeBookCard, SmallBookCard } from '.';
import { FilterDropdown } from '../SearchBar';
import { ClusterDropDown } from '../Clusters';

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
 // From https://stackoverflow.com/questions/2460100/remove-the-complete-styling-of-an-html-button-submit
const Button = styled.button`
background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;`;

function BookData(props: any) {
  const { title, authors, description, pageCount, cover } = props.book;

  const [selectedElement, setSelectedElement] = useState(0);
  const shouldDisplay = title && authors && description && pageCount && cover;
  const [t, setT] = useState('');
  const [a, setA] = useState<any>();
  const [d, setD] = useState('');
  const [c, setC] = useState('');
  const [dropBook, setDropBook] = useState({} as Book);
  useEffect(() => {
    setT(title);
    setA(authors);
    setD(description);
    setC(cover);
    setDropBook(props.book);
  }, [title, authors, description, cover, props.book]);

  const handleClick = (
    title: string,
    author: [],
    pageCount: number,
    cover: string,
    description: string,
    index: any
  ) => {
    setT(title);
    setA(author);
    setD(props.allBooks[index].description);
    setC(cover);
    setDropBook(props.allBooks[index]);
    setSelectedElement(index);
  };
  return (
    <>
      <div>
        <GridWrapper>
          <ResultsCard>
            <H1>Search Results</H1>
            <FilterDropdown />
            <ScrollableDiv>
              {props.allBooks.map(
                (
                  {
                    title,
                    author,
                    cover,
                    pageCount,
                    description,
                  }: {
                    title: string;
                    author: [];
                    pageCount: number;
                    cover: string;
                    description: string;
                  },
                  index: any
                ) => {
                  return (
                    <>
                      <Button
                        onClick={() =>
                          handleClick(
                            title,
                            author,
                            pageCount,
                            cover,
                            description,
                            index
                          )
                        }
                      >
                        <SmallBookCard
                          bookTitle={title}
                          authorName={author}
                          bookCover={
                            <img
                              style={{ maxWidth: '100%' }}
                              src={cover}
                              alt={title + ' book cover'}
                            />
                          }
                          selected={selectedElement === index}
                          key={index}
                        />
                      </Button>
                    </>
                  );
                }
              )}
            </ScrollableDiv>
          </ResultsCard>

          <LargeBookCard
            bookTitle={t}
            authorName={[a]}
            bookCover={
              <img
                src={c}
                style={{ maxWidth: '100%' }}
                alt={t + ' book cover'}
              />
            }
            description={d}
            tempFunction={<ClusterDropDown>{dropBook}</ClusterDropDown>}
          />
        </GridWrapper>
      </div>
    </>
  );
}
export default BookData;
