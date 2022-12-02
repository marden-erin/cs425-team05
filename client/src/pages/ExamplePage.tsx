// TODO: Delete this file when actual pages are added
import React, { useState} from 'react';

import Book from '../components/simple-components/Book';

import { H1, P } from '../components';

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


function ExamplePage() {

  const [bookInfo, setBookInfo] = useState({} as BookData)
  const [input, setInput] = useState("")


  // just an example of how to use the API. If you don't include the bookTitle param you will be given an error
  const loadData = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await fetch(`/api/book/${input}`);
    const data = await res.json();

    setBookInfo(data[0])
  }

  return (
    <div className="ExamplePage">
      <header className="ExamplePage-header">
        <H1>
          Hello Brainyators!
        </H1>
        <P>
          Congrats!! If you can see this in your browser, then you got the project running!
        </P>
        <a
          className="ExamplePage-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form onSubmit={loadData}>
          <label>Enter book</label>
          <input value={input} onChange={(e) => setInput(e.target.value)}></input>
          <button>
          Click to fetch book data from backend
        </button>
        </form>
        <div>
          <Book {...bookInfo}></Book>
        </div>
      </header>
    </div>
  );
}

export default ExamplePage;
