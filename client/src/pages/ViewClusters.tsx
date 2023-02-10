//Erin TODO: Format and show all clusters made

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import { COLORS, FONTS_MAIN } from '../constants';
import { PageWrapper, SmallRoundedButton, H1, Box, Box_Wrapper, BookTitle } from '../components';
import { Book } from '../../../server/src/utils/Types';

import OWServiceProvider from '../OuterWhorldServiceProvider';
const OutPut = styled.div`
  font-size: 2rem;
  font-weight: 200;
  color: ${COLORS.WHITE};
  padding: 10px;
`;
const FlexBoxWrapper = styled.div`
  height: 85vh;
  padding: 3vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 35px;
`;
const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const PageTitle = styled(H1)`
  color: ${COLORS.WHITE};
  justify-content: center;
  text-align: center;
`;
const ClusterBox = styled(Box)`
text-align: left;
`

function ViewClusters() {
  const [cluster, setCluster] = useState([{cluster_id:" ", clusterName: " ", user_id:"", visibility: ""}])

  useEffect (() => {
  const loadData = async () => {
  
    const clusterInfo = await OWServiceProvider.getAllClustersFromUser(
      'andrei'
    );
    setCluster(clusterInfo);
  }
  loadData();

},[]);

  //creates new cluster array with the users cluster name displayed
  const newArray = cluster.map((x, index) => 
  <div key = {index}><ClusterBox><BookTitle>{x.clusterName}</BookTitle>
  </ClusterBox></div>);




  return (
    <div>
      <PageWrapper pageTitle="View Clusters">
        <FlexBoxWrapper>
        <HeadingWrapper>
          <PageTitle>View Your Clusters</PageTitle>
        </HeadingWrapper>
         
          <Box_Wrapper>   
            {newArray}
          </Box_Wrapper>
        </FlexBoxWrapper>
      </PageWrapper>
    </div>
  );
}
export default ViewClusters;
