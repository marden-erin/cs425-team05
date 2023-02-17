import { Book } from '../../../../../server/src/utils/Types';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { COLORS, FONTS_MAIN, ScrollBarStyle } from '../../../constants';
import { SmallRoundedButton } from '../../simple-components/ButtonsLinks';
import OWServiceProvider from '../../../OuterWhorldServiceProvider';
import { LargeBookCard, SmallBookCard } from '.';
import { FilterDropdown } from '../SearchBar';
import { ClusterDropDown } from '../Clusters';

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

const LargeBox = styled.div`
  margin-left: -50px;
`;

function BookData(props: any) {
  const { title, authors, description, pageCount, cover } = props.book;

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

  var selector: boolean;

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
                  if (props.book.cover === cover) {
                    selector = false;
                  } else {
                    selector = true;
                  }
                  return (
                    <>
                      <button
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
                          selected={selector}
                          key={index}
                        />
                      </button>
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
