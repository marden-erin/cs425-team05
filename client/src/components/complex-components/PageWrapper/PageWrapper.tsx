import { ReactNode } from 'react';
import styled, {
  createGlobalStyle,
  DefaultTheme,
  ThemedCssFunction,
} from 'styled-components';

import { H1 } from '../../simple-components';
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
          props.backgroundColor ? props.backgroundColor : COLORS.BLURPLE};
        ${FONTS_SECONDARY}
    }
`;

// TODO: Allow custom css to be passed in
const Wrapper = styled.div<{ $css?: ThemedCssFunction<DefaultTheme> }>`
  background-image: url(${PlanetImg});
  background-size: 75%;
  background-position: right center;
  background-repeat: no-repeat;
`;

const Header = styled(H1)<{ fontColor?: string }>`
  text-align: center;
  color: ${(props) => (props.fontColor ? props.fontColor : COLORS.WHITE)};
`;

// *TODO: Make page title change with pageTitle
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
      <GlobalStyle backgroundColor={backgroundColor} />
      <Wrapper $css={$css}>
        <header className="header">
          <NavBar />
          {header && <Header fontColor={titleColor}>{header}</Header>}
        </header>
        <body>{children}</body>
      </Wrapper>
    </>
  );
};

export default PageWrapper;
