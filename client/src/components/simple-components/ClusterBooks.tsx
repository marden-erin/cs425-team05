//ERIN TODO: Rework to display all books in a cluster

import { Book } from '../../../../server/src/utils/Types';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { COLORS } from '../../constants';
import { P } from './TextComponents';
import OWServiceProvider from '../../OuterWhorldServiceProvider';
import { useAuthUser } from 'react-auth-kit';

const ColumnFlexCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Results = styled.div`
  ${ColumnFlexCss}
  justify-content: center;
  width: 600px;
  height: 600px;
  background-color: ${COLORS.PURPLE_LIGHT};
  border-radius: 25px;

  position: absolute;
  right: 420px;
  top: 185px;
  padding: 10px;
`;

const Title = styled.div`
  font-size: 4rem;
  font-weight: 200;
  color: ${COLORS.BLUE_DARK};
  text-align: center;
`;

const PageCount = styled.div`
  font-size: 1.25rem;
  font-weight: 50;
  color: ${COLORS.BLUE_DARK};
  text-align: center;
`;
const Author = styled.div`
  font-size: 2rem;
  font-weight: 100;
  color: ${COLORS.BLUE_DARK};
  text-align: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100px;
  align-items: center;
  gap: 100px;
`;
const OutPut = styled.div`
  font-size: 2rem;
  font-weight: 200;
  color: ${COLORS.WHITE};
  padding: 10px;
`;

function ClusterBooks(book: Book) {
  const auth = useAuthUser();
  const { title, authors, description, pageCount, cover } = book;

  console.log(title);
  console.log(authors);
  console.log(description);
  console.log(pageCount);
  console.log(cover);
  const shouldDisplay = title && authors && description && pageCount && cover;

  const [add, setAdd] = useState('');

  const username = auth()?.username;

  const loadData = async (e: any) => {
    e.preventDefault();
    const date = new Date();
    const response = await OWServiceProvider.addBookToCluster(
      'test',
      username,
      book,
      date.toString()
    );
    console.log(response);
    setAdd(response);
  };

  return (
    <>
      <div>
        {shouldDisplay && (
          <Results>
            {' '}
            <Title>{title}</Title>
            {authors.map((item: string) => {
              return <Author> {item}</Author>;
            })}{' '}
            <br></br>
            <img src={cover} alt={title + ' cover'} />
            <PageCount>{pageCount} Pages</PageCount>
            <br></br>
            <P>{description}</P>
            <br></br>
            <OutPut>{add}</OutPut>
          </Results>
        )}
      </div>
    </>
  );
}
export default ClusterBooks;
