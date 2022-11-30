import React, { Children, ReactNode } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';

import { COLORS } from '../../constants';
import { H1 } from '../simple-components';

type WrapperProps = {
    /**
     * The name of the page
     */
    pageTitle?: string
    /**
     * Any props that come in the component (Actual page content)
     */
    children?: ReactNode
    /**
     * The color of the site's background
     */
     backgroundColor?: string
     /**
      * The color of the h1 text
      */
     titleColor?: string
};

const GlobalStyle = createGlobalStyle<{backgroundColor?: string}>`
    html {
        background: ${props => props.backgroundColor ? props.backgroundColor : COLORS.BLUE_DARK};
    }
`;

const Wrapper = styled.div<{backgroundColor?: string}>`
    
    
`;

const PageTitle = styled(H1)<{fontColor?: string}>`
    color: ${props => props.fontColor ? props.fontColor : COLORS.WHITE};
`;

const PageWrapper = ({
    pageTitle,
    children,
    backgroundColor,
    titleColor
    }: WrapperProps) => {
    return(
        <>
            <GlobalStyle backgroundColor={backgroundColor} />
            <Wrapper>
                {pageTitle && (<PageTitle fontColor={titleColor} >{pageTitle}</PageTitle>)}
                {children}
            </Wrapper>
        </>
    );
};

export default PageWrapper;
