import React, { ReactNode } from 'react';
import styled, { createGlobalStyle, DefaultTheme, ThemedCssFunction } from 'styled-components';

import { COLORS } from '../../constants';
import { H1, NavBar } from '../../components';

type WrapperProps = {
    /**
     * Any props that come in the component (Actual page content)
     */
    children?: ReactNode
    /**
     * The name of the page
     */
    pageTitle?: string
    /**
     * The color of the site's background
     */
    backgroundColor?: string
    /**
     * The color of the h1 text
     */
    titleColor?: string
    /**
     * Other css
     */
    $css?: ThemedCssFunction<DefaultTheme>
};

// *TODO: Remove font-family once fonts are added
const GlobalStyle = createGlobalStyle<{ backgroundColor?: string }>`
    html {
        background: ${props => props.backgroundColor ? props.backgroundColor : COLORS.BLURPLE};
        font-family: sans-serif;
    }
`;

const Wrapper = styled.div<{ $css?: ThemedCssFunction<DefaultTheme> }>`

`;

const PageTitle = styled(H1)<{ fontColor?: string }>`
    text-align: center;
    color: ${props => props.fontColor ? props.fontColor : COLORS.WHITE};
`;

// *TODO: Make page title change with pageTitle
const PageWrapper = ({
    children,
    pageTitle,
    backgroundColor,
    titleColor,
    $css
    }: WrapperProps) => {
    return(
        <>
            <GlobalStyle backgroundColor={backgroundColor} />
            <Wrapper $css={$css}>
            <header className="header">
                <NavBar />
                {pageTitle && (<PageTitle fontColor={titleColor}>{pageTitle}</PageTitle>)}
            </header>
                {children}
            </Wrapper>
        </>
    );
};

export default PageWrapper;
