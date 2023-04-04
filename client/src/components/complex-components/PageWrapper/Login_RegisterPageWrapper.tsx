import { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import styled, {
  createGlobalStyle,
  DefaultTheme,
  ThemedCssFunction,
} from 'styled-components';

import { H1, SemiHiddenLink, SubTitle } from '../../simple-components';
import { COLORS, FONTS_SECONDARY } from '../../../constants';
import PlanetImg from '../../../imgs/planet.png';
import Logo from '../../../imgs/logo.png';

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

const LogoStyle = {
  textAlign: 'center' as const,
};

// TODO: Allow custom css to be passed in
const Wrapper = styled.div<{ $css?: ThemedCssFunction<DefaultTheme> }>`
  background-image: url(${PlanetImg});
  background-size: 75%;
  background-position: right center;
  background-repeat: no-repeat;
  position: absolute;
  height: 100%;
  width: 100%;

  h1 {
    margin-block-start: 5rem;
    margin-block-end: 1.25rem;
  }
`;

const Header = styled(H1)<{ fontColor?: string }>`
  text-align: center;
  color: ${(props) => (props.fontColor ? props.fontColor : COLORS.WHITE)};
`;

export const Login_RegisterPageWrapper = ({
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
        {header && <Header fontColor={titleColor}>{header}</Header>}
        <div style={LogoStyle}>
          <h1>
            <a href="/">
              <img src={Logo} alt="OuterWhorld" width="400" />
            </a>
          </h1>
          <SubTitle className="subtitle">
            Adopt and feed an astronaut snail by reading books you love!
          </SubTitle>
        </div>
        <div id="main">{children}</div>
      </Wrapper>
    </>
  );
};

export default Login_RegisterPageWrapper;
