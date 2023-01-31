import { Book } from "../../../../server/src/utils/Types";
import React, {useState} from "react";
import styled, { css } from 'styled-components';
import { COLORS } from "../../constants";
import {H1, H2, P, Author, PageCount, BookTitle } from "../simple-components/TextComponents";
import { SmallRoundedButton } from "../simple-components/ButtonsLinks";
import OWServiceProvider from "../../OuterWhorldServiceProvider";

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
  padding: 10px

`;


const ButtonWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
height: 100px;
align-items: center;
gap: 100px;
`
// Erin ToDO:: change this div to something else

const OutPut = styled.div`
    font-size: 2rem;
    font-weight: 200;
    color: ${COLORS.WHITE};
    padding: 10px
`

function BookData( book : Book) {
    const {title, authors, description, pageCount, cover} = book

    console.log(title)
    console.log(authors)
    console.log(description)
    console.log(pageCount)
    console.log(cover)
    const shouldDisplay = title && authors && description && pageCount && cover

    const [add, setAdd] = useState("")

    const loadData = async(e: any) => {
      e.preventDefault() 
      const response = await OWServiceProvider.addBookToCluster("test", "andrei", book);
      console.log(response);
      setAdd(response)
    }

    return (
    <>        
      <div>{shouldDisplay &&
            <Results> <BookTitle>{title}</BookTitle>{authors.map((item: string) => { return <Author> {item}</Author> })} <br></br><img src={cover} alt={title + " cover"}/>
            <PageCount>{pageCount} Pages</PageCount><br></br>
            <P>{description}</P> 
            <br></br>
            <ButtonWrapper>
            <SmallRoundedButton onClick = {loadData}>Add to Cluster</SmallRoundedButton>
            <SmallRoundedButton>Add Review</SmallRoundedButton></ButtonWrapper>
            <OutPut>{add}</OutPut>
            </Results>}</div>
    </> 

      )
}
export default BookData

