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

type BookData = {
    title: string,
    authors: string[],
    description: string,
    pageCount: number,
    covers: {
      smallThumbnail: string,
      thumbnail: string
    }, 
    epub: {
isAvailable: boolean,
      accTokenLink ?: string
    },
    pdf: {
      isAvailable: boolean,
      accTokenLink ?: string
    }

}

function Book( book : BookData) {
    const {title, authors, description, pageCount, covers} = book

    console.log(title)
    console.log(authors)
    console.log(description)
    console.log(pageCount)
    console.log(covers)

      const shouldDisplay = title && authors && description && pageCount && covers 

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
        <div>
            <img src={covers.thumbnail} />
        </div>
        <div>
          <p>{pageCount} pages</p>
          <p> {description}</p>
        </div>
      </div>
      }
    </>

  )
}
export default Book