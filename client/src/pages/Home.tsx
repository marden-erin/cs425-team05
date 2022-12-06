// TODO: Delete this file when actual pages are added
import React from 'react';

import PageWrapper from '../components/complex-components/PageWrapper/PageWrapper'; // *TODO: Fix so it imports from components
import { P } from '../components';

// *TODO: Remove pageTitle when logo is added
function Home() {
  return (
    <PageWrapper pageTitle="OuterWhorld" header="OuterWhorld">
      <P>Content goes here!</P>
    </PageWrapper>
  );
}

export default Home;
