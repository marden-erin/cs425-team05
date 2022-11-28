// TODO: Delete this file when actual pages are added
import React from 'react';

import { H1, P } from '../components';

function ExamplePage() {
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
      </header>
    </div>
  );
}

export default ExamplePage;
