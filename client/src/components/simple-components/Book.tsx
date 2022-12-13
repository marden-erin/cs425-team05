import { Book } from "../../../../server/src/utils/Types";
import styled, { css } from 'styled-components';
import { COLORS } from "../../constants";
import { SubTitle, P } from "./TextComponents";

const ColumnFlexCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const RightContentWrapper = styled.div`
//   ${ColumnFlexCss}
//   gap: 10px;

//   > .subtitle {
//     width: 475px;
//   }
// `;
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
  padding: 10px

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
`
const Author = styled.div`
    font-size: 2rem;
    font-weight: 100;
    color: ${COLORS.BLUE_DARK};
    text-align: center;
`

function BookData( book : Book) {
    const {title, authors, description, pageCount, cover} = book

    console.log(title)
    console.log(authors)
    console.log(description)
    console.log(pageCount)
    console.log(cover)

      const shouldDisplay = title && authors && description && pageCount && cover

      // const isArray = Array.isArray(authors)
  return (
    <>
     <div>{shouldDisplay &&
            <Results> <Title>{title}</Title>{authors.map((item: string) => { return <Author> {item}</Author> })} <br></br><img src={cover} alt={title + " cover"}/>
            <PageCount>{pageCount} Pages</PageCount><br></br>
            <P>{description}</P>
            </Results>}</div>
    </>

  )
}
export default BookData

// {shouldDisplay && 
//   <div style = {cardStyles.container}>
//   <div style={cardStyles.bold}>
//       <p>{title}</p>
//       <br></br>
//         {authors.map((item: string) => {
//             return <p> {item}</p>
//         })}
//   </div>
//   {/* <div>
//       <img src={cover.thumbnail} alt={title + " cover"}/>
//   </div> */}
//   <div>
//     <p>{pageCount} pages</p>
//     <p> {description}</p>
//   </div>
// </div>
// }