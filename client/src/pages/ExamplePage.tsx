// TODO: Delete this file when actual pages are added
import React from 'react';

import { H1, P } from '../components';
import PageWrapper from '../components/complex-components/PageWrapper'; // *TODO: Fix so it imports from components

function ExamplePage() {
  return (
    <PageWrapper pageTitle="OuterWhorld" backgroundColor='#555555' titleColor='#999999'>
      <header className="ExamplePage-header">
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
    </PageWrapper>
  );
}

export default ExamplePage;
