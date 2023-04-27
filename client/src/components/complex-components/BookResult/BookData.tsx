import { Book } from '../../../../../server/src/utils/Types';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { COLORS, FONTS_MAIN, ScrollBarStyle } from '../../../constants';
import { LargeBookCard, SmallBookCard } from '.';
import { ClusterDropDown } from '../Clusters';
import { CreateGoalButton } from '../Goals';
import { useLocation } from 'react-router-dom';

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
  height: 54rem;
  width: 50rem;
  background-color: ${COLORS.PURPLE_LIGHT};
  // Makes the div scrollable
  overflow-y: auto;
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
  margin-bottom: 1.5rem;
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
  outline: inherit;
`;

function BookData(props: any) {
  const location = useLocation();

  // userInput is what the user typed into search bar
  var userInput = location.state.input;

  const { title, authors, description, pageCount, cover } = props.book;
  const [selectedElement, setSelectedElement] = useState(0);
  const [t, setT] = useState('');
  const [a, setA] = useState<any>();
  const [d, setD] = useState('');
  const [c, setC] = useState<string>('');
  const [p, setP] = useState<number>(0);
  const [dropBook, setDropBook] = useState({} as Book);
  useEffect(() => {
    setT(title);
    setA(authors);
    setD(description);
    setC(cover);
    setP(pageCount);
    setDropBook(props.book);
  }, [title, authors, description, cover, pageCount, props.book]);

  const handleClick = (
    title: string,
    author: [],
    pageCount: number,
    cover: string,
    description: string,
    index: any
  ) => {
    setT(props.allBooks[index].title);
    setA(props.allBooks[index].author);
    setD(props.allBooks[index].description);
    setC(props.allBooks[index].cover);
    setP(props.allBooks[index].pageCount);
    setDropBook(props.allBooks[index]);
    setSelectedElement(index);
  };
  let propsToGoalPage = {
    cover: c,
    pageCount: p,
    author: [a],
    description: d,
    title: t,
  };

  return (
    <>
      <div>
        <GridWrapper>
          <ResultsCard>
            <H1>Search Results</H1>
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
                    <div key={index}>
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
                              style={{ maxWidth: '100%', height: '100%' }}
                              src={cover}
                              alt={title + ' book cover'}
                            />
                          }
                          selected={selectedElement === index}
                          key={index}
                        />
                      </Button>
                    </div>
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
                style={{ maxWidth: '100%', height: '100%' }}
                alt={t + ' book cover'}
              />
            }
            description={d}
            AddClusterFunction={<ClusterDropDown>{dropBook}</ClusterDropDown>}
            CreateGoalFunction={
              <CreateGoalButton {...propsToGoalPage}></CreateGoalButton>
            }
          />
        </GridWrapper>
      </div>
    </>
  );
}
export default BookData;
