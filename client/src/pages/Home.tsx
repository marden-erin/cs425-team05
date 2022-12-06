// TODO: Delete this file when actual pages are added
import React from 'react';
import styled from 'styled-components';

import PageWrapper from '../components/complex-components/PageWrapper/PageWrapper'; // *TODO: Fix so it imports from components
import { P } from '../components';
import { COLORS } from '../constants';
import Logo from '../imgs/logo.png';

const TEMP_DIV = styled.div`
  width: 600px;
  height: 600px;

  background-color: ${COLORS.WHITE};
`;

function Home() {
  return (
    <PageWrapper pageTitle="OuterWhorld">
      <h1>
          <img src={Logo} alt="OuterWhorld" width="700" />
      </h1>
      <TEMP_DIV>
        <P>Content goes here!</P>
      </TEMP_DIV>
    </PageWrapper>
  );
}

export default Home;
