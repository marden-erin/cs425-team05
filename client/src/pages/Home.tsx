// TODO: Delete this file when actual pages are added
import React from 'react';

import { RoundedButton } from '../components';
import PageWrapper from '../components/complex-components/PageWrapper'; // *TODO: Fix so it imports from components

// *TODO: Remove pageTitle when logo is added
function Home() {
  return (
    <PageWrapper pageTitle="OuterWhorld">
      <RoundedButton>Button</RoundedButton>
    </PageWrapper>
  );
}

export default Home;
