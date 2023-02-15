//Erin TODO: Format and show all clusters made

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import { COLORS, FONTS_MAIN,FONTS_SECONDARY, ScrollBarStyle} from '../constants';
import {
  PageWrapper,
  H1,
  Box,
  Box_Wrapper,
  Label
} from '../components';
import OWServiceProvider from '../OuterWhorldServiceProvider';
import { Book } from '../../../server/src/utils/Types';


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
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  background-color: ${COLORS.PURPLE_LIGHT}
  
`;
const ClusterName = styled.h2`
${FONTS_MAIN};
  font-weight: 600;
  font-size: 3.3rem;
  line-height: 2.5rem;
  text-align: center;
  color: ${COLORS.PURPLE_DARK};
text-align:left;
margin-top:10px;
`;
const ScrollableDiv = styled.div`
  height: 27rem;
  width: 75rem;
  padding: 5rem;
  background-color: ${COLORS.PURPLE_LIGHT};
  overflow-y: hidden;
  overflow-x: scroll;
  ${ScrollBarStyle}
`;

const ImgWrapper = styled.div`

  padding:15px;
  background-color: ${COLORS.WHITE};
  box-shadow: 0px 2px 2px 2px rgba(67, 35, 157, 0.3);
  border-radius:5px;
  display: inline-flex;
  min-width:100%;
  min-height:100%;
  align-content:center;
  justify-content:center;
  gap:25px;
  overflow-x:scroll;
`;
const Img = styled.div`
  width: 133.3px;
  height: 200px;
  background-color: ${COLORS.PURPLE_DARK};
  border: 5px solid ${COLORS.PURPLE_MID};
  max-width-inline: 100%;
  object-fit:scale-down;
`;
const Title = styled.h2`
${FONTS_SECONDARY};
  font-style: italic;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2rem;
  color: ${COLORS.PURPLE_DARK};
    margin-left:-20px;
    overflow:hidden;
    white-space:normal;
    width:180px;
    text-align: center;

`;
const Options = styled.div`
display:flex;
flex-direction: row;
margin-left:80rem;
margin-top:-20px;
gap: 30px;
`


function ViewClusters() {
  const [cluster, setCluster] = useState([
    { cluster_id: ' ', clusterName: ' ', user_id: '', visibility: '' },
  ]);
  const [clusterBooks, setClusterBooks] = useState<any>([])
  let newArray:any;

  useEffect(() => {
    const loadData = async () => {
      console.log("IN");
      const clusterInfo = await OWServiceProvider.getAllClustersFromUser(
        'andrei'
      );

      setCluster(clusterInfo);

      const clusterArray: any[] =[];

      // const clusterArray: Cluster[] = [{clusterName, Books},{},{}]
      for(const temp of clusterInfo){
         const info:Book = await OWServiceProvider.getClusterInformation(temp.clusterName, "andrei");
         clusterArray.push({clusterName: temp.clusterName, 
          books: info
        })
        setClusterBooks([...clusterArray])
      }
      
    };
    loadData();
  }, []);
  
  const temp2 = clusterBooks.map((item:any, index:any) => {
    return(
    <div key={index}>
      <Box_Wrapper>
      <ClusterBox>
      <ClusterName> {item.clusterName}</ClusterName>
      <Options><Label>Delete</Label><Label>Update</Label></Options>
       <ScrollableDiv><ImgWrapper>{item.books.map((t:any, i:any) => {
        return(<div key={i}><Img><img src={t.cover} alt = {t.title +" book cover"}/></Img><Title>{t.title}</Title></div>)})}</ImgWrapper> </ScrollableDiv>
      </ClusterBox></Box_Wrapper>
    </div>
  )})

  return (
    <div>
      <PageWrapper pageTitle="View Clusters">
        <FlexBoxWrapper>
          <HeadingWrapper>
            <PageTitle>View Your Clusters</PageTitle>
          
          <div>
          {temp2}
          </div></HeadingWrapper>
        </FlexBoxWrapper>
      </PageWrapper>
    </div>
  );
}
export default ViewClusters;
