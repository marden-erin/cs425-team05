import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import styled, {
  createGlobalStyle,
  DefaultTheme,
  ThemedCssFunction,
} from 'styled-components';

import { H1, SemiHiddenLink } from '../../simple-components';
import { NavBar } from '../NavBar';
import { COLORS, FONTS_SECONDARY } from '../../../constants';
import PlanetImg from '../../../imgs/planet.png';

type WrapperProps = {
  /**
   * Any props that come in the component (Actual page content)
   */
  children?: ReactNode;
  /**
   * The name of the page to be shown on the browser tab
   */
  pageTitle: string;
  /**
   * The optional text to be shown in the H1
   */
  header?: string;
  /**
   * The color of the site's background
   */
  backgroundColor?: string;
  /**
   * The color of the h1 text
   */
  titleColor?: string;
  /**
   * Other css
   */
  $css?: ThemedCssFunction<DefaultTheme>;
};

// Adding FONTS_SECONDARY as fallback in case we didn't set a font
const GlobalStyle = createGlobalStyle<{ backgroundColor?: string }>`
    html {
        background: ${(props) =>
          props.backgroundColor ? props.backgroundColor : COLORS.PURPLE_DARK};
        ${FONTS_SECONDARY}
    }
`;

// TODO: Allow custom css to be passed in
const Wrapper = styled.div<{ $css?: ThemedCssFunction<DefaultTheme> }>`
  background-image: url(${PlanetImg});
  background-size: 75%;
  background-position: right center;
  background-repeat: no-repeat;
  min-height: 100vh;
`;

const Header = styled(H1)<{ fontColor?: string }>`
  text-align: center;
  color: ${(props) => (props.fontColor ? props.fontColor : COLORS.WHITE)};
  margin-block-start: 4rem;
`;

export const PageWrapper = ({
  children,
  pageTitle,
  header,
  backgroundColor,
  titleColor,
  $css,
}: WrapperProps) => {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <GlobalStyle backgroundColor={backgroundColor} />
      <Wrapper $css={$css}>
        <SemiHiddenLink href="#main">Skip to Content</SemiHiddenLink>
        <NavBar />
        {header && <Header fontColor={titleColor}>{header}</Header>}
        <div id="main">{children}</div>
      </Wrapper>
    </>
  );
};

export default PageWrapper;
