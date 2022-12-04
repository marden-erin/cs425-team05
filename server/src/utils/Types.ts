export type Book = {
    title : string,
    authors : string[],
    pageCount: number,
    description: string,
    covers: {
        smallThumbnail: string,
        thumbnail: string
    }
}
