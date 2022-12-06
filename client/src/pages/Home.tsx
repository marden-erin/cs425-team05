// TODO: Delete this file when actual pages are added
import React from 'react';
import styled from 'styled-components';

import PageWrapper from '../components/complex-components/PageWrapper/PageWrapper'; // *TODO: Fix so it imports from components
import { P } from '../components';
import { COLORS } from '../constants';

const TEMP_DIV = styled.div`
  width: 600px;
  height: 600px;

  background-color: ${COLORS.WHITE};
`;

// *TODO: Remove header when logo is added
function Home() {
  return (
    <PageWrapper pageTitle="OuterWhorld" header="OuterWhorld">
      <TEMP_DIV>
        <P>Content goes here!</P>
      </TEMP_DIV>
    </PageWrapper>
  );
}

export default Home;
