import { Book } from "../../../../server/src/utils/Types";

const cardStyles = {
    container: {
      height: 100,
      width: 400,
      boxShadow: "0 0 3px 2px #cec7c759",
      alignItems: "center",
      padding: 20,
      borderRadius: 20,
      
    },
    bold: {
      fontWeight: "bold",
    },
  };

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
      {shouldDisplay && 
        <div style = {cardStyles.container}>
        <div style={cardStyles.bold}>
            <p>{title}</p>
            <br></br>
              {authors.map((item: string) => {
                  return <p> {item}</p>
              })}
        </div>
        {/* <div>
            <img src={cover.thumbnail} alt={title + " cover"}/>
        </div> */}
        <div>
          <p>{pageCount} pages</p>
          <p> {description}</p>
        </div>
      </div>
      }
    </>

  )
}
export default BookData