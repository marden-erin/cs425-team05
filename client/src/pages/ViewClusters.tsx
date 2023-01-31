import React, {useState} from 'react';
import ReactDOM from "react-dom";
import styled, { css } from 'styled-components';
import { COLORS } from '../constants';
import { PageWrapper, SmallRoundedButton } from '../components';
import ClusterBooks from '../components/simple-components/ClusterBooks';
import { Book } from '../../../server/src/utils/Types';

import OWServiceProvider from '../OuterWhorldServiceProvider';
const OutPut = styled.div`
    font-size: 2rem;
    font-weight: 200;
    color: ${COLORS.WHITE};
    padding: 10px
`

function ViewClusters(){
        const [info, setInfo] = useState({} as Book)
        

        const loadData = async(e: any) => {
        const clusterInfo = await OWServiceProvider.getClusterInformation("test", "andrei")
        console.log(clusterInfo)
        const data = await OWServiceProvider.getBookInfo(clusterInfo[0])
        setInfo(data[0])
        console.log(clusterInfo)
}
   
    return(
        <div>
           
    
        <PageWrapper pageTitle='View Clusters' header='View Clusters'>
            <SmallRoundedButton onClick={loadData}>Temp Button</SmallRoundedButton>
            <ClusterBooks {...info}></ClusterBooks>
        </PageWrapper></div>
    )
}
export default ViewClusters;